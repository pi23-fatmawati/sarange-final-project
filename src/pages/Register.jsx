import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components/Register.css";
import "../components/component.css";
import "../App.css";
import Logo from "../pic/logo.png";
import Shopping from "../pic/shopping.png";
import NavbarRegisterLogin from "../components/NavbarRegisterLogin";

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
                  placeholder="Kata sandi"
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
                className="w-full btn-green py-1.5 font-medium rounded text-white"
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
    </>
  );
};

export default Register;
