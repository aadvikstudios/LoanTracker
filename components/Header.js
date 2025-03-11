import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  FlatList,
} from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLoans } from '../context/LoanProvider';
import avatar from '../assets/avatar.jpg';

// Currency Options
const currencies = [
  { label: 'USD ($)', value: 'USD', icon: 'attach-money' },
  { label: 'INR (₹)', value: 'INR', icon: 'currency-rupee' },
];

const Header = ({ title }) => {
  const { isDarkMode, setIsDarkMode, colors } = useTheme();
  const { currencySymbol, setCurrencySymbol } = useLoans();
  const navigation = useNavigation();

  const [selectedCurrency, setSelectedCurrency] = useState(
    currencies.find(c => c.value === currencySymbol) || currencies[0]
  );
  const [isCurrencyModalVisible, setCurrencyModalVisible] = useState(false);

  useEffect(() => {
    setCurrencySymbol(selectedCurrency.value);
  }, [selectedCurrency]);

  const handleCurrencySelect = selectedCurrency => {
    setSelectedCurrency(selectedCurrency);
    setCurrencyModalVisible(false);
  };

  return (
    <View style={[styles.header, { backgroundColor: colors.surface }]}>
      {/* Profile Avatar (Clickable) */}
      <TouchableOpacity style={styles.avatarContainer}>
        <Image source={avatar} style={styles.avatar} />
      </TouchableOpacity>

      {/* Centered Title */}
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>

      {/* Right Icons Section */}
      <View style={styles.iconContainer}>
        {/* Theme Toggle */}
        <TouchableOpacity
          onPress={() => setIsDarkMode(!isDarkMode)}
          style={styles.iconButton}
        >
          <MaterialIcons
            name={isDarkMode ? 'dark-mode' : 'light-mode'}
            size={22}
            color={colors.text}
          />
        </TouchableOpacity>

        {/* Currency Selector */}
        <TouchableOpacity
          onPress={() => setCurrencyModalVisible(true)}
          style={styles.iconButton}
        >
          <MaterialIcons
            name={selectedCurrency.icon}
            size={22}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>

      {/* Currency Selection Modal */}
      <Modal
        visible={isCurrencyModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCurrencyModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View
            style={[styles.modalContent, { backgroundColor: colors.surface }]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Select Currency
            </Text>
            <FlatList
              data={currencies}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.currencyItem}
                  onPress={() => handleCurrencySelect(item)}
                >
                  <MaterialIcons
                    name={item.icon}
                    size={24}
                    color={colors.text}
                  />
                  <Text style={[styles.currencyText, { color: colors.text }]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setCurrencyModalVisible(false)}
            >
              <Text style={{ color: colors.text }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
    elevation: 2,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 5,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 280,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  currencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
    justifyContent: 'center',
  },
  currencyText: {
    fontSize: 16,
    marginLeft: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
  },
});

export default Header;
