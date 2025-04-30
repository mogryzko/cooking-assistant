'use client';

// Type definitions for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  0: {
    transcript: string;
  };
}

type SpeechRecognitionEvent = {
  resultIndex: number;
  results: SpeechRecognitionResult[];
};

import { useAudioLevel } from './hooks/useAudioLevel';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import WaveformIcon from './components/Waveformicon';

export default function Home() {
  const audioLevel = useAudioLevel();
  const transcript = useSpeechRecognition();

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