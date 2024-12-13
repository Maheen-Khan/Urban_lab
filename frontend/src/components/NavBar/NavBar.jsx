import React from "react";
import { Link } from "react-router-dom";
import { useStored } from "../../Context/StoredContext"; // Use StoredContext instead of UserContext
import AccountDropdown from "../AccountDropdown/AccountDropdown";
import "./NavBar.css";

const NavBar = () => {
    const { user, logout } = useStored(); // Destructure user and logout from StoredContext

    return (
        <div className="navbar">
            <ul className="navbar-menu">
                {user ? (
                    <>
                        <li>
                            <Link to="/my-samples" className="nav-link">
                                My Soil Samples
                            </Link>
                        </li>
                        <li>
                            <Link to="/request-sample" className="nav-link">
                                Request New Sample
                            </Link>
                        </li>
                    </>
                ) : (
                    <li>
                        <Link to="/log-in" className="nav-link">
                            Log In
                        </Link>
                    </li>
                )}
            </ul>
            {user && (
                <div className="navbar-right">
                    <AccountDropdown userName={user.name} onLogout={logout} />
                </div>
            )}
        </div>
    );
};

export default NavBar;
