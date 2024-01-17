// src/components/Register.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreement, setAgreement] = useState(false);

  const handleRegister = () => {
    // Implement registration logic here
    console.log("Registering...");
  };

  return (
    <div className="container mx-auto mt-10 border p-4 rounded-md">
      <h1 className="text-3xl font-semibold mb-6">Daftar</h1>
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
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleRegister}
        >
          Daftar
        </button>
      </form>
      <p className="mt-4">
        Sudah punya akun? <Link to="/login">MASUK</Link>
      </p>
    </div>
  );
};

export default Register;
