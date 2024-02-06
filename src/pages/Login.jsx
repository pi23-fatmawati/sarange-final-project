import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/component.css";
import "../App.css";
import Logo from "../pic/logo.png";
import Shopping from "../pic/shopping.png";
import NavbarRegisterLogin from "../components/NavbarRegisterLogin";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Handle Login function dipanggil");
    try {
      const response = await axios.post(
        "https://final-sarange-eff62c954ab5.herokuapp.com/login",
        {
          email: email,
          password: password,
        }
      );

      // Tangani respons dari server
      const { token } = response.data;

      // Simpan token ke dalam local storage atau session storage
      localStorage.setItem("token", token);

      console.log("Login berhasil. Token:", token);
      navigate("/sell/home");
    } catch (error) {
      console.error("Error logging in:", error);
    }
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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Kata sandi"
                  className="mt-1 p-2 w-full border rounded-md"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label className="text-sm font-medium text-gray-600">
                  Ingatkan saya
                </label>
              </div>
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
