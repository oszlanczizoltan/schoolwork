import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";

interface Transaction {
  id: string;
  carId: string;
  userId: string;
  type: "buy" | "lend";
  status: "pending" | "accepted" | "declined";
}

interface TransactionContextType {
  transactions: Transaction[];
  loading: boolean;
  approveTransaction: (id: string) => Promise<void>;
  declineTransaction: (id: string) => Promise<void>;
  fetchTransactions: () => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    setLoading(true);
    const transactionCollection = collection(db, "Transactions");
    const transactionSnapshot = await getDocs(transactionCollection);
    const transactionList = transactionSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Transaction[];
    setTransactions(transactionList);
    setLoading(false);
  };

  const approveTransaction = async (id: string) => {
    const transactionRef = doc(db, "Transactions", id);
    await updateDoc(transactionRef, { status: "accepted" });
    fetchTransactions();
  };

  const declineTransaction = async (id: string) => {
    const transactionRef = doc(db, "Transactions", id);
    await updateDoc(transactionRef, { status: "declined" });
    fetchTransactions();
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions, loading, approveTransaction, declineTransaction, fetchTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
};