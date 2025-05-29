import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Languages, HelpCircle, Beaker } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../locales/i18n';
import { HowToPlayModal } from './HowToPlayModal';

export const MainMenu: React.FC = () => {
  const { startGame, gameStarted, language, setLanguage } = useGameStore();
  const { isDarkMode } = useTheme();
  const [showDifficulty, setShowDifficulty] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'tr' : 'en';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  if (gameStarted) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`rounded-lg p-8 max-w-md w-full mx-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Beaker className="w-8 h-8 text-blue-500" />
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('mainMenu.title')}
            </h2>
          </div>
          <button
            onClick={toggleLanguage}
            className={`p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-500 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-700'}`}
            title={language === 'en' ? 'Türkçe olarak değiştir' : 'Switch to English'}
          >
            <Languages className="w-5 h-5" />
          </button>
        </div>
        <p className={`text-center mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {t('mainMenu.subtitle')}
        </p>
        
        {!showDifficulty ? (
          <button
            onClick={() => setShowDifficulty(true)}
            className="w-full bg-blue-500 text-white rounded-lg py-3 px-6 hover:bg-blue-600 transition-colors"
          >
            {t('mainMenu.startGame')}
          </button>
        ) : (
          <div className="space-y-3">
            <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('mainMenu.selectDifficulty')}
            </h3>
            <button
              onClick={() => startGame('random')}
              className="w-full bg-purple-500 text-white rounded-lg py-2 px-4 hover:bg-purple-600 transition-colors"
            >
              {t('mainMenu.random')}
            </button>
            <button
              onClick={() => startGame('easy')}
              className="w-full bg-green-500 text-white rounded-lg py-2 px-4 hover:bg-green-600 transition-colors"
            >
              {t('mainMenu.easy')}
            </button>
            <button
              onClick={() => startGame('medium')}
              className="w-full bg-yellow-500 text-white rounded-lg py-2 px-4 hover:bg-yellow-600 transition-colors"
            >
              {t('mainMenu.medium')}
            </button>
            <button
              disabled
              className="w-full bg-gray-400 text-white rounded-lg py-2 px-4 cursor-not-allowed opacity-50"
            >
              {t('mainMenu.hard')} (Yakında)
            </button>
            <button
              onClick={() => setShowDifficulty(false)}
              className={`w-full border rounded-lg py-2 px-4 transition-colors ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t('back', 'Geri')}
            </button>
          </div>
        )}

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setShowHowToPlay(true)}
            className={`flex-1 flex items-center justify-center gap-2 border rounded-lg py-2 px-4 transition-colors
              ${isDarkMode 
                ? 'border-blue-500 text-blue-400 hover:bg-blue-900/30' 
                : 'border-blue-500 text-blue-600 hover:bg-blue-50'}`}
          >
            <HelpCircle size={20} />
            {t('howToPlay.button')}
          </button>
        </div>
        
        <HowToPlayModal 
          open={showHowToPlay} 
          onClose={() => setShowHowToPlay(false)} 
        />
      </div>
    </div>
  );
};
