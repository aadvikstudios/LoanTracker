import React, { createContext, useContext, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

const LoanContext = createContext();

export const LoanProvider = ({ children }) => {
  const [loans, setLoans] = useState([]);

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

  // Load Loans from Storage when the app starts
  useEffect(() => {
    const loadLoans = async () => {
      try {
        const storedLoans = await Storage.getItem('loans');
        if (storedLoans) {
          setLoans(JSON.parse(storedLoans));
        }
      } catch (error) {
        console.error('Failed to load loans:', error);
      }
    };

    loadLoans();
  }, []);

  // Save Loans to Storage whenever the loans change
  useEffect(() => {
    const saveLoans = async () => {
      try {
        await Storage.setItem('loans', JSON.stringify(loans));
      } catch (error) {
        console.error('Failed to save loans:', error);
      }
    };

    if (loans.length > 0) {
      saveLoans();
    }
  }, [loans]);

  // Function to Add Loan
  const addLoan = newLoan => {
    const updatedLoans = [...loans, { id: uuidv4(), ...newLoan }];
    setLoans(updatedLoans);
  };
  // ✅ Function to Remove Loan
  const removeLoan = id => {
    const updatedLoans = loans.filter(loan => loan.id !== id);
    setLoans(updatedLoans);
  };

  return (
    <LoanContext.Provider value={{ loans, addLoan, removeLoan }}>
      {children}
    </LoanContext.Provider>
  );
};

export const useLoans = () => useContext(LoanContext);
