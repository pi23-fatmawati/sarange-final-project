import React from "react";
import UserProfile from "./components/UserProfile";

const App = () => {
  const userData = {
    nama: "Fatmawati",
    email: "fatmawati@sarange.com",
    nomorHp: "123-456-7890",
    alamat: "Jln Ahmad Yani No 99 Surabaya Jawa Timur",
  };

  return (
    <div>
      <UserProfile userData={userData} />
    </div>
  );
};

export default App;
