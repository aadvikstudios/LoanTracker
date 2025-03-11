import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../context/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

const PlanSummary = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Plan summary
      </Text>

      {/* Payoff Time */}
      <View style={[styles.card, { borderColor: colors.success }]}>
        <View style={styles.cardHeader}>
          <Ionicons name="trophy-outline" size={20} color={colors.success} />
          <Text style={[styles.cardTitle, { color: colors.text }]}>Payoff</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={[styles.label, { color: colors.textLight }]}>
            Next debt
          </Text>
          <Text style={[styles.value, { color: colors.text }]}>2 yr 10 mo</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={[styles.label, { color: colors.textLight }]}>
            All debts
          </Text>
          <Text style={[styles.value, { color: colors.text }]}>2 yr 10 mo</Text>
        </View>
      </View>

      {/* Interest Payable */}
      <View style={[styles.card, { borderColor: colors.warning }]}>
        <View style={styles.cardHeader}>
          <Ionicons name="calendar-outline" size={20} color={colors.warning} />
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Interest
          </Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={[styles.label, { color: colors.textLight }]}>
            Next 30 days
          </Text>
          <Text style={[styles.value, { color: colors.text }]}>$1,150.68</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={[styles.label, { color: colors.textLight }]}>Total</Text>
          <Text style={[styles.value, { color: colors.text }]}>$23,253.77</Text>
        </View>
      </View>

      {/* Monthly Payments */}
      <View style={[styles.card, { borderColor: colors.primary }]}>
        <View style={styles.cardHeader}>
          <Ionicons name="wallet-outline" size={20} color={colors.primary} />
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Payments
          </Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={[styles.label, { color: colors.textLight }]}>
            Next 30 days
          </Text>
          <Text style={[styles.value, { color: colors.text }]}>$5,000.00</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={[styles.label, { color: colors.textLight }]}>Total</Text>
          <Text style={[styles.value, { color: colors.text }]}>
            $173,253.00
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 10,
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
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default PlanSummary;
