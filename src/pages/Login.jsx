import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/component.css";
import "../App.css";
import Logo from "../pic/logo.png";
import Shopping from "../pic/shopping.png";
import NavbarRegisterLogin from "../components/NavbarRegisterLogin";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  setEmail,
  setError,
  setPassword,
  setRememberMe,
  clearError,
} from "../redux/slice/login-slice";
import ButtonGreen from "../components/Button-green";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, password, rememberMe, error, loading } = useSelector(
    (state) => state.login
  );

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(clearError());
    try {
      if (!email || !password) {
        dispatch(setError("Email dan password harus diisi"));
        return;
      }
      const response = await dispatch(loginUser({ email, password }));
      if (response.status === 200) {
        navigate("/sell/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <>
      <NavbarRegisterLogin />
      <div
        className="flex flex-col lg:flex-row container-register"
        style={{
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={Shopping} alt="shopping img" className="shopping-img" />
        <div
          className="container-regis lg:flex-1 min-h-[450px] container justify-between mt-10 border p-4 rounded-md "
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
                  Ingat saya
                </label>
              </div>
            </form>
            <div className="mt-16 mb-4">
              {loading && <p>Memeriksa Data...</p>}
              {error && !loading && (
                <p className="text-red-500 text-sm mb-1">{error}</p>
              )}
              <ButtonGreen
                width="w-full"
                text={loading ? <FontAwesomeIcon icon={faSpinner} /> : "Masuk"}
                onClick={handleLogin}
                disabled={loading}
              />
            </div>
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