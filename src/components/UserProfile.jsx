import React, { useState } from "react";
import userImage from "../pic/profilepic0.png";
import NavbarSarange from "./Navbar-sarange";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    nama: "user sarange",
    email: "usersarange@gmail.com",
    nomorHp: "123456789",
    alamat: "Jln Sarange No XX, Kec. XXXX Kab. XXX ",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleToggleEdit = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const handleSaveProfile = () => {
    console.log("Data yang disimpan:", userData);
    if (selectedImage) {
      console.log("New image:", selectedImage);
    }
    setIsEditing(false);
  };

  return (
    <>
      <NavbarSarange />
      <div className="max-w-screen-s-m-xl mt-20 mx-4 md:mx-32 bg-white rounded border">
        <div className="border-b px-6 py-3">
          <h2 className="text-xl font-semibold">Informasi Pengguna</h2>
        </div>
        <div className="p-4 md:p-6">
          <div>
            <div className="flex mb-4">
              <label className="block text-gray-600 w-1/4">Nama</label>
              {isEditing ? (
                <input
                  type="text"
                  name="nama"
                  value={userData.nama}
                  onChange={handleChange}
                  className="text-gray-600 w-3/4 md:w-2/3 lg:w-2/3 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
                />
              ) : (
                <div className="w-3/4 md:w-2/3 lg:w-2/3 border border-gray-300 rounded-md px-2 py-1">
                  {userData.nama}
                </div>
              )}
            </div>
            <div className="flex mb-4">
              <label className="block text-gray-600 w-1/4">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="text-gray-600 w-3/4 md:w-2/3 lg:w-2/3 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
                />
              ) : (
                <div className="w-3/4 md:w-2/3 lg:w-2/3 border border-gray-300 rounded-md px-2 py-1">
                  {userData.email}
                </div>
              )}
            </div>
            <div className="flex mb-4">
              <label className="block text-gray-600 w-1/4">Email</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="nomorHp"
                  value={userData.nomorHp}
                  onChange={handleChange}
                  className="text-gray-600 w-3/4 md:w-2/3 lg:w-2/3 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
                />
              ) : (
                <div className="w-3/4 md:w-2/3 lg:w-2/3 border border-gray-300 rounded-md px-2 py-1">
                  {userData.nomorHp}
                </div>
              )}
            </div>
            <div className="flex mb-4">
              <label className="block text-gray-600 w-1/4">Alamat</label>
              {isEditing ? (
                <textarea
                  name="alamat"
                  value={userData.alamat}
                  onChange={handleChange}
                  className="text-gray-600 w-3/4 md:w-2/3 lg:w-2/2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
                />
              ) : (
                <div className="w-3/4 md:w-2/3 lg:w-2/3 border border-gray-300 rounded-md px-2 py-1 h-16">
                  {userData.alamat}
                </div>
              )}
            </div>
            {/* Sisipkan gambar */}
            <div className="flex mb-4">
              <label className="block text-gray-600 w-1/4">Foto</label>
              <div className="w-3/4 md:w-2/3 lg:w-1/2">
                {isEditing ? (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="mb-2"
                    />
                    {selectedImage && (
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected User Image"
                        className="w-20 h-20 md:w-16 md:h-16 lg:w-24 lg:h-24 rounded-full mb-2"
                      />
                    )}
                  </>
                ) : (
                  <img
                    src={
                      selectedImage
                        ? URL.createObjectURL(selectedImage)
                        : userImage
                    }
                    alt="User Image"
                    className="w-20 h-20 md:w-16 md:h-16 lg:w-24 lg:h-24 rounded-full mr-4"
                  />
                )}
                <label>svg, png, jpg or gif (max 800x400px)</label>
              </div>
            </div>
            {/* Sisipkan gambar */}
          </div>
        </div>
        <div
          style={{ backgroundColor: "#FBFBFB" }}
          className="px-4 py-4 rounded p-0 flex justify-end border-t"
        >
          {isEditing ? (
            <button
              onClick={handleSaveProfile}
              className="px-4 py-2 bg-green-500 text-white rounded focus:outline-none focus:border-green-700"
            >
              Save Profile
            </button>
          ) : (
            <button
              onClick={handleToggleEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded focus:outline-none focus:border-blue-700"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
