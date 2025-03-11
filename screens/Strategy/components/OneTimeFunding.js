import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeProvider';

const OneTimeFunding = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <View style={styles.cardHeader}>
        <Feather name="clock" size={20} color={colors.primary} />
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          One-time fundings
        </Text>
      </View>
      <Text style={[styles.cardSubtitle, { color: colors.textLight }]}>
        Bonus amounts for making payments
      </Text>
      <Text style={[styles.sectionText, { color: colors.text }]}>
        0 upcoming
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default OneTimeFunding;
