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
import Education from "./pages/Education";
import Footer from "./components/Footer";
import { ArticleProvider } from "./context/ArticleContext";
import Article from "./pages/Article";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <ArticleProvider>
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <NavbarLandingPage />
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/education" element={<Education />} />
                  <Route path="/education/:id" element={<Article />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
                <Footer />
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
                  <Route path="/profile" element={<UserProfile />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </ArticleProvider>
    </BrowserRouter>
  );
}

export default App;
