import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeProvider';
import { useLoans } from '../../context/LoanProvider';
import Header from '../../components/Header';

// Import Components
import LoanOverview from './components/LoanOverview';
import DebtFreeTimeline from './components/DebtFreeTimeline';
import PaymentPlanner from './components/PaymentPlanner';

// Import Other Screens for Bottom Tabs
import DebtsScreen from '../Debts/DebtsScreen';
import StrategyScreen from '../Strategy/StrategyScreen';
import PlanScreen from '../PayoffPlan/PlanScreen';
import TrackingScreen from '../Tracking/TrackingScreen';

const Tab = createBottomTabNavigator();

const DashboardHome = () => {
  const { colors } = useTheme();
  const { loans } = useLoans();
  const [extraPayment, setExtraPayment] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Loan Tracker" showBackButton={false} />
      <ScrollView contentContainerStyle={styles.dashboardContent}>
        <View style={styles.section}>
          <LoanOverview />
        </View>
        <View style={styles.section}>
          <DebtFreeTimeline />
        </View>
        <View style={styles.section}>
          <PaymentPlanner />
        </View>
      </ScrollView>
    </View>
  );
};
const DashboardScreen = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // ✅ Hide Header
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Debts':
              iconName = 'account-balance';
              break;
            case 'Strategy':
              iconName = 'lightbulb';
              break;
            case 'Plan':
              iconName = 'assignment';
              break;
            case 'Track':
              iconName = 'bar-chart';
              break;
            default:
              iconName = 'circle';
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: { backgroundColor: colors.surface },
      })}
    >
      <Tab.Screen name="Home" component={DashboardHome} />
      <Tab.Screen name="Debts" component={DebtsScreen} />
      <Tab.Screen name="Strategy" component={StrategyScreen} />
      <Tab.Screen name="Plan" component={PlanScreen} />
      <Tab.Screen name="Track" component={TrackingScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  dashboardContent: { padding: 20 },
  section: { marginBottom: 20 },
});

export default DashboardScreen;
