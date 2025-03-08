import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Using MaterialIcons for action icons
import { useTheme } from '../context/ThemeProvider';

const ActionCard = ({ icon, text, onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surface }]}
      onPress={onPress}
    >
      <MaterialIcons name={icon} size={30} color={colors.primary} />
      <Text style={[styles.text, { color: colors.text }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 100, // Square shape
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    margin: 10,
    elevation: 3, // Shadow effect
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default ActionCard;
