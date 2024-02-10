import React from "react";
import Logo from "../assets/full-logo-sarange.svg";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{ backgroundColor: "white" }}
      className="fixed m-0 p-0 w-full top-0 shadow z-20"
    >
      <div className="navbar-content max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to={"/"}
          className="nav-img flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={Logo} className="h-9" alt="Sarange Logo" />
        </Link>
        <Link to={"/Contact"} target="_blank">
          <p style={{ color: "#52C41A" }}>Butuh bantuan?</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
