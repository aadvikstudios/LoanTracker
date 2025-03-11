import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useTheme } from '../../../context/ThemeProvider';

const DebtPieChart = ({ loans }) => {
  const { colors } = useTheme();

  const categoryTotals = loans.reduce((acc, loan) => {
    acc[loan.category] = (acc[loan.category] || 0) + loan.balance;
    return acc;
  }, {});

  const pieData = Object.keys(categoryTotals).map((category, index) => ({
    name: category,
    amount: categoryTotals[category],
    color: index % 2 === 0 ? colors.primary : colors.accent,
    legendFontColor: colors.text,
    legendFontSize: 14,
  }));

  return (
    <View style={styles.chartContainer}>
      <Text style={[styles.chartTitle, { color: colors.text }]}>
        Balance by Category
      </Text>
      <PieChart
        data={pieData}
        width={300}
        height={180}
        chartConfig={{
          backgroundColor: colors.surface,
          backgroundGradientFrom: colors.surface,
          backgroundGradientTo: colors.surface,
          color: (opacity = 1) => colors.primary,
        }}
        accessor={'amount'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
        absolute
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: { alignItems: 'center', marginBottom: 20 },
  chartTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
});

export default DebtPieChart;
