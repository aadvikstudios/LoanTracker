import React, { useState, useEffect } from 'react';
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
import { Picker } from '@react-native-picker/picker'; // ✅ Loan Category Dropdown
import { useTheme } from '../context/ThemeProvider';
import { useLoans } from '../context/LoanProvider';
import Header from '../components/Header';

const loanCategories = [
  'Personal Loan',
  'Credit Card',
  'Auto Loan',
  'Home Loan',
  'Student Loan',
];

const AddLoan = ({ navigation }) => {
  const { colors } = useTheme();
  const { addLoan } = useLoans();

  // State for form inputs
  const [loanName, setLoanName] = useState('');
  const [category, setCategory] = useState(loanCategories[0]);
  const [balance, setBalance] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [emi, setEmi] = useState('');

  // Date Picker State
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Calculated Debt-Free Time
  const [estimatedMonths, setEstimatedMonths] = useState('N/A');

  // Function to handle date selection
  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') setShowDatePicker(false); // Hide picker on Android after selection
    if (selectedDate) setDueDate(selectedDate);
  };

  // Calculate Estimated Debt-Free Time
  useEffect(() => {
    if (balance && emi) {
      const balanceNum = parseFloat(balance);
      const emiNum = parseFloat(emi);
      if (emiNum > 0) {
        setEstimatedMonths(Math.ceil(balanceNum / emiNum) + ' months');
      } else {
        setEstimatedMonths('N/A'); // Avoid divide-by-zero issues
      }
    } else {
      setEstimatedMonths('N/A');
    }
  }, [balance, emi]);

  const handleSubmit = () => {
    if (!loanName || !balance || !interestRate || !emi) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    // Validate numeric inputs
    if (isNaN(balance) || isNaN(interestRate) || isNaN(emi)) {
      Alert.alert(
        'Error',
        'Please enter valid numbers for Balance, Interest Rate, and EMI.'
      );
      return;
    }

    // Generate a unique ID using timestamp + random number
    const generateUniqueId = () => {
      return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    };

    const newLoan = {
      id: generateUniqueId(),
      name: loanName,
      category,
      balance: parseFloat(balance),
      originalBalance: parseFloat(balance), // ✅ Added original balance
      interestRate: parseFloat(interestRate),
      emi: parseFloat(emi),
      dueDate: dueDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
    };

    addLoan(newLoan);
    Alert.alert('Success', 'Loan added successfully!');
    navigation.navigate('Dashboard');
  };

  const handleClearForm = () => {
    setLoanName('');
    setCategory(loanCategories[0]);
    setBalance('');
    setInterestRate('');
    setEmi('');
    setDueDate(new Date());
    setEstimatedMonths('N/A');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Add Loan" showBackButton={true} />
      <ScrollView contentContainerStyle={styles.formContainer}>
        {/* Loan Name Input */}
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

        {/* Loan Category Picker */}
        <Picker
          selectedValue={category}
          onValueChange={itemValue => setCategory(itemValue)}
          style={[
            styles.picker,
            { backgroundColor: colors.surface, color: colors.text },
          ]}
        >
          {loanCategories.map((cat, index) => (
            <Picker.Item key={index} label={cat} value={cat} />
          ))}
        </Picker>

        {/* Balance Input */}
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

        {/* Interest Rate Input */}
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

        {/* EMI Input */}
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

        {/* Show Estimated Debt-Free Time */}
        <Text style={[styles.estimateText, { color: colors.primary }]}>
          Estimated Debt-Free in: {estimatedMonths}
        </Text>

        {/* Date Picker */}
        <TouchableOpacity
          style={[
            styles.datePickerButton,
            { borderColor: colors.border, backgroundColor: colors.surface },
          ]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={[styles.dateText, { color: colors.text }]}>
            {dueDate.toDateString()}
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

        {/* Submit & Clear Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={handleSubmit}
          >
            <Text style={[styles.buttonText, { color: colors.surface }]}>
              Add Loan
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.secondary }]}
            onPress={handleClearForm}
          >
            <Text style={[styles.buttonText, { color: colors.surface }]}>
              Clear Form
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  formContainer: { padding: 20 },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  picker: { height: 50, marginBottom: 15 },
  datePickerButton: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  dateText: { fontSize: 16 },
  estimateText: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: { fontSize: 16, fontWeight: 'bold' },
});

export default AddLoan;
