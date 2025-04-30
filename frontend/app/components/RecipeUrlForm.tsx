'use client';

import { useState } from 'react';

interface RecipeUrlFormProps {
  onSubmit: () => void;
}

export function RecipeUrlForm({ onSubmit }: RecipeUrlFormProps) {
  const [recipeUrl, setRecipeUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Enter Recipe URL</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="url"
            value={recipeUrl}
            onChange={(e) => {
              e.target.setCustomValidity("");
              setRecipeUrl(e.target.value);
            }}
            onInvalid={(e: React.FormEvent<HTMLInputElement>) => {
              e.currentTarget.setCustomValidity("Please paste the entire URL");
            }}
            placeholder="e.g., https://www.example.com"
            className="px-4 py-2 border rounded-lg w-80"
            required
          />
          <button 
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Load Recipe
          </button>
        </form>
      </div>
    </main>
  );
} 