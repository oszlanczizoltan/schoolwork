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
