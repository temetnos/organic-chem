import React from 'react';
import { useGameStore } from '../store/gameStore';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../locales/i18n';
import { Eye } from 'lucide-react';
import { Paper, Typography, Button, Box } from '@mui/material';

export const ChallengePanel: React.FC = () => {
  const {
    currentChallenge,
    score,
    timer,
    isComplete,
    showFormula,
    toggleFormula,
    nextChallenge,
    resetLevel,
    skipChallenge,
    startGame,
    solveChallenge
  } = useGameStore();
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();

  if (!currentChallenge) return null;

  const textColorClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const secondaryTextColorClass = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const borderColorClass = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const bgColorClass = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const hoverBgColorClass = isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100';

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  const handleReturnToMenu = () => {
    startGame(undefined);
  };

  return (
    <Paper
      elevation={3}
      className={`h-full p-4 ${bgColorClass} ${borderColorClass} border-l`}
      sx={{
        backgroundColor: isDarkMode ? 'rgba(38, 38, 38, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Box className="space-y-4">
        <Box>
          <Typography variant="h6" component="h2" className={textColorClass}>
            {t('challengePanel.targetMolecule', 'Hedef Molekül')}
          </Typography>
          <Typography className={secondaryTextColorClass}>
            {t(`molecules.${currentChallenge.id}.name`, currentChallenge.name)}
          </Typography>
        </Box>

        <Box>
          <Typography variant="body2" className={secondaryTextColorClass}>
            {t('challengePanel.difficulty', 'Zorluk')}: {t(`difficulty.${currentChallenge.difficulty}`, currentChallenge.difficulty)}
          </Typography>
          <Typography variant="body2" className={secondaryTextColorClass}>
            {t('challengePanel.time', 'Süre')}: {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </Typography>
        </Box>

        <Box>
          <Typography variant="body2" className={secondaryTextColorClass}>
            {t('challengePanel.score', 'Skor')}: {score}
          </Typography>
        </Box>

        <Box className="space-y-2">
          <div className="space-y-2">
            <Button
              variant="outlined"
              onClick={toggleFormula}
              fullWidth
              className={`flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg
                border ${borderColorClass} ${secondaryTextColorClass} ${hoverBgColorClass}
                transition-colors duration-200`}
            >
              <Eye size={20} />
              {showFormula ? t('challengePanel.hideFormula', 'Formülü Gizle') : t('challengePanel.showFormula', 'Formülü Göster')}
            </Button>
            
            {!isComplete && (
              <Button
                variant="outlined"
                color="warning"
                onClick={solveChallenge}
                fullWidth
                className={`flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg
                  border border-amber-500 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20
                  transition-colors duration-200`}
              >
                {t('challengePanel.solve', 'Çöz')} (-5 {t('challengePanel.points', 'puan')})
              </Button>
            )}
          </div>

          {showFormula && (
            <Box className="p-2 rounded" sx={{ backgroundColor: isDarkMode ? 'rgba(38, 38, 38, 0.8)' : 'rgba(255, 255, 255, 0.8)' }}>
              <Typography className={`font-mono ${secondaryTextColorClass}`}>
                {currentChallenge.formula}
              </Typography>
            </Box>
          )}

          {isComplete ? (
            <Button
              variant="contained"
              onClick={nextChallenge}
              fullWidth
              sx={{
                color: 'white',
                backgroundColor: 'success.main',
                '&:hover': {
                  backgroundColor: 'success.dark',
                },
              }}
            >
              {t('challengePanel.nextMolecule', 'Sonraki Molekül')}
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={resetLevel}
                fullWidth
                sx={{
                  color: isDarkMode ? 'white' : 'error.main',
                  borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'error.main',
                  '&:hover': {
                    borderColor: isDarkMode ? 'white' : 'error.dark',
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(211, 47, 47, 0.04)',
                  },
                }}
              >
                {t('challengePanel.retry', 'Yeniden Başla')}
              </Button>
              <Button
                variant="outlined"
                onClick={skipChallenge}
                fullWidth
                sx={{
                  color: isDarkMode ? 'white' : 'warning.main',
                  borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'warning.main',
                  '&:hover': {
                    borderColor: isDarkMode ? 'white' : 'warning.dark',
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(237, 108, 2, 0.04)',
                  },
                }}
              >
                {t('challengePanel.dontKnow', 'Bilmiyorum')}
              </Button>
              <Button
                variant="outlined"
                onClick={handleReturnToMenu}
                fullWidth
                sx={{
                  mt: 2,
                  color: isDarkMode ? 'gray.400' : 'gray.600',
                  borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                  },
                }}
              >
                {t('challengePanel.returnToMenu', 'Ana Menüye Dön')}
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Paper>
  );
};