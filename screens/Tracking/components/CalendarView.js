import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../../../context/ThemeProvider';
import { Calendar } from 'react-native-calendars';

const paymentDates = {
  '2025-03-13': { marked: true, dotColor: '#6200ea' },
  '2025-04-01': { marked: true, dotColor: '#03dac6' },
  '2025-04-13': { marked: true, dotColor: '#03dac6' },
};

const paymentsData = {
  '2025-03-13': [{ id: '1', name: 'SBI CC', amount: '$5,000.00' }],
  '2025-04-01': [{ id: '2', name: 'Recurring Funding', amount: '$5,000.00' }],
  '2025-04-13': [{ id: '3', name: 'SBI CC', amount: '$5,000.00' }],
};

const CalendarView = () => {
  const { colors } = useTheme();
  const [selectedDate, setSelectedDate] = useState('2025-03-13');

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={day => setSelectedDate(day.dateString)}
        markedDates={paymentDates}
        theme={{
          backgroundColor: colors.background,
          calendarBackground: colors.surface,
          dayTextColor: colors.text,
          todayTextColor: colors.primary,
          selectedDayBackgroundColor: colors.primary,
        }}
      />

      {/* List of payments for the selected date */}
      <View style={styles.paymentContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {selectedDate}
        </Text>
        <FlatList
          data={paymentsData[selectedDate] || []}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View
              style={[styles.paymentCard, { backgroundColor: colors.surface }]}
            >
              <Text style={[styles.paymentName, { color: colors.text }]}>
                {item.name}
              </Text>
              <Text style={[styles.paymentAmount, { color: colors.text }]}>
                {item.amount}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, marginTop: 10 },
  paymentContainer: { marginTop: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  paymentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  paymentName: { fontSize: 16, fontWeight: 'bold' },
  paymentAmount: { fontSize: 16, fontWeight: 'bold' },
});

export default CalendarView;
