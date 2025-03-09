import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { useLoans } from '../context/LoanProvider';

const Summary = () => {
  const { colors } = useTheme();
  const { loans } = useLoans();

  // Calculate Total Loan Amount
  const totalLoanAmount = loans.reduce((sum, loan) => sum + loan.balance, 0);

  // Calculate Total EMI
  const totalEMI = loans.reduce((sum, loan) => sum + loan.emi, 0);

  // Extra amount user can pay
  const [extraPayment, setExtraPayment] = useState(40000);

  // Total Payment Capacity
  const totalPayable = totalEMI + extraPayment;

  // Estimated Debt Clear Time (Assuming clearing debt with extra pay)
  const estimatedMonths = totalLoanAmount / totalPayable;
  const progress = Math.min(totalPayable / totalLoanAmount, 1); // Max 1 (100%)

  return (
    <View
      style={[styles.summaryContainer, { backgroundColor: colors.surface }]}
    >
      <Text style={[styles.sectionTitle, { color: colors.primary }]}>
        Payments
      </Text>

      {/* Minimum Payments */}
      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.text }]}>
          Minimum Payments
        </Text>
        <Text style={[styles.value, { color: colors.text }]}>
          ₹{totalEMI.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </Text>
      </View>

      {/* Extra I Can Pay */}
      <View style={styles.row}>
        <Text style={[styles.labelBold, { color: colors.text }]}>
          + Extra I Can Pay
        </Text>
        <Text style={[styles.valueBold, { color: colors.primary }]}>
          ₹
          {extraPayment.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </Text>
      </View>

      {/* Total Payments */}
      <View style={styles.divider} />
      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.text }]}>
          Total Payments
        </Text>
        <Text style={[styles.value, { color: colors.text }]}>
          ₹
          {totalPayable.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </Text>
      </View>

      {/* Debt Clear in Months */}
      <Text style={[styles.sectionTitle, { color: colors.primary }]}>
        Debt Clear in
      </Text>
      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.text }]}>
          {Math.ceil(estimatedMonths)} months
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
  },
  labelBold: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
  valueBold: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
});

export default Summary;
