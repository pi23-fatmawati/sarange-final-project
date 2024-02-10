import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BackNavigation from "../components/BackNavigation";
import HeaderPage from "../components/HeaderPage";
import { faMapLocation } from "@fortawesome/free-solid-svg-icons";
import InputPickUp from "../components/InputPickUp";
import ButtonGreen from "../components/Button-green";
import ConfirmModal from "../components/ConfirmModal";
import { useState, useEffect } from "react";
import SuccessModal from "../components/SuccessModal";
import WarningModal from "../components/WarningModal"; // Perbaikan import di sini
import axios from "axios";

export default function PickUp() {
  const [openModal, setOpenModal] = useState(false);
  const [warningModal, setWarningModal] = useState(false); // Perbaikan nama variabel di sini
  const [successModal, setSuccessModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [pickupDate, setPickupDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
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
        const { user_name, phone_number, address } = response.data.user;
        setUserName(user_name);
        setPhoneNumber(phone_number);
        setUserAddress(address);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to check if all required fields are filled
  const isDataComplete = () => {
    const phoneNumberComplete = phoneNumber !== "";
    const userAddressComplete = userAddress !== "";
    const pickupDateComplete = pickupDate !== "";

    console.log("Phone number completeness:", phoneNumberComplete);
    console.log("User address completeness:", userAddressComplete);
    console.log("Pickup date completeness:", pickupDateComplete);

    const complete =
      phoneNumberComplete && userAddressComplete && pickupDateComplete;
    console.log("Data completeness:", complete);
    return complete;
  };

  return (
    <div className="container-page">
      <BackNavigation page="Keranjang" />
      <HeaderPage
        title="Atur Jadwal Penjemputan"
        subtitle=" Pastikan sampahmu sudah siap dan kamu berada di tempat saat waktu penjemputan ya!"
      />
      <div className="flex w-full gap-8 pt-4">
        <div className="flex flex-col w-full gap-3">
          <input className="rounded-lg" type="text" value={userName} disabled />
          <input
            className="rounded-lg"
            type="text"
            value={phoneNumber || ""}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <div className="flex flex-col w-full gap-2 border border-solid border-grey-2 rounded-lg py-2 px-4">
            <div className="font-medium p-2">Alamat Penjemputan</div>
            <div className="flex gap-4 items-center">
              <FontAwesomeIcon
                className="text-3xl text-grey-2"
                icon={faMapLocation}
              />
              <div className="flex flex-col gap-2 w-full">
                <h3 className="bg-grey-2 w-max px-2 py-1 rounded-md text-sm text-white">
                  Rumah
                </h3>
                <textarea
                  className="rounded-lg w-full"
                  value={userAddress || ""}
                  onChange={(e) => setUserAddress(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-4">
          <InputPickUp
            title="Tangal Penjemputan"
            type="date"
            value={pickupDate || ""}
            onChange={(e) => {
              console.log("New pickup date:", e.target.value);
              setPickupDate(e.target.value);
            }}
          />
          <InputPickUp
            title="Waktu Penjemputan"
            subtitle="Jadwal penjemputan adalah sekitar pukul 08.00 - 17.00 WIB. Mohon bersiap di jam tersebut."
          />
        </div>
      </div>
      <div className="mt-6 float-right">
        {/* ButtonGreen */}
        <ButtonGreen
          disabled={!isDataComplete()} // Disable the button if required data fields are not filled
          onClick={() => {
            if (!isDataComplete()) {
              setWarningModal(true);
            } else {
              setOpenModal(true);
            }
          }}
          text="Atur Jadwal"
        />
      </div>
      <WarningModal
        show={warningModal}
        onClose={() => setWarningModal(false)}
        header="Mohon Perhatian!"
        content="Mohon lengkapi semua data sebelum melanjutkan."
      />
      <ConfirmModal
        show={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={() => {
          setOpenModal(false);
          setSuccessModal(true);
        }}
        header="Apakah kamu sudah yakin dengan jadwal penjemputanmu?"
        content={`Sampahmu akan dijemput pada tanggal ${pickupDate}`}
      />
      <SuccessModal
        show={successModal}
        link="/sell/transactions"
        onClose={() => setSuccessModal(false)}
        header="Penjemputan sampahmu berhasil dijadwalkan"
        content={`Pastikan sampahmu sudah siap dan sesuai dengan ketentuan. Sampah akan dijemput pada tanggal ${pickupDate} antara pukul 08.00 - 17.00 WIB.`}
      />
    </div>
  );
}
