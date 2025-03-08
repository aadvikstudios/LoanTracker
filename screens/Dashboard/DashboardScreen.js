import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { useLoans } from '../../context/LoanProvider'; // ✅ Import Loan Context
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ActionCardsGrid from './ActionCardsGrid';
import Summary from './Summary';
import LoanTable from './LoanTable';

const DashboardScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { loans } = useLoans(); // ✅ Get loans from LoanProvider
  console.log('loans', loans);
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <Header />

      {/* Action Cards Grid */}
      <ActionCardsGrid navigation={navigation} />

      {/* Summary Section */}
      <Summary loans={loans} />

      {/* Loan Table */}
      <LoanTable loans={loans} />

      {/* Footer */}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default DashboardScreen;
