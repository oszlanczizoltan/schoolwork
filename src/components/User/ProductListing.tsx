import React from "react";
import { Product } from "../../components/Admin/ProductManagement";
import { useAuth } from "../../context/AuthContext";
import { addToCart } from "../../services/productService";

interface ProductListingProps {
  products: Product[];
  user: { role: string };
  handleDeleteProduct: (productId: string) => void;
}

const ProductListing: React.FC<ProductListingProps> = ({ products, user, handleDeleteProduct }) => {
  const { user: authUser } = useAuth();

  const confirmDelete = (productId: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this product?");
    if (isConfirmed) {
      handleDeleteProduct(productId);
    }
  };

  const handleAddToCart = async (product: Product) => {
    if (!authUser) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      await addToCart(authUser.id, product, 1);
      alert(`${product.name} has been added to the cart.`);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart. Please try again.");
    }
  };

  
  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>Price: ${product.price.toFixed(2)}</p>
          <p>Memory: {product.memory}</p>
          <p>Release Date: {product.releaseDate}</p>
          <p>Manufacturer: {product.manufacturer}</p>
          {user.role === "admin" && (
            <button onClick={() => confirmDelete(product.id)} className="delete-button">
              Delete
            </button>
          )}
          <button onClick={() => handleAddToCart(product)} className="to-cart-button">
            To Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductListing;
