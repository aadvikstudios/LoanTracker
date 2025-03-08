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
import { useLoans } from '../context/LoanProvider'; // ✅ Import Loan Context
import Header from '../components/Header';

const AddLoan = ({ navigation }) => {
  const { colors } = useTheme();
  const { addLoan } = useLoans(); // ✅ Access addLoan function

  const [loanName, setLoanName] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [emi, setEmi] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = () => {
    if (!loanName || !loanAmount || !interestRate || !emi || !duration) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const newLoan = {
      name: loanName,
      amount: parseFloat(loanAmount),
      interest: parseFloat(interestRate),
      emi: parseFloat(emi),
      duration: parseInt(duration),
    };

    addLoan(newLoan); // ✅ Save Loan to Context + AsyncStorage
    Alert.alert('Success', 'Loan added successfully!');
    navigation.goBack(); // ✅ Navigate back to dashboard
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header />
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={[styles.title, { color: colors.text }]}>Add Loan</Text>

        {/* Loan Name */}
        <TextInput
          style={[
            styles.input,
            {
              borderColor: colors.borderLight,
              backgroundColor: colors.surface,
              color: colors.text,
            },
          ]}
          placeholder="Loan Name"
          placeholderTextColor={colors.textSecondary}
          value={loanName}
          onChangeText={setLoanName}
        />

        {/* Loan Amount */}
        <TextInput
          style={[
            styles.input,
            {
              borderColor: colors.borderLight,
              backgroundColor: colors.surface,
              color: colors.text,
            },
          ]}
          placeholder="Loan Amount"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={loanAmount}
          onChangeText={setLoanAmount}
        />

        {/* Interest Rate */}
        <TextInput
          style={[
            styles.input,
            {
              borderColor: colors.borderLight,
              backgroundColor: colors.surface,
              color: colors.text,
            },
          ]}
          placeholder="Interest Rate (%)"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={interestRate}
          onChangeText={setInterestRate}
        />

        {/* EMI Amount */}
        <TextInput
          style={[
            styles.input,
            {
              borderColor: colors.borderLight,
              backgroundColor: colors.surface,
              color: colors.text,
            },
          ]}
          placeholder="EMI Amount"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={emi}
          onChangeText={setEmi}
        />

        {/* Duration */}
        <TextInput
          style={[
            styles.input,
            {
              borderColor: colors.borderLight,
              backgroundColor: colors.surface,
              color: colors.text,
            },
          ]}
          placeholder="Duration (Months)"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={duration}
          onChangeText={setDuration}
        />

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleSubmit}
        >
          <Text style={[styles.buttonText, { color: colors.textAccent }]}>
            Add Loan
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
