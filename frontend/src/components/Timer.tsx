import { useState } from 'react';
import { Button } from '../components/ui/button.tsx';
import { useStudy } from '@/contexts/StudyContext';
import { Play, Pause, Square, RotateCcw, Timer as TimerIcon, Clock } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog.tsx";

const Timer = () => {
  const {
    currentUser,
    isRunning,
    isPaused,
    elapsedTime,
    mode,
    setMode,
    timerDuration,
    startSession,
    pauseSession,
    stopSession,
    resetSession,
    addTimeToScore,
    getFormattedTime,
  } = useStudy();

  const [showResetDialog, setShowResetDialog] = useState(false);

  const handleReset = () => {
    if (elapsedTime > 0) {
      setShowResetDialog(true);
    } else {
      resetSession();
    }
  };

  const confirmReset = (addToScore: boolean) => {
    if (addToScore && elapsedTime > 0) {
      addTimeToScore(currentUser, elapsedTime);
    }
    resetSession();
    setShowResetDialog(false);
  };

  const displayTime = mode === 'timer' ? timerDuration - elapsedTime : elapsedTime;
  const timeString = getFormattedTime(Math.max(0, displayTime));

  const userGradient = currentUser === 'satvik' 
    ? 'from-indigo-400 to-blue-500' 
    : 'from-pink-400 to-purple-500';

  const userGradientBg = currentUser === 'satvik' 
    ? 'bg-gradient-satvik' 
    : 'bg-gradient-dhanvi';

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] space-y-8">
      {/* Mode Selector */}
      <div className="glass-card p-3 rounded-xl">
        <div className="flex space-x-1">
          <Button
            variant={mode === 'timer' ? 'default' : 'outline'}
            onClick={() => !isRunning && setMode('timer')}
            disabled={isRunning}
            size="sm"
            className={`flex items-center space-x-2 ${
              mode === 'timer'
                ? 'bg-primary text-primary-foreground'
                : 'border-white/20 text-muted-foreground hover:bg-white/5'
            }`}
          >
            <TimerIcon className="w-4 h-4" />
            <span>Timer</span>
          </Button>
          <Button
            variant={mode === 'stopwatch' ? 'default' : 'outline'}
            onClick={() => !isRunning && setMode('stopwatch')}
            disabled={isRunning}
            size="sm"
            className={`flex items-center space-x-2 ${
              mode === 'stopwatch'
                ? 'bg-primary text-primary-foreground'
                : 'border-white/20 text-muted-foreground hover:bg-white/5'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Stopwatch</span>
          </Button>
        </div>
      </div>

      {/* Timer Display */}
      <div className="text-center">
        <div className={`timer-display bg-gradient-to-r ${userGradient} bg-clip-text text-transparent ${
          isRunning && !isPaused ? 'pulse-glow' : ''
        }`}>
          {timeString}
        </div>
        <div className="text-xl text-muted-foreground mt-4">
          {mode === 'timer' ? 'Focus Timer' : 'Stopwatch'} • {currentUser === 'satvik' ? 'Satvik' : 'Dhanvi'}
          {isPaused && <span className="text-orange-400 ml-2">• Paused</span>}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4">
        {!isRunning ? (
          <Button
            onClick={startSession}
            size="lg"
            className={`h-16 w-16 rounded-full ${userGradientBg} hover:opacity-90 text-white border-0 shadow-lg`}
          >
            <Play className="w-6 h-6" />
          </Button>
        ) : (
          <Button
            onClick={pauseSession}
            size="lg"
            variant="outline"
            className="h-16 w-16 rounded-full border-orange-500/50 text-orange-400 hover:bg-orange-500/10"
          >
            <Pause className="w-6 h-6" />
          </Button>
        )}
        
        {isPaused && (
          <Button
            onClick={stopSession}
            size="lg"
            variant="outline"
            className="h-16 w-16 rounded-full border-red-500/50 text-red-400 hover:bg-red-500/10"
          >
            <Square className="w-6 h-6" />
          </Button>
        )}
        
        <Button
          onClick={handleReset}
          size="lg"
          variant="outline"
          className="h-16 w-16 rounded-full border-gray-500/50 text-gray-400 hover:bg-gray-500/10"
        >
          <RotateCcw className="w-6 h-6" />
        </Button>
      </div>

      {/* Reset Confirmation Dialog */}
      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent className="glass-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="gradient-text-satvik">
              Add time to today's score?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              You've studied for {getFormattedTime(elapsedTime)}. Would you like to add this time to {currentUser === 'satvik' ? 'Satvik' : 'Dhanvi'}'s score for today?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={() => confirmReset(false)}
              className="border-red-500/50 text-red-400 hover:bg-red-500/10"
            >
              Reset without saving
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => confirmReset(true)}
              className={`${userGradientBg} hover:opacity-90 text-white border-0`}
            >
              Add to score & reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Timer;
