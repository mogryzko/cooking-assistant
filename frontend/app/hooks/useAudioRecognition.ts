import { useState, useEffect } from 'react';

interface SpeechRecognitionResult {
  isFinal: boolean;
  0: {
    transcript: string;
  };
}

type SpeechRecognition = EventTarget & {
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onerror: (event: { error: string }) => void;
  onend: () => void;
  onstart: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onnomatch: () => void;
};

type SpeechRecognitionEvent = {
  resultIndex: number;
  results: SpeechRecognitionResult[];
};

export function useAudioRecognition() {
  const [audioLevel, setAudioLevel] = useState(0);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    let recognition: SpeechRecognition | undefined;
    let recognitionActive = false;
    let restartTimeout: ReturnType<typeof setTimeout> | null = null;
    let shouldRestart = true;

    const setupAudio = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasAudioInput = devices.some(d => d.kind === 'audioinput');
        if (!hasAudioInput) throw new Error('No audio input devices found');

        await new Promise(res => setTimeout(res, 100));
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        analyser.fftSize = 256;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const updateAudioLevel = () => {
          analyser.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length / 255;
          setAudioLevel(average);
          requestAnimationFrame(updateAudioLevel);
        };
        updateAudioLevel();

        const SRConstructor = (window.SpeechRecognition || window.webkitSpeechRecognition) as
          | (new () => SpeechRecognition)
          | undefined;

        if (!SRConstructor) {
          console.error('Speech recognition not supported');
          return;
        }

        recognition = new SRConstructor();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onerror = (event: { error: string }) => {
          console.error('Speech recognition error:', event.error);
          recognitionActive = false;

          if (event.error === 'not-allowed') {
            shouldRestart = false;
            return;
          }

          if (shouldRestart && event.error !== 'no-speech') {
            if (restartTimeout) clearTimeout(restartTimeout);
            restartTimeout = setTimeout(() => {
              if (!recognitionActive) {
                try {
                  recognition?.start();
                  recognitionActive = true;
                } catch (e) {
                  console.error('Restart failed:', e);
                }
              }
            }, 1000);
          }
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          const result = event.results[event.resultIndex] as SpeechRecognitionResult;
          if (result.isFinal) {
            setTranscript(result[0].transcript);
          }
        };

        recognition.onend = () => {
          console.log('Speech recognition ended');
          recognitionActive = false;

          if (shouldRestart) {
            if (restartTimeout) clearTimeout(restartTimeout);
            restartTimeout = setTimeout(() => {
              if (!recognitionActive) {
                try {
                  recognition?.start();
                  recognitionActive = true;
                } catch (e) {
                  console.error('Restart after end failed:', e);
                }
              }
            }, 1000);
          }
        };

        recognition.onstart = () => {
          console.log('Speech recognition started');
          recognitionActive = true;
        };

        recognition.onnomatch = () => console.log('No speech was recognized');

        recognition.start();
        recognitionActive = true;
      } catch (err) {
        console.error('Microphone access denied or setup failed:', err);
      }
    };

    setupAudio();

    return () => {
      shouldRestart = false;
      if (restartTimeout) clearTimeout(restartTimeout);
      recognition?.stop();
    };
  }, []);

  return { audioLevel, transcript };
}