import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '../context/ThemeProvider';
import { useLoans } from '../context/LoanProvider';
import moment from 'moment';

const DebtPayoffChart = ({ extraPayment = 0 }) => {
  const { colors } = useTheme();
  const { loans } = useLoans();
  const [chartData, setChartData] = useState({ labels: [], data: [] });

  useEffect(() => {
    generateChartData();
  }, [loans, extraPayment]);

  const generateChartData = () => {
    let labels = [];
    let data = [];
    let remainingBalance = loans.reduce((sum, loan) => sum + loan.balance, 0);
    let totalEMI = loans.reduce((sum, loan) => sum + loan.emi, 0);
    let interestRates = loans.map(loan => loan.interestRate / 100);

    let currentDate = moment();

    while (remainingBalance > 0) {
      labels.push(currentDate.format('MMM YYYY'));
      data.push(remainingBalance);

      let monthInterest =
        (remainingBalance *
          (interestRates.reduce((a, b) => a + b, 0) / loans.length)) /
        12;
      let principalPaid = totalEMI + extraPayment - monthInterest;

      remainingBalance -= principalPaid;
      if (remainingBalance < 0) remainingBalance = 0;
      currentDate.add(1, 'months');
    }

    setChartData({ labels, data });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.header, { color: colors.primary }]}>
        📈 Debt Payoff Trend
      </Text>
      <LineChart
        data={{
          labels: chartData.labels,
          datasets: [{ data: chartData.data }],
        }}
        width={350}
        height={220}
        yAxisLabel="₹"
        chartConfig={{
          backgroundColor: colors.surface,
          backgroundGradientFrom: colors.surface,
          backgroundGradientTo: colors.surface,
          decimalPlaces: 0,
          color: () => colors.primary,
          labelColor: () => colors.text,
          style: { borderRadius: 8 },
        }}
        style={{ borderRadius: 8 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, borderRadius: 8, marginVertical: 10 },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
});

export default DebtPayoffChart;
