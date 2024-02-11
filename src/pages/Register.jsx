import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../components/Register.css";
import "../components/component.css";
import "../App.css";
import Logo from "../pic/logo.png";
import Shopping from "../pic/shopping.png";
import ButtonGreen from "../components/Button-green";
import NavbarRegisterLogin from "../components/NavbarRegisterLogin";
import {
  setName,
  setEmail,
  setPassword,
  setConfirmPassword,
  setAgreement,
  setError,
  resetForm,
  registerUser,
} from "../redux/slice/register-slice";
import SuccessModal from "../components/SuccessModal";
import ConfirmModal from "../components/ConfirmModal";

const Register = () => {
  const [openModal, setOpenModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user_name, email, password, confirm_password, agreement, error, loading } =
    useSelector((state) => state.register);

    const handleRegister = async (event) => {
      event.preventDefault();
    
      try {
        if (!user_name || !email || !password || !confirm_password) {
          dispatch(setError("Semua kolom harus diisi"));
          return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          dispatch(setError("Format email tidak valid"));
          return;
        }
        if (password !== confirm_password) {
          dispatch(setError("Password dan konfirmasi password harus sama"));
          return;
        }
        if (!agreement) {
          dispatch(setError("Harap setujui syarat dan ketentuan yang berlaku"));
          return;
        }
        const response = await dispatch(
          registerUser({
            user_name,
            email,
            password,
            confirm_password,
            agreement,
          })
        );
        if (response && response.status === 201) {
          navigate("/sell/profile");
          setSuccessModal(true);
          resetForm();
        }
      } catch (error) {
        console.log(error);
      } 
    };
    
  useEffect(() => {
    if (successModal) {
      const timer = setTimeout(() => {
        navigate("/sell/profile");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [successModal, navigate]);

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
              alt="Sarange Icon"
              style={{ height: "100%", marginLeft: "auto" }}
            />
          </div>
          <div style={{ margin: " 25px 30px 20px 30px" }}>
            <form>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={user_name}
                  onChange={(e) => dispatch(setName(e.target.value))}
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={email}
                  onChange={(e) => dispatch(setEmail(e.target.value))}
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Kata sandi"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={password}
                  onChange={(e) => dispatch(setPassword(e.target.value))}
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Konfirmasi Sandi"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={confirm_password}
                  onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
                />
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={agreement}
                  onChange={() => dispatch(setAgreement(!agreement))}
                />
                <label className="text-sm font-medium text-gray-600">
                  Saya menyetujui syarat dan ketentuan yang berlaku
                </label>
              </div>
              {error && <p className="text-red-500 text-sm mb-1">{error}</p>}
              <ButtonGreen
                text={loading ? "Memeriksa Data..." : "Daftar"}
                width="w-full"
                onClick={handleRegister}
                disabled={loading}
              />
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
      <ConfirmModal
        show={openModal}
        onClose={() => setOpenModal(false)}
        header="Email sudah terdaftar."
        content="Silakan login atau daftar dengan email lain."
      />
      <SuccessModal
        show={successModal}
        onClose={() => setSuccessModal(false)}
        header="Registrasi berhasil"
        content={`Sedang mengarahkan ke halaman profil...
        Silakan lengkapi profilmu terlebih dahulu sebelum melakukan transaksi.`}
      />
    </>
  );
};

export default Register;