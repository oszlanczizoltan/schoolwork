import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc, query, where } from "firebase/firestore";
import { db } from "./firebase";

export interface GraphicsCard {
  id?: string;
  name: string;
  releaseDate: string;
  memory: string;
  price: number;
}

const productsCollection = collection(db, "GraphicsCards");
const cartCollection = collection(db, "carts");

export const addProduct = async (product: GraphicsCard) => {
  const docRef = await addDoc(productsCollection, product);
  return { id: docRef.id, ...product };
};

export const getProducts = async (): Promise<GraphicsCard[]> => {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as GraphicsCard) }));
};

export const updateProduct = async (productId: string, updatedData: Partial<GraphicsCard>) => {
  const productRef = doc(db, "GraphicsCards", productId);
  await updateDoc(productRef, updatedData);
};

export const deleteProduct = async (productId: string) => {
  const productRef = doc(db, "GraphicsCards", productId);
  await deleteDoc(productRef);
};

export const addToCart = async (userId: string, productId: string) => {
  try {
    const cartRef = collection(db, "carts");
    await addDoc(cartRef, { userId, productId });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
};

export const removeFromCart = async (cartItemId: string) => {
  try {
    const cartItemRef = doc(db, "carts", cartItemId);
    await deleteDoc(cartItemRef);
  } catch (error) {
    console.error("Error removing product from cart:", error);
    throw error;
  }
};

export const getCartItems = async (userId: string) => {
  try {
    const q = query(cartCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};