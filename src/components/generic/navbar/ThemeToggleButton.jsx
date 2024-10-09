import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const ThemeToggleButton = ({ darkMode, toggleDarkMode }) => (
  <IconButton color="inherit" onClick={toggleDarkMode} sx={{ mx: 1 }}>
    {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
  </IconButton>
);

export default ThemeToggleButton;
