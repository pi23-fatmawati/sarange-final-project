import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import NavbarSarange from "./components/Navbar-sarange";

const userData = {
  nama: "Fatmawati",
  email: "fatmawati@sarange.com",
  nomorHp: "123-456-7890",
  alamat: "Jln Ahmad Yani No 99 Surabaya Jawa Timur",
};

function App() {
  return (
    <Router>
      <div>
        {/* <UserProfile userData={userData} /> */}
        <UserProfile />
      </div>
    </Router>
  );
}

export default App;
