import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,

    // 🎨 Primary Colors
    primary: '#1E3A8A', // Deep Royal Blue
    primaryLight: '#3355CC', // Lighter Blue
    primaryDark: '#14244B', // Darker Royal Blue

    // 🎨 Accent Colors
    accentGold: '#C9A227', // Rich Gold
    accentEmerald: '#2E8B57', // Emerald Green
    accentPlatinum: '#D4AF37', // Platinum Gold

    // 🌍 Background Colors
    background: '#FAF9F6', // Ivory White
    backgroundLight: '#FFFFFF', // Pure White
    backgroundDark: '#EAE0C8', // Soft Beige

    // 📦 Surface Colors (Cards, Modals, etc.)
    surface: '#FFFFFF', // Card Background
    surfaceDark: '#E6DCC2', // Soft Gold-Beige for contrast

    // 🔤 Text Colors
    text: '#222222', // Rich Dark Gray (for readability)
    textLight: '#555555',
    textDark: '#111111',
    textGold: '#C9A227', // Gold Text Highlight

    // ✅ Feedback Colors
    success: '#28A745', // Emerald Green (Success)
    warning: '#E8B923', // Gold-Tinted Yellow
    error: '#D72638', // Bold Rich Red

    // 📏 Border Colors
    border: '#C9A227', // Gold Borders for elegance
    borderDark: '#8D732D', // Deeper Gold

    // 🌑 Shadows
    shadow: '#AAA9A9', // Subtle Luxury Shadow

    // 🎭 Disabled & Placeholder
    disabled: '#C7C7C7',
    placeholder: '#777777',
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
      fontWeight: 'bold',
    },
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,

    // 🎨 Primary Colors
    primary: '#102A43', // Deep Navy Blue
    primaryLight: '#1F4A75', // Lighter Navy
    primaryDark: '#081B31', // Almost Black-Blue

    // 🎨 Accent Colors
    accentGold: '#F5C518', // Bright Gold for highlights
    accentEmerald: '#28A745', // Emerald Green
    accentPlatinum: '#C0C0C0', // Platinum Silver

    // 🌍 Background Colors
    background: '#0D0D0D', // Deep Black
    backgroundLight: '#1C1C1E', // Dark Mode Gray
    backgroundDark: '#000000', // Pure Black

    // 📦 Surface Colors (Cards, Modals, etc.)
    surface: '#1C1C1E', // Dark Gray for Cards
    surfaceDark: '#2A2A2D', // Slightly Lighter Gray

    // 🔤 Text Colors
    text: '#EDEDED', // Light text for contrast
    textLight: '#BBBBBB',
    textDark: '#FFFFFF',
    textGold: '#F5C518', // Gold Text for premium feel

    // ✅ Feedback Colors
    success: '#17A589', // Teal Green
    warning: '#E67E22', // Orange-Gold
    error: '#E74C3C', // Bright Red

    // 📏 Border Colors
    border: '#F5C518', // Gold Borders
    borderDark: '#A67C00', // Deep Gold

    // 🌑 Shadows
    shadow: '#2E2E2E', // Dark Shadows

    // 🎭 Disabled & Placeholder
    disabled: '#5A5A5A',
    placeholder: '#8A8A8A',
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
      fontWeight: 'bold',
    },
  },
};
