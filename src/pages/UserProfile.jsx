import { useState, useEffect } from "react";
// import userImage from "../pic/profilepic0.png";
import axios from "axios";
import ButtonGreen from "../components/Button-green";
import ButtonOutline from "../components/Button-outline";
import InputProfile from "../components/InputProfile";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import SuccessModal from "../components/SuccessModal";

const UserProfile = () => {
  const [successModal, setSuccessModal] = useState(false);
  const [userData, setUserData] = useState({
    nama: "",
    email: "",
    nomorHp: "",
    alamat: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
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
      setSuccessModal(true);
      fetchUserProfile();
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };
  const handleDeletePhoto = () => {
    setSelectedImage(null);
    setImageUrl(null);
  };

  if (loading) {
    return <div className="container-page text-center">Loading...</div>;
  }

  return (
    <div className="container-page">
      <div className="max-w-screen-s-m-xl mx-4 md:mx-20 bg-white rounded border">
        <div className="border-b px-6 py-3">
          <h2 className="text-xl font-semibold">Informasi Pengguna</h2>
        </div>
        <div className="p-4 md:p-6">
          <div className="flex flex-col gap-3">
            <div className="profile-item">
              <label>Nama</label>
              {isEditing ? (
                <InputProfile
                  type="text"
                  name="nama"
                  value={userData.nama || ""}
                  onChange={handleChange}
                />
              ) : (
                <InputProfile type="text" value={userData.nama} disabled />
              )}
            </div>
            <div className="profile-item">
              <label>Email</label>
              {isEditing ? (
                <InputProfile
                  type="email"
                  name="email"
                  value={userData.email || ""}
                  onChange={handleChange}
                />
              ) : (
                <InputProfile type="text" value={userData.email} disabled />
              )}
            </div>
            <div className="profile-item">
              <label>No Hp</label>
              {isEditing ? (
                <InputProfile
                  type="tel"
                  name="nomorHp"
                  value={userData.nomorHp || ""}
                  onChange={handleChange}
                />
              ) : (
                <InputProfile type="text" value={userData.nomorHp} disabled />
              )}
            </div>
            <div className="profile-item">
              <label>Alamat</label>
              {isEditing ? (
                <InputProfile
                  type="text-area"
                  name="alamat"
                  value={userData.alamat || ""}
                  onChange={handleChange}
                />
              ) : (
                <InputProfile
                  type="text-area"
                  value={userData.alamat}
                  disabled
                />
              )}
            </div>
            <div className="profile-item">
              <label>Foto</label>
              {isEditing ? (
                <div className="flex flex-col gap-3 w-3/4 md:w-2/3 lg:w-2/3">
                  <InputProfile
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {selectedImage && (
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-6 items-center text-xl text-red-600">
                        <img
                          src={URL.createObjectURL(selectedImage)}
                          alt="Selected User Image"
                          className="w-20 h-20 md:w-16 md:h-16 lg:w-24 lg:h-24 rounded-full"
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => handleDeletePhoto()}
                          className="cursor-pointer"
                        />
                      </div>
                      <div className="pic">
                        svg, png, atau jpg (max 800x400px)
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <img
                  src={imageUrl === undefined ? "Belum ada gambar" : imageUrl}
                  alt="User Image"
                  className="w-20 h-20 md:w-16 md:h-16 lg:w-24 lg:h-24 rounded-full mr-4"
                />
              )}
            </div>
          </div>
        </div>
        <div
          style={{ backgroundColor: "#FBFBFB" }}
          className="px-4 py-4 rounded p-0 flex justify-end border-t"
        >
          {isEditing ? (
            <div className="buttons flex gap-4">
              <ButtonOutline
                text="Kembali"
                width="w-max"
                onClick={() => setIsEditing(false)}
              />
              <ButtonGreen
                onClick={handleSaveProfile}
                text="Simpan"
              />
            </div>
          ) : (
            <ButtonGreen onClick={handleToggleEdit} text="Edit Profil" />
          )}
        </div>
      </div>
      <SuccessModal
        show={successModal}
        onClose={() => setSuccessModal(false)}
        header="Berhasil Disimpan"
      />
    </div>
  );
};

export default UserProfile;
