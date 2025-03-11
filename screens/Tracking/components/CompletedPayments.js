import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../../../context/ThemeProvider';

const completedPayments = [
  {
    id: '1',
    name: 'SBI CC',
    date: 'Feb 13, 2025',
    amount: '$5,000.00',
    status: 'Paid',
  },
];

const CompletedPayments = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <FlatList
        data={completedPayments}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <Text style={[styles.name, { color: colors.text }]}>
              {item.name}
            </Text>
            <Text style={[styles.date, { color: colors.textLight }]}>
              {item.date}
            </Text>
            <Text style={[styles.amount, { color: colors.text }]}>
              {item.amount}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, marginTop: 10 },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  date: { fontSize: 12 },
  amount: { fontSize: 16, fontWeight: 'bold' },
});

export default CompletedPayments;
