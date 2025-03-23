import React, { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";

const ProductListing: React.FC = () => {
  const [products, setProducts] = useState<{ id: string; name: string; price: number; releaseDate: string; memory: string }[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getProducts();
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Available Graphics Cards</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price} - {product.memory} - Released: {product.releaseDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListing;
