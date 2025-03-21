import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";

interface Car {
  id: string;
  brand: string;
  price: number;
  status: string;
}

interface CarContextType {
  cars: Car[];
  loading: boolean;
  addCar: (car: Omit<Car, "id">) => Promise<void>;
  removeCar: (id: string) => Promise<void>;
  fetchCars: () => Promise<void>;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export const CarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = async () => {
    setLoading(true);
    const carCollection = collection(db, "Cars");
    const carSnapshot = await getDocs(carCollection);
    const carList = carSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Car));
    setCars(carList);
    setLoading(false);
  };

  const addCar = async (car: Omit<Car, "id">) => {
    await addDoc(collection(db, "Cars"), car);
    fetchCars();
  };

  const removeCar = async (id: string) => {
    await deleteDoc(doc(db, "Cars", id));
    fetchCars();
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <CarContext.Provider value={{ cars, loading, addCar, removeCar, fetchCars }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCar = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error("useCar must be used within a CarProvider");
  }
  return context;
};