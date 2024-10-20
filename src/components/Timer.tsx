import React from 'react';

interface TimerProps {
  timeLeft: number;
  isBreak: boolean;
}

const Timer: React.FC<TimerProps> = ({ timeLeft, isBreak }) => {
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-center mb-6">
      <h2 className="text-2xl font-semibold mb-2 text-orange-300">{isBreak ? 'Break' : 'Focus'}</h2>
      <div className="text-6xl font-bold text-white">
        {hours > 0 ? `${hours.toString().padStart(2, '0')}:` : ''}
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </div>
      <p className="text-sm text-gray-300 mt-2">click to add focus title</p>
    </div>
  );
};

export default Timer;