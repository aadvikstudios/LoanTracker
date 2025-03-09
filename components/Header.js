import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import avatar from '../assets/avatar.jpg';

const Header = ({ title, showBackButton = false }) => {
  const { isDarkMode, setIsDarkMode, colors } = useTheme();
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate('Login'); // ✅ Navigate back to Login
  };

  return (
    <View style={[styles.header, { backgroundColor: colors.surface }]}>
      {/* Left Side: Back Button (Optional) */}
      {showBackButton ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconContainer}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
      ) : (
        <Image source={avatar} style={styles.avatar} />
      )}

      {/* Title (Center) */}
      <Text style={[styles.appName, { color: colors.text }]}>{title}</Text>

      {/* Right Side: Theme Toggle & Logout */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          onPress={() => setIsDarkMode(!isDarkMode)}
          style={styles.iconContainer}
        >
          <MaterialIcons
            name={isDarkMode ? 'dark-mode' : 'light-mode'}
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.iconContainer}>
          <MaterialIcons name="logout" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    flex: 1,
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    padding: 5,
    marginLeft: 10,
  },
});

export default Header;
