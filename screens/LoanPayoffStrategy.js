import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { useLoans } from '../context/LoanProvider';
import ProgressBar from '../components/ProgressBar';
import Header from '../components/Header';

const LoanPayoffStrategy = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { loans } = useLoans();

  // Extra Payment received from Dashboard
  const initialExtraPayment = route.params?.extraPayment || '0';
  const [extraPayment, setExtraPayment] = useState(initialExtraPayment);

  // Sort loans for Snowball (Lowest Balance First) & Avalanche (Highest Interest First)
  const snowballLoans = [...loans].sort((a, b) => a.balance - b.balance);
  const avalancheLoans = [...loans].sort(
    (a, b) => b.interestRate - a.interestRate
  );

  // Calculate Debt-Free Time for both strategies
  const totalLoanAmount = loans.reduce((sum, loan) => sum + loan.balance, 0);
  const totalEMI = loans.reduce((sum, loan) => sum + loan.emi, 0);
  const extraAmount = parseFloat(extraPayment || '0');

  const snowballMonths = totalLoanAmount / (totalEMI + extraAmount);
  const avalancheMonths = totalLoanAmount / (totalEMI + extraAmount);

  const progress = totalLoanAmount
    ? (totalLoanAmount - extraAmount) / totalLoanAmount
    : 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Loan Payoff Strategy" showBackButton={true} />

      <ScrollView contentContainerStyle={styles.content}>
        {/* 🔢 Adjust Extra Payment */}
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Adjust Extra Payment
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

        {/* 📊 Estimated Debt-Free Time */}
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Debt-Free Estimate
          </Text>
          <Text style={[styles.subText, { color: colors.textSecondary }]}>
            🔹 Snowball: {Math.ceil(snowballMonths)} months
          </Text>
          <Text style={[styles.subText, { color: colors.textSecondary }]}>
            🔹 Avalanche: {Math.ceil(avalancheMonths)} months
          </Text>
        </View>

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

        {/* 🔄 Loan Strategy Table */}
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Loans (Snowball Order)
          </Text>
          {snowballLoans.map((loan, index) => (
            <View key={index} style={styles.loanRow}>
              <Text style={[styles.loanName, { color: colors.text }]}>
                {loan.name}
              </Text>
              <Text style={[styles.loanDetail, { color: colors.primary }]}>
                ₹{loan.balance.toLocaleString()} | {loan.interestRate}% | ₹
                {loan.emi}/mo
              </Text>
            </View>
          ))}
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Loans (Avalanche Order)
          </Text>
          {avalancheLoans.map((loan, index) => (
            <View key={index} style={styles.loanRow}>
              <Text style={[styles.loanName, { color: colors.text }]}>
                {loan.name}
              </Text>
              <Text style={[styles.loanDetail, { color: colors.primary }]}>
                ₹{loan.balance.toLocaleString()} | {loan.interestRate}% | ₹
                {loan.emi}/mo
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[styles.simulateButton, { backgroundColor: colors.accent }]}
        onPress={() => navigation.navigate('LoanPaymentSimulator')}
      >
        <Text style={[styles.simulateText, { color: colors.surface }]}>
          Simulate Payments
        </Text>
      </TouchableOpacity>
      {/* 🔙 Back to Dashboard Button */}
      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: colors.accent }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.backText, { color: colors.surface }]}>
          Back to Dashboard
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  card: { padding: 15, borderRadius: 10, marginBottom: 15 },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  loanRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  loanName: { fontSize: 16, fontWeight: 'bold' },
  loanDetail: { fontSize: 14 },
  subText: { fontSize: 14, marginTop: 5 },
  input: {
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginTop: 5,
  },
  backButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  backText: { fontSize: 16, fontWeight: 'bold' },
});

export default LoanPayoffStrategy;
