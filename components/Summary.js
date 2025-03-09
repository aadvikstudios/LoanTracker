import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { useLoans } from '../context/LoanProvider'; // ✅ Import Loan Context

const Summary = () => {
  const { colors } = useTheme();
  const { loans } = useLoans();

  const totalLoanAmount = loans.reduce((sum, loan) => sum + loan.amount, 0);
  const avgInterestRate =
    loans.length > 0
      ? (
          loans.reduce((sum, loan) => sum + loan.interest, 0) / loans.length
        ).toFixed(2) + '%'
      : 'N/A';

  return (
    <>
      <View style={styles.summaryContainer}>
        <Text style={[styles.summaryText, { color: colors.text }]}>
          Total Loan Amount: ${totalLoanAmount.toFixed(2)}
        </Text>
      </View>

      <View style={styles.boxContainer}>
        <View style={[styles.box, { backgroundColor: colors.surface }]}>
          <Text style={[styles.boxTitle, { color: colors.text }]}>
            Active Loans
          </Text>
          <Text style={[styles.boxValue, { color: colors.primary }]}>
            {loans.length}
          </Text>
        </View>
        <View style={[styles.box, { backgroundColor: colors.surface }]}>
          <Text style={[styles.boxTitle, { color: colors.text }]}>
            Avg Interest Rate
          </Text>
          <Text style={[styles.boxValue, { color: colors.primary }]}>
            {avgInterestRate}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  box: {
    width: '48%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  boxTitle: {
    fontSize: 16,
  },
  boxValue: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default Summary;
