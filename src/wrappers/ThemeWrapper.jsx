import { createContext, useState, useContext, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

/**
 * Context for managing theme state.
 * Provides the ability to toggle between dark and light modes.
 */
const ThemeContext = createContext();

/**
 * Custom hook to access the theme context.
 * @returns {Object} Theme context with `darkMode` state and `toggleDarkMode` function.
 */
export const useThemeContext = () => useContext(ThemeContext);

/**
 * Theme wrapper component that provides dark and light mode toggling functionality.
 * It persists the theme mode in local storage.
 * @component
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The child components to wrap within the theme provider.
 */
const ThemeWrapper = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    return savedMode;
  });

  /**
   * Toggles the dark mode state and saves the preference in local storage.
   */
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };

  /**
   * Creates a Material-UI theme based on the current dark mode state.
   */
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeWrapper;
