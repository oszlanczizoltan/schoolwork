import React, { useState, useEffect } from "react";
import ProductListing from "../components/User/ProductListing";
import { getProducts } from "../services/productService";
import { Product } from "../components/Admin/ProductManagement";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    releaseDate: { before: "", after: "" },
    manufacturer: "",
  });

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };
    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const matchesReleaseDate =
      (!filters.releaseDate.before || product.releaseDate <= filters.releaseDate.before) &&
      (!filters.releaseDate.after || product.releaseDate >= filters.releaseDate.after);
    const matchesManufacturer = !filters.manufacturer || product.manufacturer === filters.manufacturer;

    return matchesSearch && matchesPrice && matchesReleaseDate && matchesManufacturer;
  });

  return (
    <div>
      <h1>Products</h1>
      <div className="filter-section">
        <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <input type="text" placeholder="Manufacturer" value={filters.manufacturer} onChange={(e) => setFilters({ ...filters, manufacturer: e.target.value })} />
      </div>
      <ProductListing products={filteredProducts} />
    </div>
  );
};

export default Products;