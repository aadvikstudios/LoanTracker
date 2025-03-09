import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { useLoans } from '../context/LoanProvider'; // ✅ Import Loan Context

const LoginScreen = ({ navigation }) => {
  const { colors } = useTheme(); // ✅ Apply theme colors
  const { loans, clearLoans } = useLoans(); // ✅ Get removeLoan function from LoanProvider
  console.log('loans', loans);
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Login Screen</Text>

      {/* Signup Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.accent }]}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={[styles.buttonText, { color: colors.textAccent }]}>
          Go to Signup
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: 'red', marginTop: 10 }]}
        onPress={clearLoans}
      >
        <Text style={[styles.buttonText, { color: 'white' }]}>
          Clear All Loans
        </Text>
      </TouchableOpacity>

      {/* Dashboard Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Text style={[styles.buttonText, { color: colors.textAccent }]}>
          Go to Dashboard
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
