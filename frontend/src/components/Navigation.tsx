import { Link, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button.tsx';
import { Settings, User, Home } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/settings', icon: Settings, label: 'Settings' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed top-4 right-4 z-50">
      <div className="glass-card px-4 py-2">
        <div className="flex items-center space-x-2">
          {/* Home button - only show when not on home page */}
          {location.pathname !== '/' && (
            <Link to="/">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 border-white/20 text-muted-foreground hover:text-foreground hover:bg-white/5"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>
          )}
          
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link key={path} to={path}>
              <Button
                variant={location.pathname === path ? "default" : "outline"}
                size="sm"
                className={`flex items-center space-x-2 ${
                  location.pathname === path 
                    ? 'bg-primary text-primary-foreground' 
                    : 'border-white/20 text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
