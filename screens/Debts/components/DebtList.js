import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import DebtItem from './DebtItem';
import { useTheme } from '../../../context/ThemeProvider';

const DebtList = ({ loans }) => {
  const { colors } = useTheme();

  return (
    <View>
      {loans.length === 0 ? (
        <Text style={[styles.noDebtText, { color: colors.textSecondary }]}>
          You haven't added any debts yet.
        </Text>
      ) : (
        <FlatList
          data={loans}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <DebtItem item={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  noDebtText: { textAlign: 'center', marginTop: 20 },
});

export default DebtList;
