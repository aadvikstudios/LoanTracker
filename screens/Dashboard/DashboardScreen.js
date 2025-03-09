import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { useLoans } from '../../context/LoanProvider';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ActionCardsGrid from './ActionCardsGrid';
import Summary from '../../components/Summary';
import LoanTable from '../../components/LoanTable';

const DashboardScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { loans } = useLoans(); // ✅ Get loans from LoanProvider
  console.log('loans', loans);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Loan Tracker" showBackButton={false} />

      <ActionCardsGrid navigation={navigation} />

      <Summary />

      <LoanTable />

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
