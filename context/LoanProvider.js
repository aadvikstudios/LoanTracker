import React, { createContext, useContext, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoanContext = createContext();

export const LoanProvider = ({ children }) => {
  const [loans, setLoans] = useState([]);
  const [currencySymbol, setCurrencySymbol] = useState('₹');
  const [extraPayment, setExtraPayment] = useState('');

  // Select appropriate storage: AsyncStorage for mobile, localStorage for web
  const Storage = {
    getItem: async key => {
      if (Platform.OS === 'web') {
        return Promise.resolve(localStorage.getItem(key));
      }
      return AsyncStorage.getItem(key);
    },
    setItem: async (key, value) => {
      if (Platform.OS === 'web') {
        localStorage.setItem(key, value);
        return Promise.resolve();
      }
      return AsyncStorage.setItem(key, value);
    },
  };

  // Load Loans, Currency, and Extra Payment from Storage when the app starts
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedLoans = await Storage.getItem('loans');
        const storedCurrency = await Storage.getItem('currencySymbol');
        const storedExtraPayment = await Storage.getItem('extraPayment');

        if (storedLoans) setLoans(JSON.parse(storedLoans));
        if (storedCurrency) setCurrencySymbol(storedCurrency);
        if (storedExtraPayment) setExtraPayment(storedExtraPayment);
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };
    loadData();
  }, []);

  // Save Loans, Currency, and Extra Payment whenever they change
  useEffect(() => {
    const saveData = async () => {
      try {
        await Storage.setItem('loans', JSON.stringify(loans));
        await Storage.setItem('currencySymbol', currencySymbol);
        await Storage.setItem('extraPayment', extraPayment);
      } catch (error) {
        console.error('Failed to save data:', error);
      }
    };

    if (loans.length > 0 || currencySymbol || extraPayment) {
      saveData();
    }
  }, [loans, currencySymbol, extraPayment]);

  // Function to Generate a Unique ID (Timestamp-based)
  const generateUniqueId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  // Function to Add Loan
  const addLoan = newLoan => {
    const updatedLoans = [...loans, { id: generateUniqueId(), ...newLoan }];
    setLoans(updatedLoans);
  };

  // Function to Remove Loan
  const removeLoan = id => {
    const updatedLoans = loans.filter(loan => loan.id !== id);
    setLoans(updatedLoans);
  };

  // Function to Clear All Loans
  const clearLoans = async () => {
    try {
      await Storage.setItem('loans', JSON.stringify([])); // Clear persistent storage
      setLoans([]); // Clear state
    } catch (error) {
      console.error('Failed to clear loans:', error);
    }
  };

  // Function to Update Loan
  const updateLoan = updatedLoan => {
    setLoans(prevLoans =>
      prevLoans.map(loan => (loan.id === updatedLoan.id ? updatedLoan : loan))
    );
  };

  return (
    <LoanContext.Provider
      value={{
        loans,
        addLoan,
        removeLoan,
        clearLoans,
        updateLoan,
        currencySymbol,
        setCurrencySymbol,
        extraPayment,
        setExtraPayment,
      }}
    >
      {children}
    </LoanContext.Provider>
  );
};

export const useLoans = () => useContext(LoanContext);
