import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import AddLoan from '../screens/AddLoan';
import LoanPayoffStrategy from '../screens/LoanPayoffStrategy';
import LoanPaymentSimulator from '../screens/LoanPaymentSimulator';
import MonthlyTrackingScreen from '../screens/MonthlyTrackingScreen';
import ManualEntryScreen from '../screens/ManualEntryScreen';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }} // ✅ Disable default header globally
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="AddLoan" component={AddLoan} />
        <Stack.Screen
          name="LoanPayoffStrategy"
          component={LoanPayoffStrategy}
        />
        <Stack.Screen
          name="LoanPaymentSimulator"
          component={LoanPaymentSimulator}
        />
        <Stack.Screen
          name="MonthlyTracking"
          component={MonthlyTrackingScreen}
        />
        <Stack.Screen name="ManualEntry" component={ManualEntryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
