import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { ThemeProvider } from './context/ThemeProvider';

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight || 0 }}>
        <AppNavigator />
      </SafeAreaView>
    </ThemeProvider>
  );
}