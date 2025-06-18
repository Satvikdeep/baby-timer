
import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button.tsx';
import { useStudy, User } from '@/contexts/StudyContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setCurrentUser } = useStudy();

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    const savedUser = localStorage.getItem('currentUser');
    
    if (!hasSeenWelcome || !savedUser) {
      setIsOpen(true);
    }
  }, []);

  const handleUserSelect = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', user);
    localStorage.setItem('hasSeenWelcome', 'true');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="glass-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            Timer for my Baby
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-muted-foreground text-center">
            Who are you ???
          </p>
          
          <div className="space-y-3">
            <Button
              onClick={() => handleUserSelect('satvik')}
              className="w-full h-16 text-lg bg-gradient-satvik hover:opacity-90 text-white border-0"
            >
              <div className="flex flex-col items-center">
                <span className="font-semibold">Satvik</span>
              </div>
            </Button>
            
            <Button
              onClick={() => handleUserSelect('dhanvi')}
              className="w-full h-16 text-lg bg-gradient-dhanvi hover:opacity-90 text-white border-0"
            >
              <div className="flex flex-col items-center">
                <span className="font-semibold">Dhanvi</span>
              </div>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;