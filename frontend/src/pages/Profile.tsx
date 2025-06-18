import Navigation from '../components/Navigation';
import { useStudy } from '../contexts/StudyContext';
import { useState, useEffect } from 'react';

interface DayData {
  date: string;
  satvik: number;
  dhanvi: number;
  winner: 'satvik' | 'dhanvi' | 'tie' | 'none';
}

const Profile = () => {
  const { getFormattedTime } = useStudy();
  const [selectedUser, setSelectedUser] = useState<'satvik' | 'dhanvi'>('satvik');
  const [weekData, setWeekData] = useState<DayData[]>([]);

  useEffect(() => {
    // Generate last 7 days of data
    const days: DayData[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      const savedScore = localStorage.getItem(`score-${dateString}`);
      let satvik = 0;
      let dhanvi = 0;
      
      if (savedScore) {
        const score = JSON.parse(savedScore);
        satvik = score.satvik || 0;
        dhanvi = score.dhanvi || 0;
      }
      
      let winner: 'satvik' | 'dhanvi' | 'tie' | 'none' = 'none';
      if (satvik > dhanvi) winner = 'satvik';
      else if (dhanvi > satvik) winner = 'dhanvi';
      else if (satvik > 0 && dhanvi > 0) winner = 'tie';
      
      days.push({ date: dateString, satvik, dhanvi, winner });
    }
    setWeekData(days);
  }, []);

  const getIntensity = (day: DayData, user: 'satvik' | 'dhanvi') => {
    const time = day[user];
    if (time === 0) return 0;
    if (time < 1800) return 1; // < 30 minutes
    if (time < 3600) return 2; // < 1 hour
    if (time < 7200) return 3; // < 2 hours
    return 4; // 2+ hours
  };

  const getDayColor = (day: DayData) => {
    switch (day.winner) {
      case 'satvik':
        return 'bg-blue-600';
      case 'dhanvi':
        return 'bg-pink-600';
      case 'tie':
        return 'bg-purple-600';
      default:
        return 'bg-gray-700';
    }
  };

  const getUserIntensityColor = (intensity: number, user: 'satvik' | 'dhanvi') => {
    if (intensity === 0) return 'bg-gray-700';
    
    const colors = user === 'satvik' 
      ? ['bg-blue-800', 'bg-blue-600', 'bg-blue-500', 'bg-blue-400']
      : ['bg-pink-800', 'bg-pink-600', 'bg-pink-500', 'bg-pink-400'];
    
    return colors[intensity - 1];
  };

  const totalTime = weekData.reduce((acc, day) => acc + day[selectedUser], 0);
  const avgDaily = totalTime / 7;

  return (
    <div className="min-h-screen bg-gradient-main">
      <Navigation />
      
      <div className="pt-20 px-4 max-w-4xl mx-auto">
        <div className="space-y-6">
          {/* Profile Header */}
          <div className="glass-card p-8 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold gradient-text-satvik">Profile</h1>
              
              {/* User Toggle */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedUser('satvik')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedUser === 'satvik'
                      ? 'bg-gradient-satvik text-white'
                      : 'bg-card text-blue-400 border border-blue-500/30'
                  }`}
                >
                  Satvik
                </button>
                <button
                  onClick={() => setSelectedUser('dhanvi')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedUser === 'dhanvi'
                      ? 'bg-gradient-dhanvi text-white'
                      : 'bg-card text-pink-400 border border-pink-500/30'
                  }`}
                >
                  Dhanvi
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className={`text-3xl font-bold font-mono ${
                  selectedUser === 'satvik' ? 'gradient-text-satvik' : 'gradient-text-dhanvi'
                }`}>
                  {getFormattedTime(totalTime)}
                </div>
                <div className="text-muted-foreground">Total this week</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold font-mono ${
                  selectedUser === 'satvik' ? 'gradient-text-satvik' : 'gradient-text-dhanvi'
                }`}>
                  {getFormattedTime(Math.floor(avgDaily))}
                </div>
                <div className="text-muted-foreground">Daily average</div>
              </div>
            </div>
          </div>

          {/* Contribution Graph */}
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-xl font-semibold mb-6">This Week's Activity</h2>
            
            {/* Individual User Graph */}
            <div className="mb-6">
              <h3 className={`text-lg font-medium mb-3 ${
                selectedUser === 'satvik' ? 'gradient-text-satvik' : 'gradient-text-dhanvi'
              }`}>
                {selectedUser === 'satvik' ? 'Satvik' : 'Dhanvi'}'s Study Pattern
              </h3>
              <div className="flex space-x-1">
                {weekData.map((day, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded ${getUserIntensityColor(
                      getIntensity(day, selectedUser),
                      selectedUser
                    )} flex items-center justify-center text-xs font-medium`}
                    title={`${day.date}: ${getFormattedTime(day[selectedUser])}`}
                  >
                    {new Date(day.date).getDate()}
                  </div>
                ))}
              </div>
            </div>

            {/* Competition Graph */}
            <div>
              <h3 className="text-lg font-medium mb-3">Daily Winners</h3>
              <div className="flex space-x-1">
                {weekData.map((day, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded ${getDayColor(day)} flex items-center justify-center text-xs font-medium text-white`}
                    title={`${day.date}: Satvik ${getFormattedTime(day.satvik)}, Dhanvi ${getFormattedTime(day.dhanvi)}`}
                  >
                    {new Date(day.date).getDate()}
                  </div>
                ))}
              </div>
              
              {/* Legend */}
              <div className="flex items-center space-x-4 mt-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-600 rounded"></div>
                  <span>Satvik won</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-pink-600 rounded"></div>
                  <span>Dhanvi won</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-purple-600 rounded"></div>
                  <span>Tie</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-700 rounded"></div>
                  <span>No activity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
