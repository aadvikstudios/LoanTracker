import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import HeaderForBottomMenu from '../HeaderForBottomMenu';
import TrackingTabs from './components/TrackingTabs';
import UpcomingPayments from './components/UpcomingPayments';
import CompletedPayments from './components/CompletedPayments';
import CalendarView from './components/CalendarView';

import { useTheme } from '../../context/ThemeProvider';

const TrackingScreen = () => {
  const { colors } = useTheme();

  const [activeTab, setActiveTab] = useState('Upcoming');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <HeaderForBottomMenu
        title="Tracking"
        subtitle="Record your transactions"
        showTutorial={true}
      />
      <TrackingTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'Upcoming' && <UpcomingPayments />}
      {activeTab === 'Complete' && <CompletedPayments />}
      {activeTab === 'Calendar' && <CalendarView />}
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1 } });

export default TrackingScreen;
