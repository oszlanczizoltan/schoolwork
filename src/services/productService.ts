import { collection, getDocs, doc, addDoc, deleteDoc, updateDoc, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { Product } from "../components/Admin/ProductManagement";

const productsCollection = collection(db, "Products");
const cartCollection = collection(db, "Cart");
const ordersCollection = collection(db, "Orders");

export const getProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    price: doc.data().price,
    releaseDate: doc.data().releaseDate,
    memory: doc.data().memory,
    manufacturer: doc.data().manufacturer,
  }));
};

export const addProduct = async (product: Product) => {
  const { id, ...productData } = product;
  const docRef = await addDoc(productsCollection, productData);
  return { id: docRef.id, ...productData };
};

export const deleteProduct = async (productId: string) => {
  const productRef = doc(db, "Products", productId);
  await deleteDoc(productRef);
};

export const addToCart = async (userId: string, product: Product, quantity: number) => {
  const cartItem = {
    userId,
    productId: product.id,
    name: product.name,
    price: product.price,
    quantity,
  };
  await addDoc(cartCollection, cartItem);
};

export const getCartItems = async (userId: string): Promise<{ id: string; name: string; price: number; quantity: number }[]> => {
  const snapshot = await getDocs(query(cartCollection, where("userId", "==", userId)));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    price: doc.data().price,
    quantity: doc.data().quantity,
  }));
};

export const removeFromCart = async (cartItemId: string) => {
  const cartItemRef = doc(db, "Cart", cartItemId);
  await deleteDoc(cartItemRef);
};

export const placeOrder = async (userId: string, products: { productId: string; name: string; price: number; quantity: number }[]) => {
  const order = {
    userId,
    products,
    status: "pending",
    timestamp: new Date().toISOString(),
  };
  await addDoc(ordersCollection, order);

  const cartSnapshot = await getDocs(query(cartCollection, where("userId", "==", userId)));
  cartSnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
};

export const getOrders = async (): Promise<{ id: string; userId: string; products: any[]; status: string; timestamp: string }[]> => {
  const snapshot = await getDocs(ordersCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    userId: doc.data().userId,
    products: doc.data().products,
    status: doc.data().status,
    timestamp: doc.data().timestamp,
  }));
};

export const approveOrder = async (orderId: string) => {
  const orderRef = doc(db, "Orders", orderId);
  await updateDoc(orderRef, { status: "approved" });
};