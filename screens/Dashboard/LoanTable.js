import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';

const LoanTable = ({ loans }) => {
  const { colors } = useTheme();

  return (
    <FlatList
      data={loans}
      keyExtractor={item => item.id}
      style={styles.table}
      ListHeaderComponent={() => (
        <View
          style={[
            styles.tableRow,
            styles.tableHeader,
            { backgroundColor: colors.primary },
          ]}
        >
          <Text style={[styles.tableHeaderText, { color: colors.textAccent }]}>
            Loan
          </Text>
          <Text style={[styles.tableHeaderText, { color: colors.textAccent }]}>
            Amount
          </Text>
          <Text style={[styles.tableHeaderText, { color: colors.textAccent }]}>
            Interest
          </Text>
        </View>
      )}
      renderItem={({ item }) => (
        <View style={[styles.tableRow, { backgroundColor: colors.surface }]}>
          <Text style={[styles.tableCell, { color: colors.text }]}>
            {item.name}
          </Text>
          <Text style={[styles.tableCell, { color: colors.text }]}>
            ${item.amount}
          </Text>
          <Text style={[styles.tableCell, { color: colors.text }]}>
            {item.interest}%
          </Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  table: {
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  tableHeader: {
    borderBottomWidth: 1,
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableCell: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
});

export default LoanTable;
