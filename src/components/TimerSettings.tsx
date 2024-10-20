import React from 'react';

interface TimerSettingsProps {
  studyTime: number;
  breakTime: number;
  setStudyTime: (time: number) => void;
  setBreakTime: (time: number) => void;
  setTimeLeft: (time: number) => void;
  isBreak: boolean;
}

const TimerSettings: React.FC<TimerSettingsProps> = ({
  studyTime,
  breakTime,
  setStudyTime,
  setBreakTime,
  setTimeLeft,
  isBreak,
}) => {
  const handleStudyTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTime = parseInt(e.target.value) * 60;
    setStudyTime(newTime);
    if (!isBreak) setTimeLeft(newTime);
  };

  const handleBreakTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTime = parseInt(e.target.value) * 60;
    setBreakTime(newTime);
    if (isBreak) setTimeLeft(newTime);
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2 text-orange-300">Timer Settings</h3>
      <div className="flex justify-between">
        <div>
          <label htmlFor="studyTime" className="block text-sm font-medium text-gray-300">
            Study Time
          </label>
          <select
            id="studyTime"
            value={studyTime / 60}
            onChange={handleStudyTimeChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md bg-gray-700 text-white"
          >
            <option value="1">15 min</option>
            <option value="25">25 min</option>
            <option value="30">30 min</option>
            <option value="45">45 min</option>
            <option value="50">50 min</option>
            <option value="60">60 min</option>
          </select>
        </div>
        <div>
          <label htmlFor="breakTime" className="block text-sm font-medium text-gray-300">
            Break Time
          </label>
          <select
            id="breakTime"
            value={breakTime / 60}
            onChange={handleBreakTimeChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md bg-gray-700 text-white"
          >
            <option value="5">5 min</option>
            <option value="10">10 min</option>
            <option value="15">15 min</option>
            <option value="20">20 min</option>
            <option value="30">30 min</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TimerSettings;