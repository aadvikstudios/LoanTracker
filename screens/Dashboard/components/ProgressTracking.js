import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../context/ThemeProvider';
import { useLoans } from '../../../context/LoanProvider';
// import ProgressBar from '../../components/ProgressBar'; // Placeholder for future implementation

const ProgressTracking = () => {
  const { colors } = useTheme();
  const { loans } = useLoans();

  // Calculate total loan amount and paid-off amount
  const totalLoanAmount = loans.reduce(
    (sum, loan) => sum + loan.originalBalance,
    0
  );
  const totalPaid = loans.reduce(
    (sum, loan) => sum + (loan.originalBalance - loan.balance),
    0
  );
  const progress = totalLoanAmount > 0 ? totalPaid / totalLoanAmount : 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Progress Tracking
      </Text>

      <View style={styles.card}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          Debt Payoff Progress
        </Text>
        {/* Placeholder for progress bar */}
        {/* <ProgressBar progress={progress} /> */}
        <Text style={[styles.cardValue, { color: colors.primary }]}>
          {Math.round(progress * 100)}% Paid Off
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardValue: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default ProgressTracking;
