import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Logo from "../pic/logo.png";
import Shoping from "../pic/shoping.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    console.log("Logging in...");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        margin: "0 40px",
      }}
    >
      <img
        src={Shoping}
        alt=""
        style={{ height: "65%", width: "Auto", flex: 1 }}
      />
      <div
        className="container mx-auto mt-10 border p-4 rounded-md"
        style={{ flex: 1, margin: "0 40px" }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
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
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleLogin}
          >
            Masuk
          </button>
        </form>
        <p className="mt-4">
          Baru di Sarange? <Link to="/register">DAFTAR</Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
