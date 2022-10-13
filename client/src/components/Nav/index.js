import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <ul className="flex-row">
                    <li className="mx-1">
                        <Link to="/orderHistory">
                            Order History
                        </Link>
                    </li>
                    <li className="mx-1">
                        <Link to="/general">
                            General
                        </Link>
                    </li>
                    <li className="mx-1">
                        <Link to="/myItems">
                            My Items
                        </Link>
                    </li>
                    <li className="mx-1">
                        <Link to="/about">
                            About
                        </Link>
                    </li>
                    <li className="mx-1">
                        {/* this is not using the Link component to logout or user and then refresh the application to the start */}
                        <a href="/" onClick={() => Auth.logout()}>
                            Logout
                        </a>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul className="flex-row">
                    <li className="mx-1">
                        <Link to="/signup">
                            Signup
                        </Link>
                    </li>
                    <li className="mx-1">
                        <Link to="/login">
                            Login
                        </Link>
                    </li>
                    <li className="mx-1">
                        <Link to="/about">
                            About
                        </Link>
                    </li>
                </ul>
            );
        }
    }

    return (
        <header className="flex-row px-1">
            <div className="container header-align">
                <div>
                    <h1>
                        <Link to="/">
                            Second Chance
                        </Link>
                    </h1>
                </div>
                <div>
                    {showNavigation()}
                </div>
            </div>
        </header>
    );
}

export default Nav;
