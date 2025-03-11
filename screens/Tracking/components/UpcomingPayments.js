import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useTheme } from '../../../context/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

const payments = [
  {
    id: '1',
    name: 'SBI CC',
    date: 'Mar 13, 2025',
    amount: '$5,000.00',
    status: 'Due',
  },
  {
    id: '2',
    name: 'Recurring funding',
    date: 'Apr 1, 2025',
    amount: '$5,000.00',
    status: 'Fund',
  },
  {
    id: '3',
    name: 'SBI CC',
    date: 'Apr 13, 2025',
    amount: '$5,000.00',
    status: 'Minimum',
  },
];

const UpcomingPayments = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <FlatList
        data={payments}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <View>
              <Text style={[styles.name, { color: colors.text }]}>
                {item.name}
              </Text>
              <Text style={[styles.date, { color: colors.textLight }]}>
                {item.date}
              </Text>
            </View>
            <Text style={[styles.amount, { color: colors.text }]}>
              {item.amount}
            </Text>
            <TouchableOpacity>
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color={colors.success}
              />
            </TouchableOpacity>
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
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  date: { fontSize: 12 },
  amount: { fontSize: 16, fontWeight: 'bold' },
});

export default UpcomingPayments;
