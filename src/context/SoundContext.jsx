import { useState, useEffect, useCallback, useRef } from 'react';
import { SoundCtx } from './ctx';

// Cozy ambient pad (Fmaj7/C style voicing): warm and consonant
const PAD_FREQUENCIES = [87.31, 174.61, 220.0, 261.63, 329.63];

const clampVolume = (value) => Math.min(1, Math.max(0, value));

export const SoundProvider = ({ children }) => {
    const [isMuted, setIsMuted] = useState(() => {
        const storedMuted = localStorage.getItem('portfolio-sound-muted');
        return storedMuted !== null ? JSON.parse(storedMuted) : true;
    });

    const [volumeState, setVolumeState] = useState(() => {
        const storedVolume = localStorage.getItem('portfolio-sound-volume');
        const parsed = storedVolume !== null ? Number(storedVolume) : 0.35;
        return Number.isFinite(parsed) ? clampVolume(parsed) : 0.35;
    });

    const audioCtxRef = useRef(null);
    const masterGainRef = useRef(null);
    const lowpassRef = useRef(null);
    const droneVoicesRef = useRef([]);
    const droneActiveRef = useRef(false);

    const initAudio = useCallback(async () => {
        if (!audioCtxRef.current) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtxRef.current = new AudioContext();

            masterGainRef.current = audioCtxRef.current.createGain();
            lowpassRef.current = audioCtxRef.current.createBiquadFilter();

            lowpassRef.current.type = 'lowpass';
            lowpassRef.current.frequency.setValueAtTime(1200, audioCtxRef.current.currentTime);
            lowpassRef.current.Q.setValueAtTime(0.4, audioCtxRef.current.currentTime);

            masterGainRef.current.connect(lowpassRef.current);
            lowpassRef.current.connect(audioCtxRef.current.destination);

            const now = audioCtxRef.current.currentTime;
            masterGainRef.current.gain.setValueAtTime(isMuted ? 0 : volumeState, now);
        }

        if (audioCtxRef.current.state === 'suspended') {
            await audioCtxRef.current.resume();
        }
    }, [isMuted, volumeState]);

    const setVolume = useCallback((next) => {
        setVolumeState((prev) => {
            const resolved = typeof next === 'function' ? next(prev) : next;
            return clampVolume(Number(resolved));
        });
    }, []);

    const stopDrone = useCallback(() => {
        if (!audioCtxRef.current || !droneVoicesRef.current.length) {
            droneActiveRef.current = false;
            return;
        }

        const now = audioCtxRef.current.currentTime;
        droneVoicesRef.current.forEach((voice) => {
            voice.gain.gain.cancelScheduledValues(now);
            voice.gain.gain.setTargetAtTime(0.0001, now, 0.9);
            voice.osc.stop(now + 3);
            voice.lfo.stop(now + 3);
            voice.panLfo.stop(now + 3);
        });

        droneVoicesRef.current = [];
        droneActiveRef.current = false;
    }, []);

    const startDrone = useCallback(() => {
        if (!audioCtxRef.current || !masterGainRef.current || droneActiveRef.current) return;

        const ctx = audioCtxRef.current;
        const now = ctx.currentTime;

        PAD_FREQUENCIES.forEach((freq, index) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const panner = ctx.createStereoPanner();

            const lfo = ctx.createOscillator();
            const lfoGain = ctx.createGain();

            const panLfo = ctx.createOscillator();
            const panLfoGain = ctx.createGain();

            osc.type = index % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(freq, now);
            osc.detune.setValueAtTime((Math.random() - 0.5) * 4, now);

            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.linearRampToValueAtTime(0.012 + index * 0.002, now + 4);

            lfo.type = 'sine';
            lfo.frequency.setValueAtTime(0.03 + index * 0.008, now);
            lfoGain.gain.setValueAtTime(0.003 + index * 0.0006, now);

            panLfo.type = 'sine';
            panLfo.frequency.setValueAtTime(0.012 + index * 0.004, now);
            panLfoGain.gain.setValueAtTime(0.2, now);
            panner.pan.setValueAtTime(index % 2 === 0 ? -0.1 : 0.1, now);

            lfo.connect(lfoGain);
            lfoGain.connect(gain.gain);

            panLfo.connect(panLfoGain);
            panLfoGain.connect(panner.pan);

            osc.connect(gain);
            gain.connect(panner);
            panner.connect(masterGainRef.current);

            osc.start(now);
            lfo.start(now);
            panLfo.start(now);

            droneVoicesRef.current.push({ osc, gain, lfo, panLfo });
        });

        droneActiveRef.current = true;
    }, []);

    const playHover = useCallback(() => {
        if (isMuted || !audioCtxRef.current || !masterGainRef.current) return;

        const ctx = audioCtxRef.current;
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.exponentialRampToValueAtTime(520, now + 0.12);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.012, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

        osc.connect(gain);
        gain.connect(masterGainRef.current);

        osc.start(now);
        osc.stop(now + 0.17);
    }, [isMuted]);

    const playClick = useCallback(() => {
        if (isMuted || !audioCtxRef.current || !masterGainRef.current) return;

        const ctx = audioCtxRef.current;
        const now = ctx.currentTime;

        const oscA = ctx.createOscillator();
        const gainA = ctx.createGain();
        oscA.type = 'sine';
        oscA.frequency.setValueAtTime(420, now);
        oscA.frequency.exponentialRampToValueAtTime(300, now + 0.14);
        gainA.gain.setValueAtTime(0.0001, now);
        gainA.gain.linearRampToValueAtTime(0.016, now + 0.015);
        gainA.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
        oscA.connect(gainA);
        gainA.connect(masterGainRef.current);
        oscA.start(now);
        oscA.stop(now + 0.19);

        const oscB = ctx.createOscillator();
        const gainB = ctx.createGain();
        oscB.type = 'triangle';
        oscB.frequency.setValueAtTime(620, now + 0.01);
        oscB.frequency.exponentialRampToValueAtTime(480, now + 0.12);
        gainB.gain.setValueAtTime(0.0001, now + 0.01);
        gainB.gain.linearRampToValueAtTime(0.009, now + 0.02);
        gainB.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
        oscB.connect(gainB);
        gainB.connect(masterGainRef.current);
        oscB.start(now + 0.01);
        oscB.stop(now + 0.17);
    }, [isMuted]);

    const toggleMute = useCallback(() => {
        initAudio();
        setIsMuted((prev) => !prev);
    }, [initAudio]);

    useEffect(() => {
        localStorage.setItem('portfolio-sound-muted', JSON.stringify(isMuted));
    }, [isMuted]);

    useEffect(() => {
        localStorage.setItem('portfolio-sound-volume', String(volumeState));
    }, [volumeState]);

    useEffect(() => {
        if (!audioCtxRef.current || !masterGainRef.current) return;

        const now = audioCtxRef.current.currentTime;
        masterGainRef.current.gain.cancelScheduledValues(now);
        masterGainRef.current.gain.setTargetAtTime(isMuted ? 0 : volumeState, now, 0.35);

        if (isMuted) {
            stopDrone();
        } else {
            startDrone();
        }
    }, [isMuted, volumeState, startDrone, stopDrone]);

    useEffect(() => {
        return () => {
            stopDrone();
            if (audioCtxRef.current) {
                audioCtxRef.current.close();
            }
        };
    }, [stopDrone]);

    const value = {
        isMuted,
        volume: volumeState,
        setVolume,
        toggleMute,
        playHover,
        playClick,
        initAudio,
    };

    return <SoundCtx.Provider value={value}>{children}</SoundCtx.Provider>;
};
