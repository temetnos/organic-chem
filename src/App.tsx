import React, { useEffect } from 'react';
import { DrawingPanel } from './components/DrawingPanel';
import { Toolbar } from './components/Toolbar';
import { ChallengePanel } from './components/ChallengePanel';
import { MainMenu } from './components/MainMenu';
import { GameStats } from './components/GameStats';
import { useGameStore } from './store/gameStore';
import { BeakerIcon } from 'lucide-react';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from './contexts/ThemeContext';

function App() {
  const { updateTimer, gameStarted, gameFinished } = useGameStore();
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    if (gameStarted && !gameFinished) {
      const timer = setInterval(() => updateTimer(), 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, gameFinished]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <BeakerIcon className="w-8 h-8 text-blue-500" />
              <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Organik Molekül
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <IconButton onClick={toggleTheme} color="inherit" size="small">
                {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full px-4 py-8">
        {!gameStarted ? (
          <MainMenu />
        ) : gameFinished ? (
          <GameStats />
        ) : (
          <div className="relative min-h-[calc(100vh-12rem)] flex flex-col sm:flex-row">
            <div className="relative mb-4 sm:mb-0 sm:w-64" style={{ zIndex: 1000 }}>
              <Toolbar />
            </div>
            <div className="flex-1 flex justify-center items-center">
              <DrawingPanel />
            </div>
            <div className="sm:w-80 relative">
              <ChallengePanel />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;