import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoanContext = createContext();

export const LoanProvider = ({ children }) => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const loadLoans = async () => {
      try {
        const storedLoans = await AsyncStorage.getItem('loans');
        if (storedLoans) {
          setLoans(JSON.parse(storedLoans));
        }
      } catch (error) {
        console.error('Failed to load loans:', error);
      }
    };

    loadLoans();
  }, []);

  useEffect(() => {
    const saveLoans = async () => {
      try {
        await AsyncStorage.setItem('loans', JSON.stringify(loans));
      } catch (error) {
        console.error('Failed to save loans:', error);
      }
    };

    if (loans.length > 0) {
      saveLoans();
    }
  }, [loans]);

  const addLoan = newLoan => {
    const updatedLoans = [
      ...loans,
      { id: (loans.length + 1).toString(), ...newLoan },
    ];
    setLoans(updatedLoans);
  };

  return (
    <LoanContext.Provider value={{ loans, addLoan }}>
      {children}
    </LoanContext.Provider>
  );
};

export const useLoans = () => useContext(LoanContext);
