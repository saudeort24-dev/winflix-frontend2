import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { cartItems, addToCart } = useContext(CartContext);

  const inCart = cartItems.find((item) => item.id === product.id);

  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>₹{product.price}</p>
      <button
        disabled={!!inCart}
        onClick={() => addToCart(product)}
        className={inCart ? "added" : ""}
      >
        {inCart ? "Added" : "Add to Cart"}
      </button>
    </div>
  );
}

export default ProductCard;