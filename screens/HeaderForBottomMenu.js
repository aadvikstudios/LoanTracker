import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeProvider';

const HeaderForBottomMenu = ({ title, subtitle, showTutorial = false }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: colors.primaryLight }]}>
      <View>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: colors.text }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {showTutorial && (
        <TouchableOpacity
          style={[styles.tutorialButton, { color: colors.accent }]}
        >
          <Text style={{ color: colors.primaryDark, fontWeight: 'bold' }}>
            Tutorial
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  tutorialButton: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
  },
});

export default HeaderForBottomMenu;
