import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleQuantityChange = (item, increment) => {
    if (increment) {
      addToCart(item);
    } else {
      if (item.quantity > 1) {
        const updatedItems = cartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        );
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
        window.location.reload();
      } else {
        removeFromCart(item.id);
      }
    }
  };

  const handleProceed = () => {
    navigate("/payment");
  };

  if (cartItems.length === 0) {
    return <p className="empty-cart">Your cart is empty!</p>;
  }

 const totalPrice = cartItems
  .reduce((sum, item) => sum + item.price * item.quantity, 0)
  .toFixed(2);

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.thumbnail} alt={item.title} />
            <div className="item-details">
              <h3>{item.title}</h3>
              <p>Price: ₹{item.price}</p>
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(item, false)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item, true)}>+</button>
              </div>
            </div>
            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <h2>Total: ₹{totalPrice}</h2>
        <div className="cart-actions">
          <button className="proceed-btn" onClick={handleProceed}>Proceed to Payment</button>
          <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;