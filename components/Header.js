import React, { useState } from 'react';
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
import avatar from '../assets/avatar.jpg';

const currencies = [
  { label: 'USD ($)', value: 'USD', icon: 'attach-money' },
  { label: 'INR (₹)', value: 'INR', icon: 'currency-rupee' },
];

const Header = ({ title, showBackButton = false }) => {
  const { isDarkMode, setIsDarkMode, colors } = useTheme();
  const navigation = useNavigation();

  const [currency, setCurrency] = useState(currencies[0]); // Default USD
  const [isCurrencyModalVisible, setCurrencyModalVisible] = useState(false);

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleCurrencySelect = selectedCurrency => {
    setCurrency(selectedCurrency);
    setCurrencyModalVisible(false);
  };

  return (
    <View style={[styles.header, { backgroundColor: colors.surface }]}>
      {showBackButton ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconContainer}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
      ) : (
        <Image source={avatar} style={styles.avatar} />
      )}

      <Text style={[styles.appName, { color: colors.text }]}>{title}</Text>

      <View style={styles.actionsContainer}>
        {/* Theme Toggle */}
        <TouchableOpacity
          onPress={() => setIsDarkMode(!isDarkMode)}
          style={styles.iconContainer}
        >
          <MaterialIcons
            name={isDarkMode ? 'dark-mode' : 'light-mode'}
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>

        {/* Currency Selector */}
        <TouchableOpacity
          onPress={() => setCurrencyModalVisible(true)}
          style={styles.iconContainer}
        >
          <MaterialIcons name={currency.icon} size={24} color={colors.text} />
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity onPress={handleLogout} style={styles.iconContainer}>
          <MaterialIcons name="logout" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Currency Modal */}
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
                  <Text style={{ color: colors.text, marginLeft: 10 }}>
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
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
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
    width: 250,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  currencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default Header;
