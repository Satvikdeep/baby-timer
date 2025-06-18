
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type User = 'satvik' | 'dhanvi';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

console.log("Using backend URL:", BASE_URL);

interface StudySession {
  user: User;
  startTime: number;
  endTime?: number;
  duration: number;
}

interface DayScore {
  date: string;
  satvik: number;
  dhanvi: number;
}

interface StudyContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  isRunning: boolean;
  isPaused: boolean;
  startTime: number | null;
  elapsedTime: number;
  mode: 'timer' | 'stopwatch';
  setMode: (mode: 'timer' | 'stopwatch') => void;
  timerDuration: number;
  setTimerDuration: (duration: number) => void;
  startSession: () => void;
  pauseSession: () => void;
  stopSession: () => void;
  resetSession: () => void;
  todayScore: DayScore;
  addTimeToScore: (user: User, time: number) => void;
  getFormattedTime: (seconds: number) => string;
}

const StudyContext = createContext<StudyContextType | undefined>(undefined);

export const useStudy = () => {
  const context = useContext(StudyContext);
  if (context === undefined) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
};

export const StudyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>('dhanvi');
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [totalPausedTime, setTotalPausedTime] = useState(0);
  const [lastPauseStart, setLastPauseStart] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [mode, setMode] = useState<'timer' | 'stopwatch'>('timer');
  const [timerDuration, setTimerDuration] = useState(25 * 60); // 25 minutes default
  const [todayScore, setTodayScore] = useState<DayScore>({
    date: new Date().toISOString().split('T')[0],
    satvik: 0,
    dhanvi: 0
  });

  // Load user preference from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser') as User;
    if (savedUser && (savedUser === 'satvik' || savedUser === 'dhanvi')) {
      setCurrentUser(savedUser);
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && !isPaused && sessionStartTime) {
      interval = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - sessionStartTime) / 1000) - totalPausedTime;
        setElapsedTime(Math.max(0, elapsed));
        
        // Auto-stop timer when duration is reached
        if (mode === 'timer' && elapsed >= timerDuration) {
          setIsRunning(false);
          setIsPaused(false);
          setElapsedTime(timerDuration);
        }
      }, 100);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, isPaused, sessionStartTime, mode, timerDuration, totalPausedTime]);

  // Load today's score from localStorage
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];

    const fetchTodayScore = async () => {
      const res = await fetch(`${BASE_URL}/api/scores/${today}`);
      const data = await res.json();
      setTodayScore({
        date: today,
        satvik: data.satvik || 0,
        dhanvi: data.dhanvi || 0,
      });
    };

    fetchTodayScore();
  }, []);

  const startSession = () => {
    const now = Date.now();
    
    if (isPaused && lastPauseStart) {
      // Resume from pause - add the pause duration to total paused time
      const pauseDuration = Math.floor((now - lastPauseStart) / 1000);
      setTotalPausedTime(prev => prev + pauseDuration);
      setLastPauseStart(null);
      setIsPaused(false);
      setIsRunning(true);
    } else {
      // Start new session
      setSessionStartTime(now);
      setIsRunning(true);
      setIsPaused(false);
      setTotalPausedTime(0);
      setLastPauseStart(null);
      if (mode === 'stopwatch') {
        setElapsedTime(0);
      }
    }
  };

  const pauseSession = () => {
    if (isRunning) {
      setIsRunning(false);
      setIsPaused(true);
      setLastPauseStart(Date.now());
    }
  };

  const stopSession = () => {
    setIsRunning(false);
    setIsPaused(false);
    setLastPauseStart(null);
  };

  const resetSession = () => {
    setIsRunning(false);
    setIsPaused(false);
    setSessionStartTime(null);
    setTotalPausedTime(0);
    setLastPauseStart(null);
    setElapsedTime(0);
  };

  const addTimeToScore = async (user: User, time: number) => {
    console.log("Sending time to backend", { user, time });
    const today = new Date().toISOString().split('T')[0];
    
    // Save to backend
    await fetch("${BASE_URL}/api/log-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, seconds: time }),
    });

    // Refresh today's score from backend
    const res = await fetch(`${BASE_URL}/api/scores/${today}`);
    const data = await res.json();
    setTodayScore({
      date: today,
      satvik: data.satvik || 0,
      dhanvi: data.dhanvi || 0,
    });
  };

  

  const getFormattedTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <StudyContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isRunning,
        isPaused,
        startTime: sessionStartTime,
        elapsedTime,
        mode,
        setMode,
        timerDuration,
        setTimerDuration,
        startSession,
        pauseSession,
        stopSession,
        resetSession,
        todayScore,
        addTimeToScore,
        getFormattedTime,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};
