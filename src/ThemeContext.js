import { createContext, useContext } from 'react';
import theme from './theme.js';

const ThemeContext = createContext(theme);

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
