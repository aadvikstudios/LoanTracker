import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeProvider';

const Footer = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.footer, { backgroundColor: colors.surface }]}>
      <Text style={[styles.footerText, { color: colors.text }]}>© 2025 Loan Tracker</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
  },
});

export default Footer;
