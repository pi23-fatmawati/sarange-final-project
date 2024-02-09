import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/component.css";
import "../App.css";
import Logo from "../pic/logo.png";
import Shopping from "../pic/shopping.png";
import NavbarRegisterLogin from "../components/NavbarRegisterLogin";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setEmail, setError, setPassword, setRememberMe } from "../redux/slice/login-slice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, password, rememberMe, error } = useSelector((state) => state.login)

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Handle Login function dipanggil");
    dispatch(loginUser({ email, password }))
      .then(() => {
        navigate("/sell/home");
      })
      .catch((error) => {
        console.error('error', error);
      })
      
  };

  return (
    <>
      <NavbarRegisterLogin />
      <div
        className=" flex flex-col lg:flex-row container-register"
        style={{
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={Shopping} alt="shopping img" className="shopping-img" />
        <div
          className="container-regis lg:flex-1 container  mt-10 border p-4 rounded-md "
          style={{ maxWidth: "450px" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: " 25px 30px 20px 30px",
            }}
          >
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginRight: "1rem",
              }}
            >
              Masuk
            </h1>
            <img
              src={Logo}
              alt=""
              style={{ height: "100%", marginLeft: "auto" }}
            />
          </div>
          <div style={{ margin: " 25px 30px 20px 30px" }}>
            <form>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="mt-1 p-2 w-full border rounded-md"
                  onChange={(e) => dispatch(setEmail(e.target.value))}
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Kata sandi"
                  className="mt-1 p-2 w-full border rounded-md"
                  onChange={(e) => dispatch(setPassword(e.target.value))}
                />
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={rememberMe}
                  onChange={(e) => dispatch(setRememberMe(e.target.checked))}
                />
                <label className="text-sm font-medium text-gray-600">
                  Ingatkan saya
                </label>
              </div>
                {error && <p className="text-red-500">{error}</p>}
              <div className="mb-4">
                <button
                  className="w-full btn-green py-1.5 font-medium rounded text-white"
                  onClick={handleLogin}
                >
                  Masuk
                </button>
              </div>
            </form>
            <p className="mt-4">
              Baru di Sarange?{" "}
              <Link
                to="/register"
                style={{
                  color: "#52C41A",
                  fontWeight: "bold",
                  textDecoration: "underline",
                }}
              >
                DAFTAR
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
