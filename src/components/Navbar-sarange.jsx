import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/full-logo-sarange.svg";
import ButtonOutline from "./Button-outline";
import ButtonGreen from "./Button-green";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slice/auth-slice";
import { getUser } from "../redux/slice/user-slice";

export default function NavbarSarange() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [clickedLink, setClickedLink] = useState("Beranda");
  const [profilePic, setProfilePic] = useState("../pic/profilepic0.png");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: userData } = useSelector((state) => state.user);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleClickedLink = (link) => {
    setClickedLink(link);
  };

  const handleLogout = () => {
    dispatch(logoutUser())
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUser());
      setProfilePic(userData.profile_pic || "../pic/profilepic0.png");
    };
  
    fetchData();
  }, [dispatch, userData.profile_pic]);  

  return (
    <nav
      style={{ backgroundColor: "white" }}
      className="fixed m-0 p-0 w-full top-0 shadow z-20"
    >
      <div className="navbar-content max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to={"/sell/home"}
          className="nav-img flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={Logo} className="h-9" alt="Sarange Logo" />
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0">
          <button
            type="button"
            className="btn-profile flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
            id="user-menu-button"
            aria-expanded={isProfileOpen}
            onClick={toggleProfile}
            aria-controls="user-dropdown"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="h-8 w-8 rounded-full"
              src={userData.profile_pic ? userData.profile_pic : profilePic }
              alt="user photo"
            />
          </button>
          <div
            className={`z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 top-10 right-2 absolute ${
              isProfileOpen ? "block" : "hidden"
            }`}
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 font-bold text-center">
                {userData.user_name}
              </span>
              <span className="block text-sm  text-gray-500 truncate text-center">
                {userData.email}
              </span>
            </div>
            <div className="button-popup-profile mx-4 flex flex-col gap-2 p-4">
              <Link to="/sell/profile">
                <ButtonGreen text="Lihat Profile" />
              </Link>
              <ButtonOutline text="Logout" onClick={handleLogout} />
            </div>
          </div>
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
              <Link
                to={"/sell/home"}
                className="nav-link block py-2 px-3 rounded md:p-0"
                onClick={() => {
                  handleClickedLink("Beranda");
                  navigate("/sell/home");
                }}
                style={{
                  color: clickedLink === "Beranda" ? "#52C41A" : "grey",
                }}
                aria-current="page"
              >
                Beranda
              </Link>
            </li>
            <li>
              <Link
                to={"/sell/products"}
                className="nav-link block py-2 px-3 rounded md:p-0"
                onClick={() => {
                  handleClickedLink("Products");
                  navigate("/sell/products");
                }}
                style={{
                  color: clickedLink === "Products" ? "#52C41A" : "grey",
                }}
                aria-current="page"
              >
                Jual Sampah
              </Link>
            </li>
            <li>
              <Link
                to={"/sell/transactions"}
                className="nav-link block py-2 px-3 rounded md:p-0"
                onClick={() => {
                  handleClickedLink("Riwayat");
                  navigate("/sell/transactions");
                }}
                style={{
                  color: clickedLink === "Riwayat" ? "#52C41A" : "grey",
                }}
                aria-current="page"
              >
                Riwayat
              </Link>
            </li>
            <li>
              <Link
                to={"/education"}
                target="_blank"
                className="nav-link block py-2 px-3 rounded md:p-0"
                style={{
                  color: clickedLink === "Edukasi" ? "#52C41A" : "grey",
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
