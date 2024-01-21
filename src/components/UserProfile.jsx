import React from "react";
import userImage from "../pic/profilepic.png";

const UserProfile = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded p-6 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Informasi Pengguna</h2>
      <div>
        <div className="mb-2">
          <label className="block text-gray-600">Nama</label>
          <p className="text-gray-600">Nama Pengguna</p>
        </div>
        <div className="mb-2">
          <label className="block text-gray-600">Email</label>
          <p className="text-gray-600">user@example.com</p>
        </div>
        <div className="mb-2">
          <label className="block text-gray-600">Nomor HP</label>
          <p className="text-gray-600">123-456-7890</p>
        </div>
        <div className="mb-2">
          <label className="block text-gray-600">Alamat</label>
          <p className="text-gray-600">Jalan Contoh No. 123</p>
        </div>
        <label className="block text-gray-600">Foto</label>
        <div className="mb-2">
          <img
            src={userImage}
            alt="User Image"
            className="w-16 h-16 rounded-full mr-4"
          />
        </div>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Edit Profil
      </button>
    </div>
  );
};

export default UserProfile;
