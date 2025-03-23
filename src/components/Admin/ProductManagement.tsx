import React, { useState } from "react";
import { addProduct, deleteProduct, getProducts } from "../../services/productService";

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<{ id: string; name: string; price: number; releaseDate: string; memory: string }[]>([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: 0, releaseDate: "", memory: "" });

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
    setNewProduct({ name: "", price: 0, releaseDate: "", memory: "" });
    fetchProducts();
  };

  const handleDeleteProduct = async (productId: string) => {
    await deleteProduct(productId);
    fetchProducts();
  };

  return (
    <div>
      <h2>Product Management</h2>
      <button onClick={fetchProducts}>Refresh Products</button>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleDeleteProduct(product.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Add New Product</h3>
      <input type="text" placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
      <input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })} />
      <input type="text" placeholder="Release Date" value={newProduct.releaseDate} onChange={(e) => setNewProduct({ ...newProduct, releaseDate: e.target.value })} />
      <input type="text" placeholder="Memory" value={newProduct.memory} onChange={(e) => setNewProduct({ ...newProduct, memory: e.target.value })} />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default ProductManagement;
