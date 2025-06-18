
import { Button } from 'src/components/ui/button.tsx';
import { useStudy, User } from '@/contexts/StudyContext';

const UserSelector = () => {
  const { currentUser, setCurrentUser } = useStudy();

  return (
    <div className="glass-card p-4 rounded-2xl">
      <h3 className="text-sm font-medium text-muted-foreground mb-3 text-center">
        Active User
      </h3>
      <div className="flex space-x-2">
        <Button
          variant={currentUser === 'satvik' ? 'default' : 'outline'}
          onClick={() => setCurrentUser('satvik')}
          className={`flex-1 ${
            currentUser === 'satvik'
              ? 'bg-gradient-satvik text-white border-0 hover:opacity-90'
              : 'border-blue-500/30 text-blue-400 hover:bg-blue-500/10'
          }`}
        >
          Satvik
        </Button>
        <Button
          variant={currentUser === 'dhanvi' ? 'default' : 'outline'}
          onClick={() => setCurrentUser('dhanvi')}
          className={`flex-1 ${
            currentUser === 'dhanvi'
              ? 'bg-gradient-dhanvi text-white border-0 hover:opacity-90'
              : 'border-pink-500/30 text-pink-400 hover:bg-pink-500/10'
          }`}
        >
          Dhanvi
        </Button>
      </div>
    </div>
  );
};

export default UserSelector;