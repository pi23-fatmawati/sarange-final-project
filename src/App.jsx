import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import Product from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import HomePage from "./pages/Home";
import NavbarLandingPage from "./components/navbar-landing-page";
import NavbarSarange from "./components/Navbar-sarange";

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
        <Route
          path="/sell/*"
          element={
            <>
              <NavbarSarange />
              <Routes>
                <Route
                  path="/home"
                  element={
                    <>
                      <HomePage />
                    </>
                  }
                />
                <Route
                  path="/products"
                  element={
                    <>
                      <Product />
                    </>
                  }
                />
                <Route
                  path="/products/:id"
                  element={
                    <>
                      <ProductDetail />
                    </>
                  }
                />
                <Route path="/transactions" />
                <Route path="/transactions/:id" />
                <Route path="/education" />
              </Routes>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
