import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink exact to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/records">Records</NavLink>
                </li>
                <li>
                    <NavLink to="/collections">Collections</NavLink>
                </li>
                <li>
                    <NavLink to="/artists">Artists</NavLink>
                </li>
                <li>
                    <NavLink to="/search">Search</NavLink>
                </li>
                <li>
                    <NavLink to="/profile">Profile</NavLink>
                </li>
                <li>
                    <NavLink to="/logout">Logout</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;


