'use client';

import { useAudioRecognition } from '@/hooks/useAudioRecognition';

export function AudioVisualizer() {
  const { audioLevel, transcript } = useAudioRecognition();

  return (
    <main 
      className="flex min-h-screen items-center justify-center"
      style={{
        boxShadow: `inset 0 0 ${20 + audioLevel * 540}px rgba(0, 122, 255, ${0.3 + audioLevel * 1.8})`,
        transition: 'box-shadow 0.1s ease-out'
      }}
    >
      <div className="flex flex-col items-center">
        <p className="text-xl">{transcript}</p>
      </div>
    </main>
  );
}