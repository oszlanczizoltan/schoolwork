import { collection, getDocs, doc, addDoc, deleteDoc, updateDoc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { Product } from "../components/Admin/ProductManagement";

const productsCollection = collection(db, "Products");
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
    imageUrl: doc.data().imageUrl,
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
  const cartRef = doc(db, "Cart", userId);
  const cartSnapshot = await getDoc(cartRef);

  let cartData = cartSnapshot.exists() ? cartSnapshot.data() : { items: {} };

  if (!cartData.items) {
    cartData.items = {};
  }

  if (cartData.items[product.id]) {
    cartData.items[product.id].quantity += quantity;
  } else {
    cartData.items[product.id] = {
      name: product.name,
      price: product.price,
      quantity,
    };
  }
  await setDoc(cartRef, cartData, { merge: true });
};

export const getCartItems = async (userId: string): Promise<{ id: string; name: string; price: number; quantity: number }[]> => {
  const cartRef = doc(db, "Cart", userId);
  const cartSnapshot = await getDoc(cartRef);
  if (!cartSnapshot.exists()) {
    return [];
  }
  const cartData = cartSnapshot.data();
  return Object.keys(cartData.items || {}).map((key) => ({
    id: key,
    name: cartData.items[key].name,
    price: cartData.items[key].price,
    quantity: cartData.items[key].quantity,
  }));
};

export const removeFromCart = async (userId: string, productId: string) => {
  const cartRef = doc(db, "Cart", userId);
  const cartSnapshot = await getDoc(cartRef);

  if (!cartSnapshot.exists()) {
    throw new Error("Cart does not exist");
  }

  const cartData = cartSnapshot.data();
  if (cartData.items && cartData.items[productId]) {
    delete cartData.items[productId];
    await setDoc(cartRef, cartData, { merge: true });
  } else {
    throw new Error("Product not found in cart");
  }
};

export const placeOrder = async (userId: string, products: { productId: string; name: string; price: number; quantity: number }[]) => {
  const order = {
    userId,
    products,
    status: "pending",
    timestamp: new Date().toISOString(),
  };
  await addDoc(ordersCollection, order);

  const cartRef = doc(db, "Cart", userId);
  await deleteDoc(cartRef);
};

export const getOrders = async (): Promise<{ id: string; userId: string; products: any[]; status: string; timestamp: string }[]> => {
  const snapshot = await getDocs(ordersCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    userId: doc.data().userId || "unknown",
    products: (doc.data().products || []).map((product: any) => ({
      name: product.name || "Unknown Product",
      price: product.price || 0,
      quantity: product.quantity || 1,
    })),
    status: doc.data().status || "unknown",
    timestamp: doc.data().timestamp || new Date().toISOString(),
  }));
};

export const approveOrder = async (orderId: string) => {
  const orderRef = doc(db, "Orders", orderId);
  await updateDoc(orderRef, { status: "approved" });
};

export const declineOrder = async (orderId: string) => {
  const orderRef = doc(db, "Orders", orderId);
  await updateDoc(orderRef, { status: "cancelled" });
};