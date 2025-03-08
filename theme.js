import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,

    // 🎨 Primary Colors
    primary: '#6200ea', // Purple
    primaryLight: '#9c47ff', // Light Purple
    primaryDark: '#3700b3', // Dark Purple

    // 🎨 Secondary Colors
    secondary: '#03dac6', // Teal
    secondaryLight: '#66fff9',
    secondaryDark: '#00a896',

    // 🌍 Background Colors
    background: '#f5f5f5', // Light Background
    backgroundLight: '#ffffff', // White
    backgroundDark: '#e0e0e0', // Light Gray

    // 📦 Surface Colors (Cards, Modals, etc.)
    surface: '#ffffff', // Card Background
    surfaceDark: '#dcdcdc', // Darker card background

    // 🔤 Text Colors
    text: '#333333', // Default Text
    textLight: '#555555',
    textDark: '#111111',

    // ✅ Feedback Colors
    success: '#4caf50', // Green
    warning: '#ff9800', // Orange
    error: '#d32f2f', // Red

    // 📏 Border Colors
    border: '#d1d1d1',
    borderDark: '#aaaaaa',

    // 🌑 Shadows
    shadow: '#cccccc',

    // 🎭 Disabled & Placeholder
    disabled: '#cccccc',
    placeholder: '#757575',
  },
  fonts: {
    regular: {
      fontFamily: 'Poppins_400Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Poppins_500Medium',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Poppins_700Bold',
      fontWeight: 'normal',
    },
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,

    // 🎨 Primary Colors
    primary: '#bb86fc',
    primaryLight: '#e3b3ff',
    primaryDark: '#8854c0',

    // 🎨 Secondary Colors
    secondary: '#03dac6',
    secondaryLight: '#66fff9',
    secondaryDark: '#00a896',

    // 🌍 Background Colors
    background: '#121212', // Dark Background
    backgroundLight: '#1e1e1e',
    backgroundDark: '#000000',

    // 📦 Surface Colors (Cards, Modals, etc.)
    surface: '#1e1e1e',
    surfaceDark: '#282828',

    // 🔤 Text Colors
    text: '#ffffff',
    textLight: '#cccccc',
    textDark: '#aaaaaa',

    // ✅ Feedback Colors
    success: '#81c784',
    warning: '#ffb74d',
    error: '#e57373',

    // 📏 Border Colors
    border: '#444444',
    borderDark: '#333333',

    // 🌑 Shadows
    shadow: '#111111',

    // 🎭 Disabled & Placeholder
    disabled: '#666666',
    placeholder: '#aaaaaa',
  },
  fonts: {
    regular: {
      fontFamily: 'Poppins_400Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Poppins_500Medium',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Poppins_700Bold',
      fontWeight: 'normal',
    },
  },
};
