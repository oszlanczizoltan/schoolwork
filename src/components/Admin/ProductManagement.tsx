import React, { useState } from "react";
import { addProduct, getProducts } from "../../services/productService";

export interface Product {
  id: string;
  name: string;
  price: number;
  releaseDate: string;
  memory: string;
  manufacturer: string;
  imageUrl?: string;
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    id: "",
    name: "",
    price: 0,
    releaseDate: "",
    memory: "",
    manufacturer: "",
    imageUrl: "",
  });

  const fetchProducts = async () => {
    try {
      const productList = await getProducts();
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddProduct = async () => {
    try {
      await addProduct(newProduct);
      setNewProduct({ id: "", name: "", price: 0, releaseDate: "", memory: "", manufacturer: "", imageUrl: "" });
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="product-management-container">
      <div className="product-management-box">
        <h1>Admin Panel</h1>
        <h2>Product Management</h2>
        <div className="input-container">
          <input type="text" placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
          <input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })} />
          <input type="date" placeholder="Release Date" value={newProduct.releaseDate} onChange={(e) => setNewProduct({ ...newProduct, releaseDate: e.target.value })} />
          <input type="text" placeholder="Memory" value={newProduct.memory} onChange={(e) => setNewProduct({ ...newProduct, memory: e.target.value })} />
          <input type="text" placeholder="Manufacturer" value={newProduct.manufacturer} onChange={(e) => setNewProduct({ ...newProduct, manufacturer: e.target.value })} />
          <input type="text" placeholder="Image URL" value={newProduct.imageUrl} onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })} />
        </div>
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
    </div>
  );
};

export default ProductManagement;
