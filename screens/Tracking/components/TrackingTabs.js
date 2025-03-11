import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { SegmentedButtons, Text } from 'react-native-paper';

const TrackingTabs = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      <SegmentedButtons
        value={activeTab}
        onValueChange={setActiveTab}
        buttons={[
          {
            value: 'Upcoming',
            label: <Text variant="medium">Upcoming</Text>, // ✅ Fix variant issue
            icon: 'clock-outline',
          },
          {
            value: 'Complete',
            label: <Text variant="medium">Complete</Text>,
            icon: 'check-circle-outline',
          },
          {
            value: 'Calendar',
            label: <Text variant="medium">Calendar</Text>,
            icon: 'calendar-month-outline',
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Center align the tabs
    paddingHorizontal: 10,
    marginVertical: 5, // Reduce space above & below
  },
});

export default TrackingTabs;
