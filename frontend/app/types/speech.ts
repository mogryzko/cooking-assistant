declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export interface SpeechRecognitionResult {
  isFinal: boolean;
  0: {
    transcript: string;
  };
}

export type SpeechRecognitionEvent = {
  resultIndex: number;
  results: SpeechRecognitionResult[];
}; 