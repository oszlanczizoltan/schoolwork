import React, { useState, useEffect } from "react";
import { removeFromCart, getCartItems } from "../../services/productService";
import { useAuth } from "../../context/AuthContext";

const Cart: React.FC = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState<{ id: string; name: string; price: number }[]>([]);

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

  const handleRemove = async (productId: string) => {
    if (!user) return;
    
    await removeFromCart(productId);
    fetchCartItems();
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <button onClick={fetchCartItems}>Refresh Cart</button>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;