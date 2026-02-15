import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchDancers } from '@/api/dancers';
import { fetchAllLGBalances } from '@/api/lg-balance';
import { IDancer, ILGBalance } from '@/types';

// Define what data and functions our context will provide
interface DataContextType {
  // Data
  dancers: IDancer[];
  lgBalances: ILGBalance[];

  // Loading states
  isLoadingDancers: boolean;
  isLoadingBalances: boolean;

  // Refetch functions - these will be called after mutations
  refetchDancers: () => Promise<void>;
  refetchBalances: () => Promise<void>;
  refetchAll: () => Promise<void>;
}

// Create the context with undefined as initial value
const DataContext = createContext<DataContextType | undefined>(undefined);

// Provider component that wraps your app
export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State for dancers
  const [dancers, setDancers] = useState<IDancer[]>([]);
  const [isLoadingDancers, setIsLoadingDancers] = useState(true);

  // State for LG balances
  const [lgBalances, setLgBalances] = useState<ILGBalance[]>([]);
  const [isLoadingBalances, setIsLoadingBalances] = useState(true);

  // Function to fetch dancers from API
  const refetchDancers = async () => {
    setIsLoadingDancers(true);
    try {
      const response = await fetchDancers();
      if (response && response.data) {
        setDancers(response.data);
      } else {
        setDancers([]);
      }
    } catch (error) {
      console.error('Error fetching dancers:', error);
      setDancers([]);
    } finally {
      setIsLoadingDancers(false);
    }
  };

  // Function to fetch LG balances from API
  const refetchBalances = async () => {
    setIsLoadingBalances(true);
    try {
      const response = await fetchAllLGBalances();
      if (response && response.data) {
        setLgBalances(response.data);
      } else {
        setLgBalances([]);
      }
    } catch (error) {
      console.error('Error fetching balances:', error);
      setLgBalances([]);
    } finally {
      setIsLoadingBalances(false);
    }
  };

  // Function to refetch everything at once
  const refetchAll = async () => {
    await Promise.all([refetchDancers(), refetchBalances()]);
  };

  // Initial data fetch when component mounts
  useEffect(() => {
    refetchAll();
  }, []);

  // Provide all data and functions to children components
  const value: DataContextType = {
    dancers,
    lgBalances,
    isLoadingDancers,
    isLoadingBalances,
    refetchDancers,
    refetchBalances,
    refetchAll,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Custom hook to use the context easily
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
