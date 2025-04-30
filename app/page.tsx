'use client';

import { useState } from 'react';
import { useAudioLevel } from './hooks/useAudioLevel';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { RecipeUrlForm } from './components/RecipeUrlForm';
import { AudioVisualizer } from './components/AudioVisualizer';

export default function Home() {
  const [isRecipeLoaded, setIsRecipeLoaded] = useState(false);
  const audioLevel = useAudioLevel();
  const transcript = useSpeechRecognition();

  // if (!isRecipeLoaded) {
  //   return <RecipeUrlForm onSubmit={() => setIsRecipeLoaded(true)} />;
  // }

  return <AudioVisualizer audioLevel={audioLevel} transcript={transcript} />;
}