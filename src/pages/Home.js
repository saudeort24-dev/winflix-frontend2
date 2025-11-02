import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch products from DummyJSON
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=2000"); // fetch 2000 products
        const data = await response.json();
        setProducts(data.products);
        const uniqueCategories = ["all", ...new Set(data.products.map((p) => p.category))];
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category and search term
  const filteredProducts = products
    .filter((product) => (filteredCategory === "all" ? true : product.category === filteredCategory))
    .filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="home-container">
      {/* Search bar */}
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Category buttons */}
      <div className="categories">
        {categories.map((category) => (
          <button
            key={category}
            className={category === filteredCategory ? "active" : ""}
            onClick={() => setFilteredCategory(category)}
          >
            {category.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Main product grid */}
      {loading ? (
        <p className="loading-text">Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="loading-text">No products found!</p>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Extra sections */}
      <div className="extra-sections">
        {/* Top Picks */}
        <h2>Top Picks for You</h2>
        <div className="products-grid">
          {products.slice(0, 12).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Popular Electronics */}
        <h2>Popular Electronics</h2>
        <div className="products-grid">
          {products
            .filter((p) => p.category === "smartphones" || p.category === "laptops")
            .slice(0, 12)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>

        {/* Shoes Collection */}
        <h2>Shoes Collection</h2>
        <div className="products-grid">
          {products
            .filter((p) => p.category === "shoes")
            .slice(0, 12)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>

        {/* Additional sections can be added here */}
        <h2>Featured Products</h2>
        <div className="products-grid">
          {products.slice(12, 24).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;