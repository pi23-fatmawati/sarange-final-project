import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import NavbarLandingPage from "./components/navbar-landing-page";
import Product from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import HomePage from "./pages/Home";
import NavbarSarange from "./components/Navbar-sarange";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import PickUp from "./pages/PickUp";
import "./App.css";
import Transactions from "./pages/Transactions";
import DetailTransaction from "./pages/DetailTransaction";
import Redeem from "./pages/Redeem";
import FormRedeem from "./pages/Form-redeem";
import RedeemSuccess from "./pages/Redeem-success";
import HistoryCoin from "./pages/history-coin";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavbarLandingPage />
              <LandingPage />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/sell/*"
          element={
            <>
              <NavbarSarange />
              <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/redeem" element={<Redeem />} />
                <Route path="/form-redeem" element={<FormRedeem />} />
                <Route path="/redeem-success" element={<RedeemSuccess />} />
                <Route path="/history-coin" element={<HistoryCoin />} />
                <Route path="/products" element={<Product />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/pick-up" element={<PickUp />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route
                  path="/transactions/:id"
                  element={<DetailTransaction />}
                />
                <Route path="/education" />
                <Route path="/profile" element={<UserProfile />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
