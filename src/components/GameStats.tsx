import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGameStore } from '../store/gameStore';
import { useTheme } from '../contexts/ThemeContext';

export const GameStats: React.FC = () => {
  const { 
    moleculeStats, 
    selectedDifficulty, 
    startGame,
    challenges
  } = useGameStore();
  const { isDarkMode } = useTheme();

  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const secondaryTextClass = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const cardBgClass = isDarkMode ? 'bg-gray-700' : 'bg-white';
  
  // Get missed challenges (skipped or not completed)
  const missedChallenges = React.useMemo(() => {
    return challenges.filter((challenge) => 
      moleculeStats[challenge.id]?.skipped || 
      !moleculeStats[challenge.id]?.completed
    );
  }, [challenges, moleculeStats]);
  
  const hasMissedChallenges = missedChallenges.length > 0;

  // Filter challenges by selected difficulty
  const filteredChallenges = React.useMemo(() => 
    selectedDifficulty === 'random' 
      ? challenges 
      : challenges.filter((c) => c.difficulty === selectedDifficulty),
    [selectedDifficulty, challenges]
  );

  // Calculate statistics for the selected difficulty level
  const difficultyStats = React.useMemo(() => ({
    totalScore: filteredChallenges.reduce((sum, challenge) => {
      const challengeStats = moleculeStats[challenge.id];
      return sum + (challengeStats?.score || 0);
    }, 0),
    completedChallenges: filteredChallenges.filter((challenge) => 
      moleculeStats[challenge.id]?.completed
    ).length,
    totalChallenges: filteredChallenges.length
  }), [filteredChallenges, moleculeStats]);

  const { t } = useTranslation();
  
  // Handle continue with missed challenges
  const handleContinueMissed = () => {
    // Start a new game with only missed challenges
    if (missedChallenges.length > 0) {
      // Store the missed challenges in session storage
      sessionStorage.setItem('customChallenges', JSON.stringify(missedChallenges));
      // Start the game with the current difficulty
      startGame(selectedDifficulty || 'easy');
    }
  };
  
  // Get the translated difficulty name
  const getTranslatedDifficulty = (difficulty: string | null): string => {
    if (!difficulty) return '';
    const translation = t(`difficulty.${difficulty}`);
    return typeof translation === 'string' ? translation : difficulty;
  };

  return (
    <div className={`max-w-2xl mx-auto p-8 ${textClass}`}>
      <h1 className="text-3xl font-bold mb-8">{t('gameStats.title')}</h1>
      
      <div className={`${cardBgClass} rounded-lg shadow-lg p-6 mb-8`}>
        <h2 className="text-2xl font-semibold mb-4">
          {selectedDifficulty === 'random' 
            ? t('gameStats.overallResults')
            : t('gameStats.levelResults', { 
                level: getTranslatedDifficulty(selectedDifficulty) 
              })}
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className={`p-4 ${isDarkMode ? 'bg-blue-900' : 'bg-blue-50'} rounded-lg`}>
            <p className={isDarkMode ? 'text-sm text-blue-300' : 'text-sm text-blue-600'}>Toplam Puan</p>
            <p className={isDarkMode ? 'text-2xl font-bold text-blue-100' : 'text-2xl font-bold text-blue-800'}>
              {difficultyStats.totalScore}
            </p>
          </div>
          <div className={`p-4 ${isDarkMode ? 'bg-green-900' : 'bg-green-50'} rounded-lg`}>
            <p className={isDarkMode ? 'text-sm text-green-300' : 'text-sm text-green-600'}>
              {t('gameStats.completedChallenges')}
            </p>
            <p className={isDarkMode ? 'text-2xl font-bold text-green-100' : 'text-2xl font-bold text-green-800'}>
              {difficultyStats.completedChallenges} / {difficultyStats.totalChallenges}
            </p>
          </div>
        </div>
      </div>

      <div className={`${cardBgClass} rounded-lg shadow-lg p-6`}>
        <h2 className="text-2xl font-semibold mb-4">{t('gameStats.challengeDetails')}</h2>
        <div className="space-y-4">
          {filteredChallenges.map((challenge) => {
            const stats = moleculeStats[challenge.id] || {
              completed: false,
              score: 0,
              usedShowFormula: false,
              skipped: false
            };
            
            const getBgColor = () => {
              if (isDarkMode) {
                return stats.completed 
                  ? 'bg-green-900/50' 
                  : stats.skipped 
                  ? 'bg-yellow-900/50' 
                  : 'bg-gray-600';
              }
              return stats.completed 
                ? 'bg-green-50' 
                : stats.skipped 
                ? 'bg-yellow-50' 
                : 'bg-gray-50';
            };
            
            return (
              <div 
                key={challenge.id} 
                className={`p-4 rounded-lg ${getBgColor()}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">
                      {t(`molecules.${challenge.id}.name`, { defaultValue: challenge.name })}
                    </h3>
                    <p className={`text-sm ${secondaryTextClass}`}>
                      {t(`molecules.${challenge.id}.description`, { 
                        defaultValue: challenge.description 
                      })}
                    </p>
                    <p className={`text-xs mt-1 ${secondaryTextClass}`}>
                      {t('gameStats.difficulty')}: {getTranslatedDifficulty(challenge.difficulty || null)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex flex-col items-end space-y-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                        {stats.completed ? t('gameStats.completed') : stats.skipped ? t('gameStats.skipped') : t('gameStats.notStarted')}
                      </span>
                      {stats.usedShowFormula && (
                        <span className={`text-xs ${isDarkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>
                          {t('gameStats.usedFormula')}
                        </span>
                      )}
                      <span className={`text-sm font-semibold ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                        {stats.score} {t('challengePanel.score')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {hasMissedChallenges && (
          <div className="space-y-4">
            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                {t('gameStats.continueMissed', { count: missedChallenges.length })}
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                {t('gameStats.continueMissedHint')}
              </p>
              <ul className="mt-2 space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                {missedChallenges.slice(0, 3).map((challenge) => (
                  <li key={challenge.id} className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-2"></span>
                    {t(`molecules.${challenge.id}.name`, { defaultValue: challenge.name })}
                  </li>
                ))}
                {missedChallenges.length > 3 && (
                  <li className="text-xs text-yellow-600 dark:text-yellow-400 italic">
                    +{missedChallenges.length - 3} more...
                  </li>
                )}
              </ul>
            </div>
            <button
              onClick={handleContinueMissed}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <span>{t('gameStats.continueButton')}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
        <button
          onClick={() => window.location.href = '/'}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <span>{t('gameStats.backToMenu')}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};
