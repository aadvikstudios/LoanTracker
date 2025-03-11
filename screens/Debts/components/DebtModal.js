import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../../../context/ThemeProvider';
import { MaterialIcons } from '@expo/vector-icons';

const categories = [
  'Credit Card',
  'Auto Loan',
  'Personal Loan',
  'Student Loan',
  'Mortgage',
  'Home Equity Loan',
  'Medical Loan',
  'Taxes',
  'Other',
];

const DebtModal = ({ visible, setVisible, addLoan }) => {
  const { colors } = useTheme();
  const [newDebt, setNewDebt] = useState({
    id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`, // Unique ID
    name: '',
    category: 'Personal Loan',
    balance: '',
    originalBalance: '',
    interestRate: '',
    emi: '',
    dueDate: new Date(),
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddDebt = () => {
    if (
      newDebt.name &&
      newDebt.balance &&
      newDebt.originalBalance &&
      newDebt.interestRate &&
      newDebt.emi
    ) {
      addLoan({
        ...newDebt,
        balance: parseFloat(newDebt.balance),
        originalBalance: parseFloat(newDebt.originalBalance),
        interestRate: parseFloat(newDebt.interestRate),
        emi: parseFloat(newDebt.emi),
        dueDate: newDebt.dueDate.toISOString().split('T')[0], // Format YYYY-MM-DD
      });
      setVisible(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setNewDebt({
      id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: '',
      category: 'Personal Loan',
      balance: '',
      originalBalance: '',
      interestRate: '',
      emi: '',
      dueDate: new Date(),
    });
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View
          style={[styles.modalContainer, { backgroundColor: colors.surface }]}
        >
          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setVisible(false)}
          >
            <MaterialIcons name="close" size={24} color={colors.text} />
          </TouchableOpacity>

          {/* Title */}
          <Text style={[styles.modalTitle, { color: colors.text }]}>
            Add Debt
          </Text>

          {/* Loan Name */}
          <Text style={[styles.inputLabel, { color: colors.text }]}>
            Loan Name *
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: colors.border,
                color: colors.text,
                backgroundColor: colors.backgroundLight,
              },
            ]}
            value={newDebt.name}
            onChangeText={text => setNewDebt({ ...newDebt, name: text })}
            placeholder="E.g. Car Loan"
            placeholderTextColor={colors.placeholder}
          />

          {/* Category Picker */}
          <Text style={[styles.inputLabel, { color: colors.text }]}>
            Category *
          </Text>
          <View
            style={[
              styles.pickerContainer,
              {
                borderColor: colors.border,
                backgroundColor: colors.backgroundLight,
              },
            ]}
          >
            <Picker
              selectedValue={newDebt.category}
              onValueChange={itemValue =>
                setNewDebt({ ...newDebt, category: itemValue })
              }
              style={{ color: colors.text, height: 45 }}
            >
              {categories.map(category => (
                <Picker.Item key={category} label={category} value={category} />
              ))}
            </Picker>
          </View>

          {/* Current Balance */}
          <Text style={[styles.inputLabel, { color: colors.text }]}>
            Current Balance *
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: colors.border,
                color: colors.text,
                backgroundColor: colors.backgroundLight,
              },
            ]}
            keyboardType="numeric"
            value={newDebt.balance}
            onChangeText={text => setNewDebt({ ...newDebt, balance: text })}
            placeholder="₹0.00"
            placeholderTextColor={colors.placeholder}
          />

          {/* Original Balance */}
          <Text style={[styles.inputLabel, { color: colors.text }]}>
            Original Loan Amount *
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: colors.border,
                color: colors.text,
                backgroundColor: colors.backgroundLight,
              },
            ]}
            keyboardType="numeric"
            value={newDebt.originalBalance}
            onChangeText={text =>
              setNewDebt({ ...newDebt, originalBalance: text })
            }
            placeholder="₹0.00"
            placeholderTextColor={colors.placeholder}
          />

          {/* Interest Rate */}
          <Text style={[styles.inputLabel, { color: colors.text }]}>
            Interest Rate (%) *
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: colors.border,
                color: colors.text,
                backgroundColor: colors.backgroundLight,
              },
            ]}
            keyboardType="numeric"
            value={newDebt.interestRate}
            onChangeText={text =>
              setNewDebt({ ...newDebt, interestRate: text })
            }
            placeholder="E.g. 12"
            placeholderTextColor={colors.placeholder}
          />

          {/* EMI */}
          <Text style={[styles.inputLabel, { color: colors.text }]}>
            EMI Amount *
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: colors.border,
                color: colors.text,
                backgroundColor: colors.backgroundLight,
              },
            ]}
            keyboardType="numeric"
            value={newDebt.emi}
            onChangeText={text => setNewDebt({ ...newDebt, emi: text })}
            placeholder="₹0.00"
            placeholderTextColor={colors.placeholder}
          />

          {/* Due Date */}
          <Text style={[styles.inputLabel, { color: colors.text }]}>
            Due Date *
          </Text>
          <TouchableOpacity
            style={[
              styles.datePicker,
              {
                borderColor: colors.border,
                backgroundColor: colors.backgroundLight,
              },
            ]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={{ color: colors.text }}>
              {newDebt.dueDate.toISOString().split('T')[0]}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={newDebt.dueDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setNewDebt({ ...newDebt, dueDate: selectedDate });
                }
              }}
            />
          )}

          {/* Save Button */}
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: colors.primary }]}
            onPress={handleAddDebt}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginTop: 5,
    fontSize: 16,
  },
  pickerContainer: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    justifyContent: 'center',
    marginTop: 5,
  },
});

export default DebtModal;
