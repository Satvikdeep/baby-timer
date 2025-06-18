import { Button } from 'src/components/ui/button.tsx';
import { useStudy } from '@/contexts/StudyContext';
import { Timer, Clock } from 'lucide-react';

const ModeSelector = () => {
  const { mode, setMode, isRunning } = useStudy();

  return (
    <div className="glass-card p-4 rounded-2xl">
      <h3 className="text-sm font-medium text-muted-foreground mb-3 text-center">
        Mode
      </h3>
      <div className="flex space-x-2">
        <Button
          variant={mode === 'timer' ? 'default' : 'outline'}
          onClick={() => !isRunning && setMode('timer')}
          disabled={isRunning}
          className={`flex-1 flex items-center space-x-2 ${
            mode === 'timer'
              ? 'bg-primary text-primary-foreground'
              : 'border-muted-foreground/30 text-muted-foreground'
          }`}
        >
          <Timer size={16} />
          <span>Timer</span>
        </Button>
        <Button
          variant={mode === 'stopwatch' ? 'default' : 'outline'}
          onClick={() => !isRunning && setMode('stopwatch')}
          disabled={isRunning}
          className={`flex-1 flex items-center space-x-2 ${
            mode === 'stopwatch'
              ? 'bg-primary text-primary-foreground'
              : 'border-muted-foreground/30 text-muted-foreground'
          }`}
        >
          <Clock size={16} />
          <span>Stopwatch</span>
        </Button>
      </div>
    </div>
  );
};

export default ModeSelector;