import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../context/ThemeProvider';

const DebtItem = ({ item }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.debtItem, { backgroundColor: colors.surface }]}>
      <Text style={[styles.debtName, { color: colors.text }]}>{item.name}</Text>
      <Text style={[styles.debtAmount, { color: colors.primary }]}>
        ${item.balance.toLocaleString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  debtItem: { padding: 15, borderRadius: 8, marginBottom: 10 },
  debtName: { fontSize: 16, fontWeight: 'bold' },
  debtAmount: { fontSize: 18, fontWeight: 'bold' },
});

export default DebtItem;
