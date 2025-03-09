import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { useLoans } from '../context/LoanProvider';
import moment from 'moment'; // For date formatting

const PaymentForecast = ({ extraPayment = 0 }) => {
  const { colors } = useTheme();
  const { loans } = useLoans();
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    generateForecast();
  }, [loans, extraPayment]);

  const generateForecast = () => {
    let tempForecast = [];
    let currentDate = moment();
    let remainingBalance = loans.reduce((sum, loan) => sum + loan.balance, 0);
    let totalEMI = loans.reduce((sum, loan) => sum + loan.emi, 0);
    let interestRates = loans.map(loan => loan.interestRate / 100);

    while (remainingBalance > 0) {
      let monthInterest =
        (remainingBalance *
          (interestRates.reduce((a, b) => a + b, 0) / loans.length)) /
        12;
      let principalPaid = totalEMI + extraPayment - monthInterest;
      if (principalPaid < 0) break; // Prevent infinite loop

      remainingBalance -= principalPaid;
      if (remainingBalance < 0) remainingBalance = 0; // Avoid negative balance

      tempForecast.push({
        month: currentDate.format('MMM YYYY'),
        startingBalance: remainingBalance + principalPaid,
        emiPaid: totalEMI,
        extraPaid: extraPayment,
        interestPaid: monthInterest,
        principalPaid: principalPaid,
        remainingBalance,
      });

      currentDate.add(1, 'months');
    }

    setForecast(tempForecast);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.header, { color: colors.primary }]}>
        📅 Loan Payment Forecast
      </Text>
      <ScrollView horizontal>
        <View>
          <View style={styles.tableHeader}>
            <Text style={styles.cell}>Month</Text>
            <Text style={styles.cell}>Start Balance</Text>
            <Text style={styles.cell}>EMI Paid</Text>
            <Text style={styles.cell}>Extra Paid</Text>
            <Text style={styles.cell}>Interest Paid</Text>
            <Text style={styles.cell}>Principal Paid</Text>
            <Text style={styles.cell}>Remaining Balance</Text>
          </View>
          {forecast.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.cell}>{item.month}</Text>
              <Text style={styles.cell}>
                ₹{item.startingBalance.toFixed(2)}
              </Text>
              <Text style={styles.cell}>₹{item.emiPaid.toFixed(2)}</Text>
              <Text style={styles.cell}>₹{item.extraPaid.toFixed(2)}</Text>
              <Text style={styles.cell}>₹{item.interestPaid.toFixed(2)}</Text>
              <Text style={styles.cell}>₹{item.principalPaid.toFixed(2)}</Text>
              <Text style={styles.cell}>
                ₹{item.remainingBalance.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, borderRadius: 8, marginVertical: 10 },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#444', padding: 10 },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    padding: 5,
  },
});

export default PaymentForecast;
