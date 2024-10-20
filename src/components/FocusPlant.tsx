import React from 'react';

interface FocusPlantProps {
  progress: number; // 0 to 100, or -1 for distraction
}

const FocusPlant: React.FC<FocusPlantProps> = ({ progress }) => {
  const isDistracted = progress === -1;
  const actualProgress = isDistracted ? 0 : progress;

  const stemHeight = Math.min(80, actualProgress * 0.8);
  const leafSize = Math.min(20, actualProgress * 0.2);
  const pinkFlowerSize = actualProgress > 80 ? (actualProgress - 80) * 0.4 : 0;
  const redFlowerSize = actualProgress > 90 ? (actualProgress - 90) * 0.6 : 0;

  return (
    <div className="text-center">
      <svg width="150" height="180" viewBox="0 0 150 180" className="mx-auto">
        {/* Pot */}
        <path d="M45,160 Q75,170 105,160 L105,175 Q75,185 45,175 Z" fill="#8B4513" />
        <ellipse cx="75" cy="160" rx="30" ry="5" fill="#A0522D" />

        {/* Main Stem */}
        <path
          d={`M75,160 Q${73 - stemHeight * 0.3},${160 - stemHeight * 0.5} 75,${160 - stemHeight}`}
          stroke="#228B22"
          strokeWidth="2"
          fill="none"
        />

        {/* Left Branch */}
        <path
          d={`M75,${160 - stemHeight * 0.4} Q${65 - stemHeight * 0.2},${150 - stemHeight * 0.5} ${70 - stemHeight * 0.1},${140 - stemHeight * 0.6}`}
          stroke="#228B22"
          strokeWidth="2"
          fill="none"
        />

        {/* Right Branch */}
        <path
          d={`M75,${160 - stemHeight * 0.6} Q${85 + stemHeight * 0.2},${150 - stemHeight * 0.7} ${80 + stemHeight * 0.1},${140 - stemHeight * 0.8}`}
          stroke="#228B22"
          strokeWidth="2"
          fill="none"
        />

        {/* Leaves */}
        <g transform={`translate(75, ${160 - stemHeight * 0.33}) rotate(-20)`}>
          <path
            d={`M0,0 Q${leafSize},-${leafSize} 0,-${leafSize * 1.5} Q-${leafSize},-${leafSize} 0,0`}
            fill="#32CD32"
          />
        </g>
        <g transform={`translate(75, ${160 - stemHeight * 0.66}) rotate(20)`}>
          <path
            d={`M0,0 Q${leafSize},-${leafSize} 0,-${leafSize * 1.5} Q-${leafSize},-${leafSize} 0,0`}
            fill="#228B22"
          />
        </g>
        <g transform={`translate(${70 - stemHeight * 0.1}, ${140 - stemHeight * 0.6}) rotate(-30)`}>
          <path
            d={`M0,0 Q${leafSize * 0.8},-${leafSize * 0.8} 0,-${leafSize * 1.2} Q-${leafSize * 0.8},-${leafSize * 0.8} 0,0`}
            fill="#32CD32"
          />
        </g>
        <g transform={`translate(${80 + stemHeight * 0.1}, ${140 - stemHeight * 0.8}) rotate(30)`}>
          <path
            d={`M0,0 Q${leafSize * 0.8},-${leafSize * 0.8} 0,-${leafSize * 1.2} Q-${leafSize * 0.8},-${leafSize * 0.8} 0,0`}
            fill="#228B22"
          />
        </g>

        {/* Pink Flower */}
        {pinkFlowerSize > 0 && (
          <g transform={`translate(${70 - stemHeight * 0.1}, ${140 - stemHeight * 0.6})`}>
            <circle cx="0" cy="0" r={pinkFlowerSize} fill="#FF69B4" />
            <circle cx="0" cy="0" r={pinkFlowerSize * 0.6} fill="#FFB6C1" />
            <circle cx="0" cy="0" r={pinkFlowerSize * 0.2} fill="#FFF700" />
          </g>
        )}

        {/* Red Flower */}
        {redFlowerSize > 0 && (
          <g transform={`translate(${80 + stemHeight * 0.1}, ${140 - stemHeight * 0.8})`}>
            <circle cx="0" cy="0" r={redFlowerSize} fill="#FF0000" />
            <circle cx="0" cy="0" r={redFlowerSize * 0.7} fill="#FF4500" />
            <circle cx="0" cy="0" r={redFlowerSize * 0.3} fill="#FFA500" />
          </g>
        )}

        {/* Seed */}
        {progress === 0 && (
          <ellipse cx="75" cy="160" rx="5" ry="3" fill="#8B4513" />
        )}
      </svg>
      <p className="text-white mt-2 font-semibold">
        {isDistracted ? "Plant paused (distracted)" : "Focus Plant"}
      </p>
    </div>
  );
};

export default FocusPlant;
