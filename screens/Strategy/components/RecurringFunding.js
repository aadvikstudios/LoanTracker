import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeProvider';

const RecurringFunding = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <View style={styles.cardHeader}>
        <Ionicons name="repeat-outline" size={20} color={colors.primary} />
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          Recurring funding
        </Text>
      </View>
      <Text style={[styles.cardSubtitle, { color: colors.textLight }]}>
        Amount to use for making payments each cycle
      </Text>

      <Text style={[styles.sectionTitle, { color: colors.textDark }]}>
        FREQUENCY
      </Text>
      <Text style={[styles.sectionText, { color: colors.text }]}>
        Once per month on the 1st
      </Text>

      <Text style={[styles.sectionTitle, { color: colors.textDark }]}>
        AMOUNT
      </Text>
      <View style={styles.amountRow}>
        <Text style={[styles.amountLabel, { color: colors.text }]}>
          Minimum
        </Text>
        <Text style={[styles.amountValue, { color: colors.text }]}>
          $5,000.00
        </Text>
      </View>
      <View style={styles.amountRow}>
        <Text style={[styles.amountLabel, { color: colors.text }]}>Extra</Text>
        <Text style={[styles.amountValue, { color: colors.text }]}>$0.00</Text>
      </View>
      <View style={styles.amountRow}>
        <Text
          style={[
            styles.amountLabel,
            { fontWeight: 'bold', color: colors.text },
          ]}
        >
          Total
        </Text>
        <Text
          style={[
            styles.amountValue,
            { fontWeight: 'bold', color: colors.text },
          ]}
        >
          $5,000.00
        </Text>
      </View>
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
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
  },
  sectionText: {
    fontSize: 14,
    marginBottom: 5,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  amountLabel: {
    fontSize: 14,
  },
  amountValue: {
    fontSize: 14,
  },
});

export default RecurringFunding;
