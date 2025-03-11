import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import HeaderForBottomMenu from '../HeaderForBottomMenu';
import PlanSummary from './components/PlanSummary';
import { useTheme } from '../../context/ThemeProvider';

import DebtPayoffSteps from './components/DebtPayoffSteps';

const PlanScreen = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <HeaderForBottomMenu
        title="Payoff Plan"
        subtitle="The step-by-step plan to your debt-free future"
        showTutorial={true}
      />

      <ScrollView>
        <PlanSummary />
        <DebtPayoffSteps />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1 } });

export default PlanScreen;
