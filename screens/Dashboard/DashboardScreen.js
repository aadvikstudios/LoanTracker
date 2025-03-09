import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { useLoans } from '../../context/LoanProvider';
import Header from '../../components/Header';
import ProgressBar from '../../components/ProgressBar';
import InterestSaved from '../../components/InterestSaved';

const DashboardScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { loans } = useLoans();

  // State for extra payments
  const [extraPayment, setExtraPayment] = useState(0);

  // Calculate Total Loan Balance & EMI
  const totalLoanAmount = loans.reduce((sum, loan) => sum + loan.balance, 0);
  const totalEMI = loans.reduce((sum, loan) => sum + loan.emi, 0);

  // Estimate Debt-Free Time (Considering extra payments)
  const estimatedMonths =
    totalLoanAmount / (totalEMI + parseFloat(extraPayment || 0));

  // Next Loan to Pay Off (Highest Interest Rate First - Avalanche)
  const nextLoan = loans.length
    ? [...loans].sort((a, b) => b.interestRate - a.interestRate)[0]
    : null;

  // Debt Payoff Progress
  const totalPaid = loans.reduce(
    (sum, loan) =>
      sum + ((loan.originalBalance || loan.balance) - loan.balance),
    0
  );
  const progress = totalLoanAmount ? totalPaid / totalLoanAmount : 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Loan Tracker" showBackButton={false} />

      <ScrollView contentContainerStyle={styles.dashboardContent}>
        {/* 📊 Total Loan Amount & EMI */}
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Total Loan Amount
          </Text>
          <Text style={[styles.cardValue, { color: colors.primary }]}>
            ₹{totalLoanAmount.toLocaleString()}
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Total EMI
          </Text>
          <Text style={[styles.cardValue, { color: colors.primary }]}>
            ₹{totalEMI.toLocaleString()}/month
          </Text>
        </View>
        {/* ✅ Interest Saved Component */}
        <InterestSaved />

        {/* 📆 Estimated Debt-Free Date */}
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Estimated Debt-Free In
          </Text>
          <Text style={[styles.cardValue, { color: colors.primary }]}>
            {Math.ceil(estimatedMonths)} months
          </Text>
        </View>

        {/* 🔥 Next Loan to Pay Off */}
        {nextLoan && (
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Next Loan to Pay Off
            </Text>
            <Text style={[styles.cardValue, { color: colors.primary }]}>
              {nextLoan.name}
            </Text>
            <Text style={[styles.subText, { color: colors.textSecondary }]}>
              {nextLoan.interestRate}% Interest - {nextLoan.category}
            </Text>
          </View>
        )}

        {/* 📊 Debt Payoff Progress */}
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Debt Payoff Progress
          </Text>
          <ProgressBar progress={progress} />
          <Text style={[styles.subText, { color: colors.textSecondary }]}>
            {Math.round(progress * 100)}% Paid Off
          </Text>
        </View>

        {/* 🔢 Enter Extra Payment */}
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Enter Extra Payment
          </Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.text },
            ]}
            keyboardType="numeric"
            placeholder="₹0"
            placeholderTextColor={colors.textSecondary}
            value={extraPayment}
            onChangeText={setExtraPayment}
          />
        </View>
        <TouchableOpacity
          style={[styles.simulateButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('LoanPaymentSimulator')}
        >
          <Text style={[styles.simulateText, { color: colors.surface }]}>
            Simulate Payments
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.accent }]}
          onPress={() => navigation.navigate('MonthlyTracking')}
        >
          <Text style={[styles.buttonText, { color: colors.surface }]}>
            View Monthly Progress
          </Text>
        </TouchableOpacity>

        {/* 🔄 View Detailed Loan Payoff Strategy */}
        <TouchableOpacity
          style={[styles.compareButton, { backgroundColor: colors.accent }]}
          onPress={() =>
            navigation.navigate('LoanPayoffStrategy', { extraPayment })
          }
        >
          <Text style={[styles.compareText, { color: colors.surface }]}>
            View Detailed Payoff Plan
          </Text>
        </TouchableOpacity>
        {/* 🔄 View Detailed Loan Payoff Strategy */}
        <TouchableOpacity
          style={[styles.compareButton, { backgroundColor: colors.accent }]}
          onPress={() => navigation.navigate('AddLoan', { extraPayment })}
        >
          <Text style={[styles.compareText, { color: colors.surface }]}>
            Add Loan{' '}
          </Text>
        </TouchableOpacity>
        {/* 🚀 Navigate to Loan Payment Simulator */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  dashboardContent: { padding: 20 },
  card: { padding: 15, borderRadius: 10, marginBottom: 15 },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardValue: { fontSize: 22, fontWeight: 'bold', marginTop: 5 },
  subText: { fontSize: 14, marginTop: 3 },
  input: {
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginTop: 5,
  },
  compareButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  compareText: { fontSize: 16, fontWeight: 'bold' },
});

export default DashboardScreen;
