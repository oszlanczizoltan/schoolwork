import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import ProductManagement from "../components/Admin/ProductManagement";
import ProductListing from "../components/User/ProductListing";
import { getProducts } from "../services/productService";
import { Product } from "../components/Admin/ProductManagement";
import { Range } from "react-range";

const Products: React.FC = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    priceRange: [0, 2500],
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
    const matchesManufacturer = !filters.manufacturer || 
      product.manufacturer.toLowerCase().startsWith(filters.manufacturer.toLowerCase());

    return matchesSearch && matchesPrice && matchesReleaseDate && matchesManufacturer;
  });

  return (
    <div>
      <h1>Products</h1>
      {user?.role === "admin" && (
        <div>
          <h2>Admin Panel</h2>
          <ProductManagement />
        </div>
      )}
      <div className="filter-section">
        <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <input type="text" placeholder="Manufacturer" value={filters.manufacturer} onChange={(e) => setFilters({ ...filters, manufacturer: e.target.value })} />
        <div className="price-slider">
          <label>Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}</label>
          <Range step={10} min={0} max={2500} values={filters.priceRange} onChange={(values) => setFilters({ ...filters, priceRange: values })} renderTrack={({ props, children }) => (
              <div {...props} className="slider-track">
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div {...props} className="slider-thumb" />
            )}
          />
        </div>
      </div>
      <ProductListing products={filteredProducts} />
    </div>
  );
};

export default Products;