
import Navigation from '../components/Navigation';
import Timer from '../components/Timer';
import DailyScores from '../components/DailyScores';
import WelcomeModal from '../components/WelcomeModal';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-main">
      <Navigation />
      <WelcomeModal />
      
      {/* Main Content */}
      <div className="pt-8 pb-32 px-4">
        {/* Timer */}
        <Timer />
      </div>

      {/* Bottom Scores */}
      <DailyScores />
    </div>
  );
};

export default Index