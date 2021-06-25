import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../actions/authActions";

const Header = () => {
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    window.location.href = "/login";
  };
  return (
    <div>
      <h4>
        <NavLink to="/">Home</NavLink>
      </h4>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/create-project">Create Project</NavLink>
      <NavLink to="#" onClick={handleLogout}>
        Logout
      </NavLink>
    </div>
  );
};

export default Header;
