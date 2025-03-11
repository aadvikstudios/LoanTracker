import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../context/ThemeProvider';

const debtSteps = [
  {
    step: 1,
    completion: 'Jan 13, 2028',
    duration: '2 years 10 months',
    name: 'SBI CC',
    tag: 'Minimum',
    count: 34,
  },
  {
    step: 2,
    completion: 'Jan 13, 2028',
    duration: '0 days',
    name: 'SBI CC Payoff',
    tag: 'Payoff',
    count: 1,
  },
];

const DebtPayoffSteps = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Step-by-step payoff plan
      </Text>

      {debtSteps.map(debt => (
        <View
          key={debt.step}
          style={[styles.card, { backgroundColor: colors.surface }]}
        >
          <View style={styles.row}>
            <View
              style={[
                styles.stepContainer,
                { backgroundColor: colors.primaryLight },
              ]}
            >
              <Text style={[styles.stepText, { color: colors.text }]}>
                STEP {debt.step}
              </Text>
              <Text style={[styles.countText, { color: colors.textLight }]}>
                {debt.count} to go
              </Text>
            </View>
            <View style={styles.details}>
              <Text style={{ fontSize: 14, color: colors.text }}>
                Completes on{' '}
                <Text style={{ fontWeight: 'bold' }}>{debt.completion}</Text>
              </Text>
              <Text style={{ fontSize: 12, color: colors.textLight }}>
                ({debt.duration})
              </Text>
            </View>
          </View>

          <View style={styles.debtRow}>
            <Text style={{ fontSize: 14, color: colors.text }}>
              {debt.name}
            </Text>
            <View style={[styles.tag, { backgroundColor: colors.primary }]}>
              <Text style={{ color: colors.textAccent, fontSize: 12 }}>
                {debt.tag}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepContainer: {
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  stepText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  countText: {
    fontSize: 12,
  },
  details: {
    flex: 1,
  },
  debtRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
});

export default DebtPayoffSteps;
