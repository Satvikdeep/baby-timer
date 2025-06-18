import Navigation from '../components/Navigation';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useStudy } from '../contexts/StudyContext';
import { useState } from 'react';

const Settings = () => {
  const { timerDuration, setTimerDuration } = useStudy();
  const [durationMinutes, setDurationMinutes] = useState(Math.floor(timerDuration / 60));

  const handleSaveDuration = () => {
    setTimerDuration(durationMinutes * 60);
  };

  const presetDurations = [15, 25, 30, 45, 60, 90];

  return (
    <div className="min-h-screen bg-gradient-main">
      <Navigation />
      
      <div className="pt-20 px-4 max-w-2xl mx-auto">
        <div className="glass-card p-8 rounded-2xl">
          <h1 className="text-3xl font-bold gradient-text-satvik mb-8">Settings</h1>
          
          <div className="space-y-8">
            {/* Timer Duration */}
            <div>
              <Label htmlFor="duration" className="text-lg font-medium mb-4 block text-foreground">
                Default Timer Duration
              </Label>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Input
                    id="duration"
                    type="number"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(parseInt(e.target.value) || 25)}
                    className="w-24 bg-card/50 border-border text-foreground"
                    min="1"
                    max="180"
                  />
                  <span className="text-muted-foreground">minutes</span>
                  <Button 
                    onClick={handleSaveDuration} 
                    size="sm"
                    className="bg-gradient-satvik hover:opacity-90 text-white border-0"
                  >
                    Save
                  </Button>
                </div>
                
                {/* Preset Buttons */}
                <div className="flex flex-wrap gap-2">
                  {presetDurations.map((duration) => (
                    <Button
                      key={duration}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setDurationMinutes(duration);
                        setTimerDuration(duration * 60);
                      }}
                      className="border-white/20 text-muted-foreground hover:text-foreground hover:bg-white/5"
                    >
                      {duration}m
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Theme Section
            <div>
              <Label className="text-lg font-medium mb-4 block text-foreground">
                Theme
              </Label>
              <div className="text-muted-foreground">
                Dark blue theme is currently active. More theme options coming soon!
              </div>
            </div> */}

            {/* Data Management */}
            <div>
              <Label className="text-lg font-medium mb-4 block text-foreground">
                Data Management
              </Label>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                  className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                >
                  Clear All Data
                </Button>
                <div className="text-sm text-muted-foreground">
                  This will remove all stored study sessions and scores.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
