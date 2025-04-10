import React from "react";
import { Product } from "../../components/Admin/ProductManagement";

interface ProductListingProps {
  products: Product[];
}

const ProductListing: React.FC<ProductListingProps> = ({ products }) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>Price: ${product.price.toFixed(2)}</p>
          <p>Memory: {product.memory}</p>
          <p>Release Date: {product.releaseDate}</p>
          <p>Manufacturer: {product.manufacturer}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductListing;
