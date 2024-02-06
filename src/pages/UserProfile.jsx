import React, { useState, useEffect } from "react";
// import userImage from "../pic/profilepic0.png";
import NavbarSarange from "../components/Navbar-sarange";
import axios from "axios";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    nama: "",
    email: "",
    nomorHp: "",
    alamat: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://final-sarange-eff62c954ab5.herokuapp.com/profile",
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );

      const userProfileData = response.data.user;
      setUserData({
        nama: userProfileData.user_name,
        email: userProfileData.email,
        nomorHp: userProfileData.phone_number,
        alamat: userProfileData.address,
      });

      // Update imageUrl based on the user's profile picture
      // console.log(userProfileData.profile_pic);
      setImageUrl(userProfileData.profile_pic);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
      }
    }
  };

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
    setImageUrl(URL.createObjectURL(file));
  };

  const handleToggleEdit = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const handleSaveProfile = async (event) => {
    try {
      event.preventDefault();
      const token = localStorage.getItem("token");

      const commonHeaders = {
        authorization: `${token}`,
      };

      const formData = new FormData();
      formData.append("user_name", userData.nama);
      formData.append("phone_number", userData.nomorHp);
      formData.append("address", userData.alamat);
      // Append image
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      await axios.patch(
        "https://final-sarange-eff62c954ab5.herokuapp.com/profile",
        formData,
        {
          headers: commonHeaders,
        }
      );

      setIsEditing(false);
      fetchUserProfile(); // Fetch updated profile after saving changes
    } catch (error) {
      console.error("Error saving profile:", error);
    }
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
                  value={userData.nama || ""}
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
                  value={userData.email || ""}
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
              <label className="block text-gray-600 w-1/4">No Hp</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="nomorHp"
                  value={userData.nomorHp || ""}
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
                  value={userData.alamat || ""}
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
                    src={imageUrl}
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
              className="btn-green py-1.5 px-7 font-medium rounded text-white"
            >
              Save
            </button>
          ) : (
            //<Button onClick={handleSaveProfile} text="Save Profile" />
            <button
              onClick={handleToggleEdit}
              className="btn-green py-1.5 px-7 font-medium rounded text-white"
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
