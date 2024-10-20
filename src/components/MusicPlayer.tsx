import React, { useState, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong] = useState('Focus LoFi');
  const [volume, setVolume] = useState(50);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/spotifydown.com - Focus LoFi.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = volume / 100;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  return (
    <div className="bg-white/10 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2 text-white">{currentSong}</h3>
      <div className="flex items-center justify-between mb-4">
        <button className="text-white hover:text-orange-300">
          <SkipBack size={24} />
        </button>
        <button className="text-white hover:text-orange-300" onClick={togglePlay}>
          {isPlaying ? <Pause size={32} /> : <Play size={32} />}
        </button>
        <button className="text-white hover:text-orange-300">
          <SkipForward size={24} />
        </button>
      </div>
      <div className="flex items-center">
        <Volume2 size={20} className="text-white mr-2" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
