'use client';

import WaveformIcon from './WaveformIcon';

interface AudioVisualizerProps {
  audioLevel: number;
  transcript: string;
}

export function AudioVisualizer({ audioLevel, transcript }: AudioVisualizerProps) {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="relative flex items-center justify-center" style={{ height: '28rem' }}>
          <div 
            className="rounded-full bg-black p-8 flex items-center justify-center absolute"
            style={{
              width: `${16 + audioLevel * 12}rem`,
              height: `${16 + audioLevel * 12}rem`,
              color: 'white',
              transition: 'all 0.1s ease-out',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <WaveformIcon />
          </div>
        </div>
        <p className="text-xl">{transcript}</p>
      </div>
    </main>
  );
} 