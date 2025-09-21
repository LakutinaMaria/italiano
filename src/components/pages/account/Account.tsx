import React from "react";
import UserService from "../../../services/userServices";
import "./Account.css";

export const Account = () => {
  const handleLogout = () => {
    UserService.doLogout();
  };

  return (
    <div className="account-page">
      <h2>Your Account</h2>
      <p>Manage your account settings here.</p>

      <div className="logout-section">
        <h3>Session</h3>
        <button
          className="logout-button"
          onClick={handleLogout}
          type="button"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
