import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Her zaman karanlık tema kullan
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Sayfa yüklendiğinde karanlık temayı uygula
    document.documentElement.classList.add('dark');
  }, []);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#3b82f6', // blue-500
      },
      secondary: {
        main: '#10b981', // emerald-500
      },
      background: {
        default: isDarkMode ? '#1a1a1a' : '#f3f4f6',
        paper: isDarkMode ? '#2d2d2d' : '#ffffff',
      },
    },
  });

  const toggleTheme = () => {
    // Tema değiştirmeyi devre dışı bırak
    return;
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
