import { useContext } from 'react';
import { SoundCtx } from '../context/ctx';

export function useSound() {
	const context = useContext(SoundCtx);
	if (context === undefined) {
		throw new Error('useSound must be used within a SoundProvider');
	}
	return context;
}
