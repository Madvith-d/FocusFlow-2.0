import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, SkipForward, Divide } from 'lucide-react';
import Timer from './components/Timer';
import ProgressBar from './components/ProgressBar';
import MusicPlayer from './components/MusicPlayer';
import BackgroundSelector from './components/BackgroundSelector';
import TimerSettings from './components/TimerSettings';
import ChatSection from './components/ChatSection';
import FocusPlant from './components/FocusPlant';

function App() {
  const [isStudying, setIsStudying] = useState(false);
  const [studyTime, setStudyTime] = useState(25 * 60); // 25 minutes in seconds
  const [breakTime, setBreakTime] = useState(5 * 60); // 5 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(studyTime);
  const [isBreak, setIsBreak] = useState(false);
  const [currentBackground, setCurrentBackground] = useState('japanese-street');
  const [isDistracted, setIsDistracted] = useState(false);
  const [distractionTimeout, setDistractionTimeout] = useState<NodeJS.Timeout | null>(null);
  const [lastNotificationTime, setLastNotificationTime] = useState(0);
  const notificationCooldown = 15000; // 15 seconds in milliseconds
  const [isTabActive, setIsTabActive] = useState(true);
  const notificationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleDistraction = useCallback(() => {
    if (isStudying && !isBreak) {
      setIsDistracted(true);
      showNotification('Distraction detected');
      
      if (distractionTimeout) {
        clearTimeout(distractionTimeout);
      }

      const timeout = setTimeout(() => {
        setIsDistracted(false);
      }, Math.min(30000, studyTime * 1000 * 0.1));

      setDistractionTimeout(timeout);
    }
  }, [isStudying, isBreak, studyTime, distractionTimeout]);

  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      if (isStudying && !isBreak) {
        handleDistraction();
        // Start sending notifications every 5 seconds
        notificationIntervalRef.current = setInterval(() => {
          showNotification('Come back to your study session!');
        }, 5000);
      }
    } else {
      // Clear the notification interval when the tab becomes active
      if (notificationIntervalRef.current) {
        clearInterval(notificationIntervalRef.current);
        notificationIntervalRef.current = null;
      }
    }
  }, [isStudying, isBreak, handleDistraction]);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (notificationIntervalRef.current) {
        clearInterval(notificationIntervalRef.current);
      }
    };
  }, [handleVisibilityChange]);

  const handleButtonClick = (action: () => void) => {
    if (isStudying) {
      handleDistraction();
    }
    action();
  };

  useEffect(() => {
    let interval: number | undefined;

    if (isStudying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (isBreak) {
        setIsBreak(false);
        setTimeLeft(studyTime);
        setIsStudying(false); // Stop the timer after break
        showNotification('Break time is over. Ready to focus?');
      } else {
        setIsBreak(true);
        setTimeLeft(breakTime);
        setIsStudying(true); // Automatically start break timer
        showNotification('Study session completed. Time for a break!');
      }
    }

    return () => clearInterval(interval);
  }, [isStudying, timeLeft, isBreak, studyTime, breakTime]);

  const toggleTimer = () => {
    setIsStudying((prevIsStudying) => !prevIsStudying);
  };

  const resetTimer = () => {
    setIsStudying(false);
    setIsBreak(false);
    setTimeLeft(studyTime);
  };

  const showNotification = (message: string) => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('Focus Flow', { body: message });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('Focus Flow', { body: message });
          }
        });
      }
    }
  };

  const calculateProgress = () => {
    if (isDistracted) return -1; // Special value to indicate distraction
    const totalTime = isBreak ? breakTime : studyTime;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  return (
    <div className={`min-h-screen bg-cover bg-center flex items-center justify-center ${currentBackground}`}>
      <div className="backdrop-blur-md bg-white/20 p-8 rounded-lg shadow-lg max-w-6xl w-full text-white">
        <h1 className="text-4xl font-bold mb-6 text-center text-white">Focus Flow</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Timer Section */}
          <div className="flex-1">
            <div className="relative">
              <ProgressBar timeLeft={timeLeft} totalTime={isBreak ? breakTime : studyTime} />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center">
                <Timer timeLeft={timeLeft} isBreak={isBreak} />
              </div>
            </div>
            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={() => handleButtonClick(toggleTimer)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full"
              >
                {isStudying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <button
                onClick={() => handleButtonClick(resetTimer)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full"
              >
                <SkipForward size={24} />
              </button>
            </div>
            <TimerSettings
              studyTime={studyTime}
              breakTime={breakTime}
              setStudyTime={setStudyTime}
              setBreakTime={setBreakTime}
              setTimeLeft={setTimeLeft}
              isBreak={isBreak}
            />
          </div>

          {/* Divider for large screens */}
          <div className="hidden lg:block">
            <Divide className="text-white h-full" />
          </div>

          {/* Music Section */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4 text-white">Music Player</h2>
            <MusicPlayer />
            <BackgroundSelector setCurrentBackground={setCurrentBackground} />
            {/* FocusPlant */}
            <div className="mt-6">
              <FocusPlant progress={calculateProgress()} />
            </div>
          </div>

          {/* Divider for large screens */}
          <div className="hidden lg:block">
            <Divide className="text-white h-full" />
          </div>

          {/* Chat Section */}
          <div className="flex-1">
            <ChatSection />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
