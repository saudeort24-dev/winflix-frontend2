import React from "react";
import "./Auth.css"; // reuse the same styling

function Greetings({ user }) {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome, {user?.name.split(" ")[0]} 👋</h2>
        <p>We’re glad to see you back on <strong>WinFlix</strong>!</p>
      </div>
    </div>
  );
}

export default Greetings;