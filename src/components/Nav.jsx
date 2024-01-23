import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <nav>
      <div className="max-w-screen-xl px-4 py-3 mx-auto mt-20">
        <div className="flex items-center">
          <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
            <li>
              <Link
                to="/historyprocess"
                className={activeLink === "/historyprocess" ? "active" : ""}
                onClick={() => handleLinkClick("/historyprocess")}
              >
                Diproses
              </Link>
            </li>
            <li>
              <Link
                to="/historysuccess"
                className={activeLink === "/historysuccess" ? "active" : ""}
                onClick={() => handleLinkClick("/historysuccess")}
              >
                Selesai
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
