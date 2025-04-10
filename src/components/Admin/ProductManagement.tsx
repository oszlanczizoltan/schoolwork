import React, { useState } from "react";
import { addProduct, deleteProduct, getProducts } from "../../services/productService";

export interface Product {
  id: string;
  name: string;
  price: number;
  releaseDate: string;
  memory: string;
  manufacturer: string;
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
    await addProduct(newProduct);
    setNewProduct({ id: "", name: "", price: 0, releaseDate: "", memory: "", manufacturer: "" });
    fetchProducts();
  };

  const handleDeleteProduct = async (productId: string) => {
    await deleteProduct(productId);
    fetchProducts();
  };

  return (
    <div>
      <h1>Product Management</h1>
      <div>
        <h2>Add Product</h2>
        <div className="input-container">
          <input type="text" placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
          <input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })} />
          <input type="date" placeholder="Release Date" value={newProduct.releaseDate} onChange={(e) => setNewProduct({ ...newProduct, releaseDate: e.target.value })} />
          <input type="text" placeholder="Memory" value={newProduct.memory} onChange={(e) => setNewProduct({ ...newProduct, memory: e.target.value })} />
          <input type="text" placeholder="Manufacturer" value={newProduct.manufacturer} onChange={(e) => setNewProduct({ ...newProduct, manufacturer: e.target.value })} />
        </div>
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <div>
        <h2>Existing Products</h2>
        {products.map((product) => (
          <div key={product.id}>
            <p>{product.name}</p>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
