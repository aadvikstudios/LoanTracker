import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import RecurringFunding from './components/RecurringFunding';
import OneTimeFunding from './components/OneTimeFunding';
import ExtraPaymentPriority from './components/ExtraPaymentPriority';
import HeaderForBottomMenu from '../HeaderForBottomMenu';

const StrategyScreen = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <HeaderForBottomMenu
        title="Strategy"
        subtitle="Optimize your payoff plan"
        showTutorial={true}
      />
      <ScrollView style={styles.content}>
        <RecurringFunding />
        <OneTimeFunding />
        <ExtraPaymentPriority />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  tutorialButton: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: '#E3B3FF',
    borderRadius: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default StrategyScreen;
