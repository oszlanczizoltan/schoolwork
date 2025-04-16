import React, { useState, useEffect, useCallback } from "react";
import { getCartItems, removeFromCart, placeOrder } from "../../services/productService";
import { useAuth } from "../../context/AuthContext";

const Cart: React.FC = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState<{ id: string; name: string; price: number; quantity: number }[]>([]);


  const fetchCartItems = useCallback(async () => {
    if (!user) return;

    try {
      const cartItems = await getCartItems(user.id);
      setCart(cartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchCartItems();
    }
  }, [user, fetchCartItems]);

  const handleRemove = async (productId: string) => {
    if (!user) return;

    await removeFromCart(user.id, productId);
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
    <div className="cart-container">
      <h1 className="cart-title">Cart</h1>
      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <ul className="cart-items">
          {cart.map((item) => (
            <li key={item.id} className="cart-item">
              <div className="cart-item-details">
                <p className="cart-item-name">{item.name}</p>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
                <p className="cart-item-quantity">Quantity: {item.quantity}</p>
              </div>
              <button onClick={() => handleRemove(item.id)} className="cart-item-remove">
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handlePlaceOrder} disabled={cart.length === 0} className="cart-place-order">
        Place Order
      </button>
    </div>
  );
};

export default Cart;