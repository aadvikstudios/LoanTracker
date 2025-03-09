import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../context/ThemeProvider';
import { useLoans } from '../context/LoanProvider';
import Header from '../components/Header';
import LoanTable from '../components/LoanTable';

const AddLoan = ({ navigation }) => {
  const { colors } = useTheme();
  const { addLoan } = useLoans();

  // State for form inputs
  const [loanName, setLoanName] = useState('');
  const [balance, setBalance] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [emi, setEmi] = useState('');

  // Date Picker State
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Function to handle date selection
  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') setShowDatePicker(false); // Hide picker on Android after selection
    if (selectedDate) setDueDate(selectedDate);
  };

  const handleSubmit = () => {
    if (!loanName || !balance || !interestRate || !emi) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    // Generate a unique ID using timestamp + random number
    const generateUniqueId = () => {
      return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    };

    const newLoan = {
      id: generateUniqueId(),
      name: loanName,
      balance: parseFloat(balance),
      interestRate: parseFloat(interestRate),
      emi: parseFloat(emi),
      dueDate: dueDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
    };

    addLoan(newLoan);
    Alert.alert('Success', 'Loan added successfully!');
    navigation.navigate('Dashboard');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Add Loan" showBackButton={true} />
      <ScrollView contentContainerStyle={styles.formContainer}>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: colors.border,
              backgroundColor: colors.surface,
              color: colors.text,
            },
          ]}
          placeholder="Loan Name"
          placeholderTextColor={colors.textLight}
          value={loanName}
          onChangeText={setLoanName}
        />

        <TextInput
          style={[
            styles.input,
            {
              borderColor: colors.border,
              backgroundColor: colors.surface,
              color: colors.text,
            },
          ]}
          placeholder="Balance"
          placeholderTextColor={colors.textLight}
          keyboardType="numeric"
          value={balance}
          onChangeText={setBalance}
        />

        <TextInput
          style={[
            styles.input,
            {
              borderColor: colors.border,
              backgroundColor: colors.surface,
              color: colors.text,
            },
          ]}
          placeholder="Interest Rate (%)"
          placeholderTextColor={colors.textLight}
          keyboardType="numeric"
          value={interestRate}
          onChangeText={setInterestRate}
        />

        <TextInput
          style={[
            styles.input,
            {
              borderColor: colors.border,
              backgroundColor: colors.surface,
              color: colors.text,
            },
          ]}
          placeholder="Minimum Payment (EMI)"
          placeholderTextColor={colors.textLight}
          keyboardType="numeric"
          value={emi}
          onChangeText={setEmi}
        />

        {/* Date Picker */}
        <TouchableOpacity
          style={[
            styles.datePickerButton,
            { borderColor: colors.border, backgroundColor: colors.surface },
          ]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={[styles.dateText, { color: colors.text }]}>
            {dueDate.toDateString()} {/* Show formatted date */}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={dueDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleSubmit}
        >
          <Text style={[styles.buttonText, { color: colors.surface }]}>
            Add Loan
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <LoanTable />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  datePickerButton: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  dateText: {
    fontSize: 16,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddLoan;
