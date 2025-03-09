import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { useLoans } from '../context/LoanProvider';
import Header from '../components/Header';
import LoanTable from '../components/LoanTable';
import { Picker } from '@react-native-picker/picker'; // Updated Picker import for better support
import { v4 as uuidv4 } from 'uuid'; // Ensure unique loan IDs

const AddLoan = ({ navigation }) => {
  const { colors } = useTheme(); // Use theme colors
  const { addLoan } = useLoans();

  // State for form inputs
  const [loanName, setLoanName] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [remainingBalance, setRemainingBalance] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [emi, setEmi] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState(''); // New category state

  // List of loan categories
  const categories = [
    'Credit Card',
    'Personal Loan',
    'Auto Loan',
    'Home Loan',
    'Student Loan',
  ];

  const handleSubmit = () => {
    if (
      !loanName ||
      !loanAmount ||
      !remainingBalance ||
      !interestRate ||
      !emi ||
      !duration ||
      !category
    ) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (parseFloat(remainingBalance) > parseFloat(loanAmount)) {
      Alert.alert(
        'Error',
        'Remaining balance cannot be more than the loan amount.'
      );
      return;
    }

    const newLoan = {
      id: uuidv4(),
      name: loanName,
      category, // ✅ Add category
      amount: parseFloat(loanAmount),
      remaining: parseFloat(remainingBalance), // ✅ Store remaining balance
      interest: parseFloat(interestRate),
      emi: parseFloat(emi),
      duration: parseInt(duration),
    };

    addLoan(newLoan);
    Alert.alert('Success', 'Loan added successfully!');
    navigation.navigate('Dashboard'); // ✅ Navigate to Dashboard
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
          placeholder="Loan Amount"
          placeholderTextColor={colors.textLight}
          keyboardType="numeric"
          value={loanAmount}
          onChangeText={setLoanAmount}
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
          placeholder="Remaining Balance"
          placeholderTextColor={colors.textLight}
          keyboardType="numeric"
          value={remainingBalance}
          onChangeText={setRemainingBalance}
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
          placeholder="EMI Amount"
          placeholderTextColor={colors.textLight}
          keyboardType="numeric"
          value={emi}
          onChangeText={setEmi}
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
          placeholder="Duration (Months)"
          placeholderTextColor={colors.textLight}
          keyboardType="numeric"
          value={duration}
          onChangeText={setDuration}
        />
        <View
          style={[
            styles.pickerContainer,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Picker
            selectedValue={category}
            onValueChange={itemValue => setCategory(itemValue)}
            style={[styles.picker, { color: colors.text }]}
            dropdownIconColor={colors.primary} // Ensures the dropdown icon matches the theme
            mode="dropdown" // Forces dropdown mode (better for web)
          >
            <Picker.Item label="Select Loan Category" value="" />
            {categories.map((cat, index) => (
              <Picker.Item key={index} label={cat} value={cat} />
            ))}
          </Picker>
        </View>
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 2,
    width: '100%',
  },

  picker: {
    height: 50,
    fontSize: 16,
    width: '100%', // Ensures proper width
    backgroundColor: 'transparent', // Prevents weird white dropdowns
    borderRadius: 8,
    textAlign: 'center',
    textAlignVertical: 'center', // Fixes alignment
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
