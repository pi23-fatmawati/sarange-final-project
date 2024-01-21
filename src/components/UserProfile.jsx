import React from "react";
import userImage from "../pic/profilepic0.png";

const UserProfile = ({ userData }) => {
  return (
    <div className="max-w-screen-s-m-xl mx-4 md:mx-32 bg-white rounded border">
      <div className="border-b px-6 py-3">
        <h2 className="text-xl font-semibold">Informasi Pengguna</h2>
      </div>
      <div className="p-4 md:p-6">
        <div>
          <div className="flex mb-2">
            <label className="block text-gray-600 w-1/4">Nama</label>
            <input
              type="text"
              defaultValue={userData.nama}
              className="text-gray-600 w-3/4 md:w-2/3 lg:w-1/2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
              readOnly
            />
          </div>
          <div className="flex mb-2">
            <label className="block text-gray-600 w-1/4">Email</label>
            <input
              type="email"
              defaultValue={userData.email}
              className="text-gray-600 w-3/4 md:w-2/3 lg:w-1/2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
              readOnly
            />
          </div>
          <div className="flex mb-2">
            <label className="block text-gray-600 w-1/4">Nomor HP</label>
            <input
              type="tel"
              defaultValue={userData.nomorHp}
              className="text-gray-600 w-3/4 md:w-2/3 lg:w-1/2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
              readOnly
            />
          </div>
          <div className="flex mb-2">
            <label className="block text-gray-600 w-1/4">Alamat</label>
            <textarea
              defaultValue={userData.alamat}
              className="text-gray-600 w-3/4 md:w-2/3 lg:w-1/2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
              readOnly
            />
          </div>
          <div className="flex mb-2">
            <label className="block text-gray-600 w-1/4">Foto</label>
            <div className="w-3/4 md:w-2/3 lg:w-1/2">
              <img
                src={userImage}
                alt="User Image"
                className="w-30 h-30 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full mr-4"
              />
              <label>svg, png, jpg or gif (max 800x400px)</label>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ backgroundColor: "#FBFBFB" }}
        className="px-4 py-4 rounded p-0 flex justify-end border-t"
      >
        <button className="bg-custom-green hover:bg-blue-600 text-white px-4 py-2 rounded">
          Edit Profil
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
