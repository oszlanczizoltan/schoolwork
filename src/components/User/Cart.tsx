import React, { useState, useEffect } from "react";
import { getCartItems, removeFromCart, placeOrder } from "../../services/productService";
import { useAuth } from "../../context/AuthContext";

const Cart: React.FC = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState<{ id: string; name: string; price: number; quantity: number }[]>([]);

  useEffect(() => {
    if (user) {
      fetchCartItems();
    }
  }, [user]);

  const fetchCartItems = async () => {
    if (!user) return;

    try {
      const cartItems = await getCartItems(user.id);
      setCart(cartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleRemove = async (cartItemId: string) => {
    if (!user) return;

    await removeFromCart(cartItemId);
    fetchCartItems();
  };

  const handlePlaceOrder = async () => {
    if (!user) return;
  
    try {
      const orderItems = cart.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));
  
      await placeOrder(user.id, orderItems);
      alert("Order placed successfully!");
      setCart([]);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div>
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price.toFixed(2)} x {item.quantity}
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handlePlaceOrder} disabled={cart.length === 0}>
        Place Order
      </button>
    </div>
  );
};

export default Cart;