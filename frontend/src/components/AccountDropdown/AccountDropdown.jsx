import React, { useState } from "react";
import "./AccountDropdown.css";

const AccountDropdown = ({ userName, onLogout }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    return (
        <div
            className="account-dropdown"
            onMouseEnter={() => setDropdownVisible(true)}
            onMouseLeave={() => setDropdownVisible(false)}
        >
            <div className="user-link">
                <div className="user-icon">👤</div>
                <span>Account</span>
            </div>
            {isDropdownVisible && (
                <div className="dropdown-content">
                    <p className="user-name">Hello, {userName || "Guest"}</p>
                    <button className="logout-button" onClick={onLogout}>
                        Log Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default AccountDropdown;
