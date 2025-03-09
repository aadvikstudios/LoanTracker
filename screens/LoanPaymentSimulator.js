import React, { useState, useEffect } from 'react';
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
import Header from '../components/Header';
import ProgressBar from '../components/ProgressBar';
import DebtPayoffChart from '../components/DebtPayoffChart'; // ✅ New Chart Component

const LoanPaymentSimulator = ({ navigation }) => {
  const { colors } = useTheme();
  const { loans } = useLoans();

  // Extra Payment Inputs
  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState('0');
  const [lumpSumPayment, setLumpSumPayment] = useState('0');

  // Convert string to number safely
  const extraPayment = parseFloat(extraMonthlyPayment || '0');
  const lumpSum = parseFloat(lumpSumPayment || '0');

  // Calculate Loan Metrics
  const totalLoanAmount = loans.reduce((sum, loan) => sum + loan.balance, 0);
  const totalEMI = loans.reduce((sum, loan) => sum + loan.emi, 0);
  const newBalance = Math.max(totalLoanAmount - lumpSum, 0);
  const newDebtFreeMonths =
    newBalance > 0 ? Math.ceil(newBalance / (totalEMI + extraPayment)) : 0;
  const progress = totalLoanAmount
    ? (totalLoanAmount - newBalance) / totalLoanAmount
    : 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Payment Simulator" showBackButton={true} />

      <ScrollView contentContainerStyle={styles.content}>
        {/* 📊 Debt Payoff Trend Chart */}
        <DebtPayoffChart extraPayment={extraPayment} lumpSum={lumpSum} />

        {/* 🔢 Adjust Extra Monthly Payment */}
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Extra Monthly Payment
          </Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.text },
            ]}
            keyboardType="numeric"
            placeholder="₹0"
            placeholderTextColor={colors.textSecondary}
            value={extraMonthlyPayment}
            onChangeText={setExtraMonthlyPayment}
          />
        </View>

        {/* 💰 Lump Sum Payment */}
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Lump Sum Payment
          </Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.text },
            ]}
            keyboardType="numeric"
            placeholder="₹0"
            placeholderTextColor={colors.textSecondary}
            value={lumpSumPayment}
            onChangeText={setLumpSumPayment}
          />
        </View>

        {/* 📆 New Estimated Debt-Free Date */}
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Estimated Debt-Free In
          </Text>
          <Text style={[styles.cardValue, { color: colors.primary }]}>
            {newDebtFreeMonths} months
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

        {/* 🔍 View Detailed Forecast */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.accent }]}
          onPress={() =>
            navigation.navigate('PaymentForecast', { extraPayment, lumpSum })
          }
        >
          <Text style={[styles.buttonText, { color: colors.surface }]}>
            View Detailed Payment Forecast
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  card: { padding: 15, borderRadius: 10, marginBottom: 15 },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardValue: { fontSize: 22, fontWeight: 'bold', marginTop: 5 },
  input: {
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginTop: 5,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { fontSize: 16, fontWeight: 'bold' },
  subText: { fontSize: 14, marginTop: 5 },
});

export default LoanPaymentSimulator;
