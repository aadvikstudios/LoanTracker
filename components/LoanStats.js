import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { useLoans } from '../context/LoanProvider';

const LoanStats = () => {
  const { colors } = useTheme();
  const { loans } = useLoans();

  // Calculate Avg Interest Rate
  const avgInterestRate =
    loans.length > 0
      ? (
          loans.reduce((sum, loan) => sum + loan.interestRate, 0) / loans.length
        ).toFixed(2) + '%'
      : 'N/A';

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      {/* Active Loans */}
      <View style={styles.statBox}>
        <Text style={[styles.statTitle, { color: colors.text }]}>
          Active Loans
        </Text>
        <Text style={[styles.statValue, { color: colors.primary }]}>
          {loans.length}
        </Text>
      </View>

      {/* Avg Interest Rate */}
      <View style={styles.statBox}>
        <Text style={[styles.statTitle, { color: colors.text }]}>
          Avg Interest Rate
        </Text>
        <Text style={[styles.statValue, { color: colors.primary }]}>
          {avgInterestRate}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    elevation: 2,
  },
  statBox: {
    alignItems: 'center',
    width: '48%',
  },
  statTitle: {
    fontSize: 16,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default LoanStats;
