import React from 'react';

interface BackgroundSelectorProps {
  setCurrentBackground: (background: string) => void;
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ setCurrentBackground }) => {
  const backgrounds = [
    { name: 'Japanese Street', value: 'japanese-street' },
    { name: 'Zen Garden', value: 'zen-garden' },
    { name: 'Cherry Blossom', value: 'cherry-blossom' },
    { name: 'Evenings', value: 'evenings' },
    { name: 'Beach Side', value: 'beach-side' },
  ];

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2 text-white">Background</h3>
      <div className="flex flex-wrap gap-2">
        {backgrounds.map((bg) => (
          <button
            key={bg.value}
            onClick={() => setCurrentBackground(bg.value)}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm py-1 px-2 rounded"
          >
            {bg.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BackgroundSelector;
