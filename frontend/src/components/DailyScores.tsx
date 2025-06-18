import { useStudy } from '@/contexts/StudyContext';

const DailyScores = () => {
  const { todayScore, getFormattedTime, currentUser } = useStudy();

  const satvikTime = getFormattedTime(todayScore.satvik);
  const dhanviTime = getFormattedTime(todayScore.dhanvi);
  
  const total = todayScore.satvik + todayScore.dhanvi;
  const satvikPercentage = total > 0 ? (todayScore.satvik / total) * 100 : 50;
  const dhanviPercentage = total > 0 ? (todayScore.dhanvi / total) * 100 : 50;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
      <div className="glass-card p-6 rounded-2xl animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Today's Progress</h3>
          <div className="text-sm text-muted-foreground">
            Active: {currentUser === 'satvik' ? 'Satvik' : 'Dhanvi'}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="relative h-4 bg-gray-800/50 rounded-full mb-4 overflow-hidden border border-white/10">
          <div 
            className="absolute left-0 top-0 h-full bg-gradient-satvik transition-all duration-700 ease-out"
            style={{ width: `${satvikPercentage}%` }}
          />
          <div 
            className="absolute right-0 top-0 h-full bg-gradient-dhanvi transition-all duration-700 ease-out"
            style={{ width: `${dhanviPercentage}%` }}
          />
        </div>

        {/* Scores */}
        <div className="flex justify-between items-center">
          <div className="text-center">
            <div className="gradient-text-satvik font-bold text-lg">{satvikTime}</div>
            <div className="text-indigo-400 text-sm font-medium">Satvik</div>
          </div>
          
          <div className="text-center px-4">
            <div className="text-muted-foreground text-sm">Total</div>
            <div className="font-mono text-lg font-semibold">{getFormattedTime(total)}</div>
          </div>
          
          <div className="text-center">
            <div className="gradient-text-dhanvi font-bold text-lg">{dhanviTime}</div>
            <div className="text-pink-400 text-sm font-medium">Dhanvi</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyScores;
