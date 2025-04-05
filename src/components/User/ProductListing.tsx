import React from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  releaseDate: string;
  memory: string;
}

interface ProductListingProps {
  products: Product[];
}

const ProductListing: React.FC<ProductListingProps> = ({ products }) => {
  return (
    <div className="product-listing">
      <h2>Available Graphics Cards</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price ($)</th>
            <th>Memory</th>
            <th>Release Date</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.memory}</td>
              <td>{product.releaseDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductListing;
