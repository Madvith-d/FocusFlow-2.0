import React from 'react';

interface ProgressBarProps {
  timeLeft: number;
  totalTime: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ timeLeft, totalTime }) => {
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  const strokeDasharray = 2 * Math.PI * 45; // 45 is the radius of the circle
  const strokeDashoffset = strokeDasharray * ((100 - progress) / 100);

  return (
    <div className="relative">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-700 stroke-current"
          strokeWidth="5"
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
        />
        <circle
          className="text-orange-500 stroke-current"
          strokeWidth="5"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          style={{
            strokeDasharray: `${strokeDasharray}`,
            strokeDashoffset: `${strokeDashoffset}`,
            transition: 'stroke-dashoffset 0.5s ease 0s',
          }}
          transform="rotate(-90 50 50)"
        />
      </svg>
    </div>
  );
};

export default ProgressBar;
