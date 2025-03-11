import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../context/ThemeProvider';
import { useLoans } from '../../../context/LoanProvider';
import { ProgressBar } from 'react-native-paper';

const DebtFreeTimeline = () => {
  const { colors } = useTheme();
  const { loans } = useLoans();

  // Calculate Total Loan Balance & EMI
  const totalLoanAmount = loans.reduce((sum, loan) => sum + loan.balance, 0);
  const totalEMI = loans.reduce((sum, loan) => sum + loan.emi, 0);

  // Estimate Debt-Free Time (Avoid division by zero)
  const estimatedMonths =
    totalEMI > 0 ? Math.ceil(totalLoanAmount / totalEMI) : 0;

  // Calculate progress
  const totalOriginalLoan = loans.reduce(
    (sum, loan) => sum + (loan.originalBalance || loan.balance),
    0
  );
  const totalPaid = loans.reduce(
    (sum, loan) =>
      sum + ((loan.originalBalance || loan.balance) - loan.balance),
    0
  );
  const progress = totalOriginalLoan > 0 ? totalPaid / totalOriginalLoan : 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Debt-Free Timeline
      </Text>

      {/* First Row: Two Columns */}
      <View style={styles.rowContainer}>
        <View style={styles.column}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Estimated Debt-Free In
          </Text>
          <Text style={[styles.cardValue, { color: colors.primary }]}>
            {estimatedMonths} {estimatedMonths === 1 ? 'month' : 'months'}
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Current Progress
          </Text>
          <Text style={[styles.cardValue, { color: colors.primary }]}>
            {Math.round(progress * 100)}%
          </Text>
        </View>
      </View>

      {/* Second Row: Progress Bar */}
      <View style={styles.progressContainer}>
        <ProgressBar
          progress={progress}
          color={colors.primary}
          style={styles.progressBar}
        />
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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  column: {
    flex: 1,
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
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 10,
    borderRadius: 5,
  },
});

export default DebtFreeTimeline;
