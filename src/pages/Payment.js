import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Payment.css";

function Payment() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [selectedPayment, setSelectedPayment] = useState("");
  const [upiId, setUpiId] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    phone: ""
  });
  const [showModal, setShowModal] = useState(false);
  const [finalAmount, setFinalAmount] = useState(0);

  const totalAmount = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handleChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    const { name, address, city, pincode, phone } = customerInfo;
    if (!name || !address || !city || !pincode || !phone) {
      alert("Please fill in all delivery details.");
      return;
    }
    if (!selectedPayment) {
      alert("Please select a payment method.");
      return;
    }
    if (selectedPayment.includes("UPI") && !upiId) {
      alert("Please enter your UPI ID.");
      return;
    }

    // Store final amount before clearing cart
    setFinalAmount(totalAmount);

    setShowModal(true);

    // Clear cart **after** storing total
    clearCart();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="payment-page">
      <h1>Finalize Your Order</h1>

      <div className="payment-grid">
        {/* Delivery Info */}
        <div className="payment-card">
          <h2>Delivery Information</h2>
          <div className="input-group">
            <input type="text" name="name" placeholder="Full Name" value={customerInfo.name} onChange={handleChange} />
            <input type="text" name="address" placeholder="Street Address" value={customerInfo.address} onChange={handleChange} />
            <input type="text" name="city" placeholder="City" value={customerInfo.city} onChange={handleChange} />
            <input type="text" name="pincode" placeholder="Pincode" value={customerInfo.pincode} onChange={handleChange} />
            <input type="text" name="phone" placeholder="Phone Number" value={customerInfo.phone} onChange={handleChange} />
          </div>
        </div>

        {/* Payment Method */}
        <div className="payment-card">
          <h2>Payment Method</h2>
          <div className="payment-options">
            <label className="radio-container">
              Cash on Delivery
              <input type="radio" name="payment" value="Cash on Delivery" checked={selectedPayment === "Cash on Delivery"} onChange={(e) => setSelectedPayment(e.target.value)} />
              <span className="checkmark"></span>
            </label>

            <label className="radio-container">
              UPI (GPay / PhonePe / BHIM)
              <input type="radio" name="payment" value="UPI (GPay / PhonePe / BHIM)" checked={selectedPayment === "UPI (GPay / PhonePe / BHIM)"} onChange={(e) => setSelectedPayment(e.target.value)} />
              <span className="checkmark"></span>
            </label>
            {selectedPayment.includes("UPI") && (
              <input type="text" placeholder="Enter UPI ID (example@okbank)" value={upiId} onChange={(e) => setUpiId(e.target.value)} className="upi-input" />
            )}

            <label className="radio-container">
              Amazon Pay
              <input type="radio" name="payment" value="Amazon Pay" checked={selectedPayment === "Amazon Pay"} onChange={(e) => setSelectedPayment(e.target.value)} />
              <span className="checkmark"></span>
            </label>
          </div>

          <div className="terms">
            <p>Your order will be delivered within <strong>3 days</strong>. By placing this order, you agree to our terms and conditions.</p>
          </div>

          <h3 className="total">Total Amount: ₹{totalAmount}</h3>
          <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>🎉 Order Confirmed!</h2>
            <p>Total: ₹{finalAmount}</p>
            <p>Payment Method: {selectedPayment}</p>
            {selectedPayment.includes("UPI") && <p>UPI ID: {upiId}</p>}
            <p>Your order will arrive within 3 days.</p>
            <button onClick={handleCloseModal} className="modal-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;