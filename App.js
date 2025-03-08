import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { ThemeProvider } from './context/ThemeProvider';
import { LoanProvider } from './context/LoanProvider'; // ✅ Import LoanProvider

export default function App() {
  return (
    <ThemeProvider>
      <LoanProvider>
        {' '}
        {/* ✅ Wrap with LoanProvider */}
        <SafeAreaView
          style={{ flex: 1, paddingTop: StatusBar.currentHeight || 0 }}
        >
          <AppNavigator />
        </SafeAreaView>
      </LoanProvider>
    </ThemeProvider>
  );
}
