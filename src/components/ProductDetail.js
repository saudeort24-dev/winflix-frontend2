import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams(); // Get product ID from URL
  const { addToCart } = useContext(CartContext); // Add to cart function
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div style={{ padding: "20px", display: "flex", gap: "20px" }}>
      <div>
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{ maxWidth: "400px", borderRadius: "10px" }}
        />
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          {product.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.title}-${index}`}
              style={{ width: "60px", borderRadius: "5px", cursor: "pointer" }}
            />
          ))}
        </div>
      </div>
      <div>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>
          <strong>Category:</strong> {product.category}
        </p>
        <p>
          <strong>Brand:</strong> {product.brand}
        </p>
        <p>
          <strong>Price:</strong> ₹{product.price}
        </p>
        <p>
          <strong>Rating:</strong> {product.rating} ⭐
        </p>
        <p>
          <strong>Stock:</strong> {product.stock}
        </p>
        <button
          onClick={() => addToCart(product)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ff9900",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;