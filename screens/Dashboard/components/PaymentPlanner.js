import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../../context/ThemeProvider';
import { useLoans } from '../../../context/LoanProvider';
import { MaterialIcons } from '@expo/vector-icons';

const PaymentPlanner = () => {
  const { colors } = useTheme();
  const { extraPayment, setExtraPayment, currencySymbol } = useLoans();
  const [isEditing, setIsEditing] = useState(extraPayment === '');
  const [localValue, setLocalValue] = useState(extraPayment);

  const handleSave = () => {
    setExtraPayment(localValue);
    setIsEditing(false);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, shadowColor: colors.shadow },
      ]}
    >
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Plan Your Payments
      </Text>

      <View style={[styles.card]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          Extra Payment
        </Text>

        {!isEditing ? (
          <View style={styles.displayContainer}>
            <Text style={[styles.displayText, { color: colors.primary }]}>
              {currencySymbol}
              {localValue || '0'}
            </Text>
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <MaterialIcons name="edit" size={22} color={colors.text} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: colors.border,
                  color: colors.text,
                },
              ]}
              keyboardType="numeric"
              placeholder={`${currencySymbol}0`}
              placeholderTextColor={colors.textSecondary}
              value={localValue}
              onChangeText={setLocalValue}
              autoFocus
            />
          </View>
        )}

        {isEditing && (
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: colors.primary }]}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 15,
  },
  card: {
    padding: 15,

    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  displayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  displayText: {
    fontSize: 22,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 18,
    textAlign: 'center',
  },
  saveButton: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    width: '100%',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default PaymentPlanner;
