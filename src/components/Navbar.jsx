import React from "react";
import Fulllogo from "../pic/Fulllogo.png";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center fixed w-full top-0">
      <div>
        <img src={Fulllogo} alt="Logo" style={{ height: "100%" }} />
      </div>
      <div>
        <p style={{ color: "#52C41A" }}>Butuh bantuan?</p>
      </div>
    </nav>
  );
};

export default Navbar;
