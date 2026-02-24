import { useState, useEffect, useCallback } from 'react';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

export function useTextScramble(finalText, options = {}) {
  const {
    duration = 1500,
    delay = 0,
    scrambleSpeed = 50,
    revealDirection = 'start', // 'start' | 'end' | 'random'
  } = options;

  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const scramble = useCallback(() => {
    const textLength = finalText.length;
    const revealPerStep = textLength / (duration / scrambleSpeed);
    let revealedCount = 0;
    let revealedIndices = new Set();

    const getNextIndex = () => {
      if (revealDirection === 'start') {
        return revealedCount;
      } else if (revealDirection === 'end') {
        return textLength - 1 - revealedCount;
      } else {
        // Random
        const available = [];
        for (let i = 0; i < textLength; i++) {
          if (!revealedIndices.has(i)) available.push(i);
        }
        return available[Math.floor(Math.random() * available.length)];
      }
    };

    const interval = setInterval(() => {
      if (revealedCount >= textLength) {
        setDisplayText(finalText);
        setIsComplete(true);
        clearInterval(interval);
        return;
      }

      // Reveal more characters
      const charsToReveal = Math.ceil(revealPerStep);
      for (let i = 0; i < charsToReveal && revealedCount < textLength; i++) {
        const idx = getNextIndex();
        if (idx !== undefined) {
          revealedIndices.add(idx);
          revealedCount++;
        }
      }

      // Build display text
      let result = '';
      for (let i = 0; i < textLength; i++) {
        if (revealedIndices.has(i)) {
          result += finalText[i];
        } else if (finalText[i] === ' ') {
          result += ' ';
        } else {
          result += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        }
      }
      setDisplayText(result);
    }, scrambleSpeed);

    return () => clearInterval(interval);
  }, [finalText, duration, scrambleSpeed, revealDirection]);

  useEffect(() => {
    const timer = setTimeout(scramble, delay);
    return () => clearTimeout(timer);
  }, [scramble, delay]);

  return { displayText, isComplete };
}

// Component version for easier use
export function TextScramble({ 
  text, 
  as = 'span', 
  className,
  duration = 1500,
  delay = 0,
  ...props 
}) {
  const { displayText } = useTextScramble(text, { duration, delay });
  const Element = as;
  
  return (
    <Element className={className} {...props}>
      {displayText}
    </Element>
  );
}
