'use client';

import { useState } from 'react';
import { RecipeUrlForm } from './components/RecipeUrlForm';
import { AudioVisualizer } from './components/AudioVisualizer';

export default function Home() {
  const [isRecipeLoaded, setIsRecipeLoaded] = useState(false);

  // if (!isRecipeLoaded) {
  //   return <RecipeUrlForm onSubmit={() => setIsRecipeLoaded(true)} />;
  // }

  return <AudioVisualizer />;
}