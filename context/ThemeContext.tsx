import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  colors: typeof lightColors | typeof darkColors;
}

const lightColors = {
  background: '#DAE9D4',
  card: '#ffffff',
  text: '#333333',
  subtext: '#666666',
  primary: '#d2e0fd',
  border: '#dddddd',
  headerBg: '#ffffff',
  secondary: "#24525b",
  header: "#333333"
};

const darkColors = {
  background: '#DAE9D4',
  card: '#1e1e1e',
  text: '#ffffff',
  subtext: '#a0a0a0',
  primary: '#4CAF50',
  border: '#333333',
  headerBg: '#1e1e1e',
  header: "#ffffff",
  secondary: "#a0a0a0"
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  isDark: false,
  toggleTheme: () => {},
  colors: lightColors,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(systemColorScheme || 'light');

  useEffect(() => {
    if (systemColorScheme) {
      setTheme(systemColorScheme);
    }
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setTheme(current => (current === 'light' ? 'dark' : 'light'));
  };

  const value = {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
    colors: theme === 'dark' ? darkColors : lightColors,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);