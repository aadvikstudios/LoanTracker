import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { useLoans } from '../context/LoanProvider'; // ✅ Import Loan Context
import { MaterialIcons } from '@expo/vector-icons'; // ✅ Import Icons

const LoanTable = ({ navigation }) => {
  const { colors } = useTheme();
  const { loans, removeLoan } = useLoans(); // ✅ Get removeLoan function from LoanProvider

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
            Name
          </Text>
          <Text style={[styles.tableHeaderText, { color: colors.textAccent }]}>
            Balance
          </Text>
          <Text style={[styles.tableHeaderText, { color: colors.textAccent }]}>
            Rate
          </Text>
          <Text style={[styles.tableHeaderText, { color: colors.textAccent }]}>
            Min Pmt
          </Text>
          <Text style={[styles.tableHeaderText, { color: colors.textAccent }]}>
            Due Date
          </Text>
          <Text style={[styles.tableHeaderText, { color: colors.textAccent }]}>
            Actions
          </Text>
        </View>
      )}
      renderItem={({ item }) => (
        <View style={[styles.tableRow, { backgroundColor: colors.surface }]}>
          <Text style={[styles.tableCell, { color: colors.text }]}>
            {item.name}
          </Text>
          <Text style={[styles.tableCell, { color: colors.text }]}>
            ${item.balance.toLocaleString()}
          </Text>
          <Text style={[styles.tableCell, { color: colors.text }]}>
            {item.interestRate.toFixed(2)}%
          </Text>
          <Text style={[styles.tableCell, { color: colors.text }]}>
            ${item.emi.toLocaleString()}
          </Text>
          <Text style={[styles.tableCell, { color: colors.text }]}>
            {item.dueDate}
          </Text>

          {/* Actions Column */}
          <View style={styles.actionContainer}>
            {/* Edit Button */}
            <TouchableOpacity
              onPress={() => navigation.navigate('EditLoan', { loan: item })}
            >
              <MaterialIcons
                name="edit"
                size={22}
                color={colors.primary}
                style={styles.icon}
              />
            </TouchableOpacity>

            {/* Delete Button */}
            <TouchableOpacity onPress={() => removeLoan(item.id)}>
              <MaterialIcons
                name="delete"
                size={22}
                color="red"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
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
    alignItems: 'center',
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
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 5,
  },
});

export default LoanTable;
