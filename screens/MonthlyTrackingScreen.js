import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { useLoans } from '../context/LoanProvider';
import Header from '../components/Header';
import ProgressBar from '../components/ProgressBar';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';

const MonthlyTrackingScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { loans } = useLoans();

  // Simulated Monthly Data
  const [monthlyData, setMonthlyData] = useState([]);

  // Generate Fake Monthly Data (Replace with Actual Data Later)
  useEffect(() => {
    const data = loans.map(loan => {
      let balance = loan.balance;
      const records = [];
      for (let i = 1; i <= 12; i++) {
        balance -= loan.emi; // Simulate payment
        if (balance < 0) balance = 0;
        records.push({
          month: moment()
            .subtract(12 - i, 'months')
            .format('MMM YYYY'),
          balance: balance,
        });
      }
      return { name: loan.name, records };
    });

    setMonthlyData(data);
  }, [loans]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Monthly Tracking" showBackButton={true} />

      <ScrollView contentContainerStyle={styles.content}>
        {monthlyData.map((loan, index) => (
          <View
            key={index}
            style={[styles.card, { backgroundColor: colors.surface }]}
          >
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              {loan.name} Loan Progress
            </Text>

            {/* Line Chart for Loan Balance Over Time */}
            <LineChart
              data={{
                labels: loan.records.map(r => r.month),
                datasets: [{ data: loan.records.map(r => r.balance) }],
              }}
              width={350}
              height={220}
              yAxisLabel="₹"
              yAxisSuffix=""
              chartConfig={{
                backgroundColor: colors.surface,
                backgroundGradientFrom: colors.surface,
                backgroundGradientTo: colors.surface,
                color: (opacity = 1) => colors.primary,
                labelColor: (opacity = 1) => colors.text,
              }}
              bezier
              style={{ marginVertical: 10, borderRadius: 8 }}
            />

            {/* Debt Payoff Progress Bar */}
            <ProgressBar
              progress={
                1 -
                loan.records[loan.records.length - 1].balance /
                  loan.records[0].balance
              }
            />
            <Text style={[styles.subText, { color: colors.textSecondary }]}>
              {Math.round(
                (1 -
                  loan.records[loan.records.length - 1].balance /
                    loan.records[0].balance) *
                  100
              )}
              % Paid Off
            </Text>
          </View>
        ))}

        {/* 📌 Add Manual Entry Button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.accent }]}
          onPress={() => navigation.navigate('ManualEntry')}
        >
          <Text style={[styles.buttonText, { color: colors.surface }]}>
            Log a Payment
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
  subText: { fontSize: 14, marginTop: 5 },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { fontSize: 16, fontWeight: 'bold' },
});

export default MonthlyTrackingScreen;
