import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../context/ThemeProvider';
import { useLoans } from '../../../context/LoanProvider';
import { PieChart } from 'react-native-chart-kit';

const LoanOverview = () => {
  const { colors } = useTheme();
  const { loans } = useLoans();

  // Calculate Total Loan Balance & EMI
  const totalLoanAmount = loans.reduce((sum, loan) => sum + loan.balance, 0);
  const totalEMI = loans.reduce((sum, loan) => sum + loan.emi, 0);
  const totalOriginalLoan = loans.reduce(
    (sum, loan) => sum + (loan.originalBalance || loan.balance),
    0
  );
  const totalPaid = totalOriginalLoan - totalLoanAmount;

  // Data for Pie Chart
  const pieData = [
    {
      name: 'Remaining Debt',
      amount: totalLoanAmount,
      color: colors.primary,
      legendFontColor: colors.text,
      legendFontSize: 14,
    },
    {
      name: 'Paid Off',
      amount: totalPaid,
      color: colors.accent,
      legendFontColor: colors.text,
      legendFontSize: 14,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Loan Overview
      </Text>

      <View style={styles.row}>
        <View style={styles.column}>
          <View style={styles.card}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Total Loan Amount
            </Text>
            <Text style={[styles.cardValue, { color: colors.primary }]}>
              ₹{totalLoanAmount.toLocaleString()}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Total EMI
            </Text>
            <Text style={[styles.cardValue, { color: colors.primary }]}>
              ₹{totalEMI.toLocaleString()}/month
            </Text>
          </View>
        </View>

        {/* Pie Chart Display */}
        <View style={styles.column}>
          <PieChart
            data={pieData}
            width={200}
            height={150}
            chartConfig={{
              backgroundColor: colors.surface,
              backgroundGradientFrom: colors.surface,
              backgroundGradientTo: colors.surface,
              color: (opacity = 1) => colors.primary,
            }}
            accessor={'amount'}
            backgroundColor={'transparent'}
            paddingLeft={'10'}
            absolute
          />
        </View>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
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
});

export default LoanOverview;
