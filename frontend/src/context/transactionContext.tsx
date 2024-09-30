'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from 'react';
import { Transaction } from '@generated/models/Transaction';
import { CreateTransactionRequest } from '@generated/models/CreateTransactionRequest';
import { useQuery, useMutation } from '@tanstack/react-query';

interface TransactionsContextType {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  fetchTransactions: (userId: string, limit?: number) => void;
  createTransaction: (transaction: CreateTransactionRequest) => void;
  refreshTransactions: (userId: string, limit?: number) => void;
  totalCount: number;
}

const TransactionsContext = createContext<TransactionsContextType | null>(null);

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionsProvider');
  }
  return context;
};

export const TransactionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);
  const totalCountRef = useRef(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [limit, setLimit] = useState(20);
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const { data, isLoading, error } = useQuery({
    queryKey: ['transactions', userId, pageRef.current, limit],
    queryFn: async () => {
      if (!userId) {
        throw new Error('user is not signed in or valid');
      }
      const url = `${serverUrl}/transactions/by_user/${userId}?page=${pageRef.current}&limit=${limit}`;
      const response = await fetch(url);
      return response.json();
    },
    enabled: !!userId,
  });

  useEffect(() => {
    if (data) {
      setTransactions(prevTransactions =>
        pageRef.current === 1 ? data.transactions : [...prevTransactions, ...data.transactions],
      );
      totalCountRef.current = data.totalCount;
      setHasMore(transactions.length + data.transactions.length < data.totalCount);
      pageRef.current += 1;
    }
  }, [data]);

  const fetchTransactions = useCallback((newUserId: string, newLimit = 20) => {
    setUserId(newUserId);
    setLimit(newLimit);
    pageRef.current = 1;
  }, []);

  const refreshTransactions = useCallback(
    (newUserId: string, newLimit = 20) => {
      setTransactions([]);
      pageRef.current = 1;
      totalCountRef.current = 0;
      setHasMore(true);
      fetchTransactions(newUserId, newLimit);
    },
    [fetchTransactions],
  );

  const createTransactionMutation = useMutation({
    mutationFn: async (newTransaction: CreateTransactionRequest) => {
      const url = `${serverUrl}/transactions`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });
      if (!response.ok) {
        throw new Error('Failed to create transaction');
      }
      return response.json();
    },
  });

  const createTransaction = useCallback(
    async (transaction: CreateTransactionRequest): Promise<Transaction> => {
      const newTransaction = await createTransactionMutation.mutateAsync(transaction);
      setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
      refreshTransactions(userId || '', limit);
      return newTransaction;
    },
    [createTransactionMutation],
  );

  const value: TransactionsContextType = {
    transactions,
    loading: isLoading,
    error: error ? String(error) : null,
    hasMore,
    fetchTransactions,
    refreshTransactions,
    createTransaction,
    totalCount: totalCountRef.current,
  };

  return <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>;
};
