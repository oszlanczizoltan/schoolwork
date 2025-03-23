import React, { useState } from "react";
import { addToCart, removeFromCart, getCartItems } from "../../services/productService";

const Cart: React.FC = () => {
  const [cart, setCart] = useState<{ id: string; name: string; price: number }[]>([]);

  const fetchCartItems = async () => {
    try {
      const cartItems = await getCartItems();
      setCart(cartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleRemove = async (productId: string) => {
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