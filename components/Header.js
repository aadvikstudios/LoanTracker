import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { MaterialIcons } from '@expo/vector-icons'; // For Theme Toggle Icon
import avatar from '../assets/avatar.jpg'; // ✅ Load Local Image

const Header = () => {
  const { isDarkMode, setIsDarkMode, colors } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: colors.surface }]}>
      {/* User Profile Avatar (Left) */}
      <Image source={avatar} style={styles.avatar} />

      {/* App Name (Center) */}
      <Text style={[styles.appName, { color: colors.text }]}>Loan Tracker</Text>

      {/* Theme Toggle Button (Right) */}
      <TouchableOpacity onPress={() => setIsDarkMode(!isDarkMode)} style={styles.iconContainer}>
        <MaterialIcons name={isDarkMode ? 'dark-mode' : 'light-mode'} size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensures even spacing
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1, // Ensures it takes up available space
    textAlign: 'center', // Center the text
  },
  iconContainer: {
    padding: 5,
  },
});

export default Header;