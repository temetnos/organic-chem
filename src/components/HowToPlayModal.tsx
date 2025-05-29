import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Typography, useMediaQuery } from '@mui/material';
import { X } from 'lucide-react';
import { useTranslation } from '../locales/i18n';
import { useHotkeys } from 'react-hotkeys-hook';

interface HowToPlayModalProps {
  open: boolean;
  onClose: () => void;
}

// Step component for consistent styling
const Step: React.FC<{ number: number; title: string; children: React.ReactNode }> = ({ 
  number, 
  title, 
  children 
}) => {
  // Theme is not used directly in this component
  
  return (
    <div className="flex flex-col md:flex-row items-start gap-4 group" id={`step-${number}`}>
      <div 
        className="
          bg-blue-100 dark:bg-blue-900 rounded-full w-12 h-12 flex-shrink-0 
          flex items-center justify-center transition-all duration-200
          group-hover:scale-110 group-hover:shadow-lg
        "
      >
        <span className="text-xl font-bold text-blue-600 dark:text-blue-200">{number}</span>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
          {title}
        </h3>
        <div className="text-gray-600 dark:text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
};

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const contentRef = React.useRef<HTMLDivElement>(null);
  
  // Close modal on Escape key press
  useHotkeys('esc', onClose, { enableOnFormTags: true });
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      // Scroll to top when opening
      if (contentRef.current) {
        contentRef.current.scrollTo(0, 0);
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);
  
  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    if (!contentRef.current) return;
    
    const section = contentRef.current.querySelector(`#${sectionId}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  // Default translations fallback
  const getTranslation = (key: string, defaultValue: string) => {
    const translation = t(key);
    return translation === key ? defaultValue : translation;
  };
  
  // Table of contents
  const sections = [
    { id: 'getting-started', title: getTranslation('howToPlay.gettingStarted', 'Getting Started') },
    { id: 'step-1', title: getTranslation('howToPlay.step1.title', 'Step 1: Select a Difficulty Level') },
    { id: 'step-2', title: getTranslation('howToPlay.step2.title', 'Step 2: Build the Molecule') },
    { id: 'step-3', title: getTranslation('howToPlay.step3.title', 'Step 3: Check Your Answer') },
    { id: 'tips', title: getTranslation('howToPlay.tips', 'Tips & Tricks') },
  ];

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      aria-labelledby="how-to-play-dialog-title"
      PaperProps={{
        style: {
          backgroundColor: 'var(--background-paper, #fff)',
          borderRadius: isMobile ? 0 : '12px',
          padding: isMobile ? '8px' : '16px',
          margin: isMobile ? 0 : '32px',
          maxHeight: isMobile ? '100%' : 'calc(100% - 64px)',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
      sx={{
        '& .MuiDialog-container': {
          alignItems: isMobile ? 'flex-start' : 'center',
        },
      }}
    >
      <DialogTitle 
        id="how-to-play-dialog-title"
        sx={{ 
          m: 0, 
          p: { xs: 2, sm: 3 },
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          position: 'sticky',
          top: 0,
          bgcolor: 'background.paper',
          zIndex: 1,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <div className="flex justify-between items-center">
          <Typography variant="h4" component="h1" className="font-bold">
            {getTranslation('howToPlay.title', 'How to Play')}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            size={isMobile ? 'small' : 'medium'}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <X size={isMobile ? 20 : 24} />
          </IconButton>
        </div>
        
        {!isMobile && (
          <div className="flex flex-wrap gap-2 mt-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="px-3 py-1 text-sm rounded-full transition-colors bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-800/70"
              >
                {section.title}
              </button>
            ))}
          </div>
        )}
      </DialogTitle>
      
      <DialogContent 
        dividers 
        ref={contentRef}
        className="flex-1 overflow-y-auto"
        sx={{
          '&.MuiDialogContent-root': {
            padding: { xs: 2, sm: 3 },
          },
        }}
      >
        <div className="space-y-8 max-w-3xl mx-auto w-full">
          <section id="getting-started" className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {getTranslation('howToPlay.gettingStarted', 'Getting Started')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {getTranslation('howToPlay.intro', 'Welcome to Organic Molecule Builder! This guide will help you understand how to play and get the most out of your experience.')}
            </p>
            
            {isMobile && (
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium mb-2 text-gray-900 dark:text-white">
                  {getTranslation('howToPlay.quickNav', 'Quick Navigation')}:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {sections.slice(1).map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="px-2.5 py-1 text-xs rounded-full transition-colors bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-800/70"
                    >
                      {section.title.split(':')[0]}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section id="step-1" className="pt-4">
            <Step 
              number={1} 
              title={getTranslation('howToPlay.step1.title', 'Step 1: Select a Difficulty Level')}
            >
              <p className="mb-3">
                {getTranslation('howToPlay.step1.description', 'Choose a difficulty level that suits you from the main menu. You can start with Easy and progress to more challenging levels.')}
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <strong>Easy:</strong> {getTranslation('howToPlay.difficulty.easy', 'Simple molecules with 2-4 atoms')}
                </li>
                <li>
                  <strong>Medium:</strong> {getTranslation('howToPlay.difficulty.medium', 'Moderate complexity with 4-6 atoms')}
                </li>
                <li>
                  <strong>Hard:</strong> {getTranslation('howToPlay.difficulty.hard', 'Complex molecules with 6+ atoms')}
                </li>
              </ul>
            </Step>
          </section>

          <section id="step-2" className="pt-4">
            <Step 
              number={2} 
              title={getTranslation('howToPlay.step2.title', 'Step 2: Build the Molecule')}
            >
              <p className="mb-3">
                {getTranslation('howToPlay.step2.description', 'Use the toolbar to add atoms and bonds to the canvas. The goal is to recreate the molecule shown in the challenge.')}
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  {getTranslation('howToPlay.toolbar.title', 'Toolbar Controls')}:
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>
                    <strong>{getTranslation('howToPlay.step2.hint1', 'Atoms:')}</strong> {getTranslation('howToPlay.step2.hint1.desc', 'Click on an atom type (C, H, O, N) then click on the canvas to place it')}
                  </li>
                  <li>
                    <strong>{getTranslation('howToPlay.step2.hint2', 'Bonds:')}</strong> {getTranslation('howToPlay.step2.hint2.desc', 'Select a bond type (single, double, triple) then click and drag between atoms to connect them')}
                  </li>
                  <li>
                    <strong>{getTranslation('howToPlay.step2.hint3', 'Move:')}</strong> {getTranslation('howToPlay.step2.hint3.desc', 'Use the Move tool to reposition atoms on the canvas')}
                  </li>
                  <li>
                    <strong>{getTranslation('howToPlay.step2.hint4', 'Delete:')}</strong> {getTranslation('howToPlay.step2.hint4.desc', 'Select the Erase tool and click on any atom or bond to remove it')}
                  </li>
                </ul>
              </div>
            </Step>
          </section>

          <section id="step-3" className="pt-4">
            <Step 
              number={3} 
              title={getTranslation('howToPlay.step3.title', 'Step 3: Check Your Answer')}
            >
              <p className="mb-3">
                {getTranslation('howToPlay.step3.description', 'Once you\'ve built the molecule, the game will automatically check if it matches the target structure. If correct, you\'ll earn points and can move on to the next challenge!')}
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-green-400">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                  {getTranslation('howToPlay.scoring.title', 'Scoring System')}:
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-green-700 dark:text-green-300">
                  <li>{getTranslation('howToPlay.scoring.correct', 'Correct structure on first try: 100 points')}</li>
                  <li>{getTranslation('howToPlay.scoring.hintUsed', 'Used hint: -20 points')}</li>
                  <li>{getTranslation('howToPlay.scoring.skipped', 'Skipped challenge: 0 points')}</li>
                </ul>
              </div>
            </Step>
          </section>

          <section id="tips" className="pt-4">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              {getTranslation('howToPlay.tips.title', 'Tips & Tricks')}
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-400">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  {getTranslation('howToPlay.tip.title', 'Pro Tip')}
                </h4>
                <p className="text-yellow-700 dark:text-yellow-300">
                  {getTranslation('howToPlay.tip.description', 'Use the "Show Formula" button if you need help visualizing the correct structure. Remember, using hints may affect your final score.')}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-400">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                    {getTranslation('howToPlay.tip2.title', 'Keyboard Shortcuts')}
                  </h4>
                  <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                    <li><kbd className="px-2 py-1 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">R</kbd> - Rotate molecule</li>
                    <li><kbd className="px-2 py-1 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">Del</kbd> - Delete selection</li>
                    <li><kbd className="px-2 py-1 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">Esc</kbd> - Close this dialog</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-400">
                  <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                    {getTranslation('howToPlay.tip3.title', 'Need Help?')}
                  </h4>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    {getTranslation('howToPlay.tip3.description', 'If you\'re stuck on a molecule, try breaking it down into smaller parts or check the hint for the molecular formula.')}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};
