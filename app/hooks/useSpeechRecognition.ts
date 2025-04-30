import { useState, useEffect } from 'react';

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

export function useSpeechRecognition() {
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('Speech recognition not supported');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    const handleError = (event: { error: string }) => {
      console.error('Speech recognition error:', event.error);
      recognition.stop();
      if (event.error !== 'no-speech') {
        setTimeout(() => recognition.start(), 500);
      }
    };

    const handleResult = (event: SpeechRecognitionEvent) => {
      const result = event.results[event.resultIndex] as SpeechRecognitionResult;
      if (result.isFinal) {
        setTranscript(result[0].transcript);
      }
    };

    recognition.onerror = handleError;
    recognition.onend = () => recognition.start();
    recognition.onstart = () => console.log('Speech recognition started');
    recognition.onresult = handleResult;
    recognition.onnomatch = () => console.log('No speech was recognized');

    recognition.start();

    return () => recognition.stop();
  }, []);

  return transcript;
} 