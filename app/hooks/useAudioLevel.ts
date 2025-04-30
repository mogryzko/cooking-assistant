import { useState, useEffect } from 'react';

export function useAudioLevel() {
  const [audioLevel, setAudioLevel] = useState(0);

  useEffect(() => {
    const setupAudioMonitoring = async () => {
      try {
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
      } catch (err) {
        console.error('Microphone access denied:', err);
      }
    };

    setupAudioMonitoring();
  }, []);

  return audioLevel;
} 