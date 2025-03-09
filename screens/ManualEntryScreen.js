import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { useLoans } from '../context/LoanProvider';
import Header from '../components/Header';
import { Picker } from '@react-native-picker/picker';

const ManualEntryScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { loans, updateLoan } = useLoans();

  // State for user inputs
  const [selectedLoan, setSelectedLoan] = useState(
    loans.length ? loans[0].id : ''
  );
  const [amountPaid, setAmountPaid] = useState('');
  const [extraPayment, setExtraPayment] = useState('');

  // Handle Payment Submission
  const handlePaymentSubmit = () => {
    if (!selectedLoan || !amountPaid) {
      Alert.alert('Error', 'Please select a loan and enter an amount.');
      return;
    }

    const selectedLoanData = loans.find(loan => loan.id === selectedLoan);
    const paymentAmount = parseFloat(amountPaid) || 0;
    const extraPay = parseFloat(extraPayment) || 0;
    const totalPayment = paymentAmount + extraPay;

    if (totalPayment > selectedLoanData.balance) {
      Alert.alert('Error', 'Payment cannot exceed remaining balance.');
      return;
    }

    // Update Loan Balance
    const updatedLoan = {
      ...selectedLoanData,
      balance: selectedLoanData.balance - totalPayment,
    };

    updateLoan(updatedLoan);
    Alert.alert('Success', 'Payment recorded successfully!');
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Log a Payment" showBackButton={true} />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Select Loan Dropdown */}
        <Text style={[styles.label, { color: colors.text }]}>Select Loan</Text>
        <Picker
          selectedValue={selectedLoan}
          onValueChange={value => setSelectedLoan(value)}
          style={[
            styles.picker,
            { backgroundColor: colors.surface, color: colors.text },
          ]}
        >
          {loans.map(loan => (
            <Picker.Item
              key={loan.id}
              label={`${loan.name} - ₹${loan.balance}`}
              value={loan.id}
            />
          ))}
        </Picker>

        {/* Amount Paid Input */}
        <Text style={[styles.label, { color: colors.text }]}>Amount Paid</Text>
        <TextInput
          style={[
            styles.input,
            { borderColor: colors.border, color: colors.text },
          ]}
          keyboardType="numeric"
          placeholder="₹0"
          placeholderTextColor={colors.textSecondary}
          value={amountPaid}
          onChangeText={setAmountPaid}
        />

        {/* Extra Payment Input */}
        <Text style={[styles.label, { color: colors.text }]}>
          Extra Payment (Optional)
        </Text>
        <TextInput
          style={[
            styles.input,
            { borderColor: colors.border, color: colors.text },
          ]}
          keyboardType="numeric"
          placeholder="₹0"
          placeholderTextColor={colors.textSecondary}
          value={extraPayment}
          onChangeText={setExtraPayment}
        />

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handlePaymentSubmit}
        >
          <Text style={[styles.buttonText, { color: colors.surface }]}>
            Save Payment
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  picker: { height: 50, marginBottom: 15 },
  input: {
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { fontSize: 16, fontWeight: 'bold' },
});

export default ManualEntryScreen;
