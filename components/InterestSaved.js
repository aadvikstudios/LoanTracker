import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { useLoans } from '../context/LoanProvider';

const InterestSaved = () => {
  const { colors } = useTheme();
  const { loans } = useLoans();

  // Function to calculate total interest paid for a loan
  const calculateInterest = (loan, extraPayment = 0) => {
    let balance = loan.balance;
    let totalInterest = 0;
    let months = 0;

    while (balance > 0) {
      let interest = (balance * loan.interestRate) / (12 * 100);
      totalInterest += interest;
      let payment = loan.emi + extraPayment;
      balance -= Math.max(payment - interest, 0);
      months++;
      if (months > 1000) break; // Prevent infinite loop
    }

    return totalInterest;
  };

  let totalInterestWithoutExtra = 0;
  let totalInterestWithExtra = 0;

  loans.forEach(loan => {
    totalInterestWithoutExtra += calculateInterest(loan, 0);
    totalInterestWithExtra += calculateInterest(loan, loan.extraPayment || 0);
  });

  const interestSaved = totalInterestWithoutExtra - totalInterestWithExtra;

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <Text style={[styles.cardTitle, { color: colors.text }]}>
        Interest Saved
      </Text>
      <Text style={[styles.cardValue, { color: colors.success }]}>
        ₹{Math.round(interestSaved).toLocaleString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 15, borderRadius: 10, marginBottom: 15 },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardValue: { fontSize: 22, fontWeight: 'bold', marginTop: 5 },
});

export default InterestSaved;
