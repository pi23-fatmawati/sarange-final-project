import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Logo from "../pic/logo.png";
import Shopping from "../pic/shopping.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreement, setAgreement] = useState(false);

  const handleRegister = () => {
    console.log("Registering...");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        marginTop: "50px",
      }}
    >
      <img
        src={Shopping}
        alt="shopping img"
        style={{
          height: "Auto",
          flex: 1,
          maxWidth: "550px",
          marginRight: "50px",
        }}
      />
      <div
        className="container mx-auto mt-10 border p-4 rounded-md"
        style={{ flex: 1, margin: "0 40px", maxWidth: "450px" }}
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
            Register
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
                type="text"
                placeholder="Nama"
                className="mt-1 p-2 w-full border rounded-md"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
            <div className="mb-4">
              <input
                type="password"
                placeholder="Konfirmasi Sandi"
                className="mt-1 p-2 w-full border rounded-md"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={agreement}
                onChange={() => setAgreement(!agreement)}
              />
              <label className="text-sm font-medium text-gray-600">
                Saya menyetujui syarat dan ketentuan yang berlaku
              </label>
            </div>
            <button
              type="button"
              className=" text-white w-full px-4 py-2 rounded-md"
              style={{ backgroundColor: "#52C41A" }}
              onClick={handleRegister}
            >
              Daftar
            </button>
          </form>
          <p className="mt-4">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              style={{
                color: "#52C41A",
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              MASUK
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
