import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { useLoans } from '../../context/LoanProvider';
import { MaterialIcons } from '@expo/vector-icons';
import DebtPieChart from './components/DebtPieChart';
import DebtList from './components/DebtList';
import DebtModal from './components/DebtModal';
import HeaderForBottomMenu from '../HeaderForBottomMenu';

const DebtsScreen = () => {
  const { colors } = useTheme();
  const { loans, addLoan } = useLoans();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <HeaderForBottomMenu
        title="Debts"
        subtitle="Manage all your debts in one place"
        showTutorial={false}
      />
      {/* Pie Chart */}
      {loans.length > 0 && <DebtPieChart loans={loans} />}

      {/* Debt List */}
      <View style={styles.debtListContainer}>
        <Text style={[styles.listTitle, { color: colors.text }]}>
          Your Debts ({loans.length})
        </Text>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons
            name="add"
            size={20}
            color={colors.textAccentPrimary}
          />
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Debt Items */}
      <DebtList loans={loans} />

      {/* Modal for Adding Debt */}
      <DebtModal
        visible={modalVisible}
        setVisible={setModalVisible}
        addLoan={addLoan}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { fontSize: 22, fontWeight: 'bold' },
  subHeader: { fontSize: 16, marginBottom: 15 },
  debtListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  listTitle: { fontSize: 18, fontWeight: 'bold' },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: { marginLeft: 5, color: '#fff', fontSize: 16 },
});

export default DebtsScreen;
