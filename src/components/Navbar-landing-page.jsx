import Logo from "../assets/full-logo-sarange.svg";
import Button from "./Button";
import { useState } from "react";
import "./component.css";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import ButtonGreen from "./Button-green";

export default function NavbarLandingPage() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [clickedLink, setClickedLink] = useState("Beranda");
  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };
  const handleClickedLink = (link) => {
    setClickedLink(link);
  };
  return (
    <nav
      style={{ backgroundColor: "#D3F8B7" }}
      className="fixed m-0 p-0 w-full top-0 z-20"
    >
      <div className="navbar-content max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <HashLink
          smooth
          to={"/#"}
          className="nav-img flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={Logo} className="h-9" alt="Sarange Logo" />
        </HashLink>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link to="/login" target="_blank">
            <ButtonGreen
              className="focus:ring-4 focus:outline-none font-medium text-sm px-4 py-2 text-center"
              text="Login Sarange"
            />
          </Link>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded={isNavbarOpen}
            onClick={toggleNavbar}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ml-auto mr-10 w-full md:flex md:w-auto md:order-1 ${
            isNavbarOpen ? "block" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 md:flex-row md:mt-0">
            <li>
              <HashLink
                smooth
                to={"/#"}
                className="block py-2 px-3 rounded md:p-0"
                onClick={() => handleClickedLink("Beranda")}
                style={{
                  color: clickedLink === "Beranda" ? "#254416" : "#52C41A",
                }}
                aria-current="page"
              >
                Beranda
              </HashLink>
            </li>
            <li>
              <HashLink
                smooth
                to="/#about-us"
                className="nav-link block py-2 px-3 rounded md:p-0"
                onClick={() => handleClickedLink("Tentang")}
                style={{
                  color: clickedLink === "Tentang" ? "#254416" : "#52C41A",
                }}
                aria-current="page"
              >
                Tentang Kami
              </HashLink>
            </li>
            <li>
              <Link
                to={"/contact"}
                className="nav-link block py-2 px-3 rounded md:p-0"
                onClick={() => handleClickedLink("Kontak")}
                style={{
                  color: clickedLink === "Kontak" ? "#254416" : "#52C41A",
                }}
                aria-current="page"
              >
                Kontak
              </Link>
            </li>
            <li>
              <Link
                to={"/education"}
                className="nav-link block py-2 px-3 rounded md:p-0"
                onClick={() => handleClickedLink("Edukasi")}
                style={{
                  color: clickedLink === "Edukasi" ? "#254416" : "#52C41A",
                }}
                aria-current="page"
              >
                Edukasi
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}