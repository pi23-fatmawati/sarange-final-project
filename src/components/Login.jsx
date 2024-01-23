import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Logo from "../pic/logo.png";
import Shopping from "../pic/shopping.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    console.log("Logging in...");
  };

  return (
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
                placeholder="Katasandi"
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
            <button
              type="button"
              className=" text-white w-full px-4 py-2 rounded-md"
              style={{ backgroundColor: "#52C41A" }}
              onClick={handleLogin}
            >
              Masuk
            </button>
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
  );
};
export default Login;
