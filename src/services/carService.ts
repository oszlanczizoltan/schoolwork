import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const carsCollection = collection(db, "Cars");

export const getCars = async () => {
  const snapshot = await getDocs(carsCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addCar = async (carData: {
  brand: string;
  model: string;
  price: number;
  status: string;
}) => {
  await addDoc(carsCollection, carData);
};

export const removeCar = async (carId: string) => {
  await deleteDoc(doc(db, "Cars", carId));
};

export const updateCarStatus = async (carId: string, status: string) => {
  await updateDoc(doc(db, "Cars", carId), { status });
};
