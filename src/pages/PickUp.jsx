import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BackNavigation from "../components/BackNavigation";
import HeaderPage from "../components/HeaderPage";
import { faMapLocation } from "@fortawesome/free-solid-svg-icons";
import InputPickUp from "../components/InputPickUp";
import ButtonGreen from "../components/Button-green";
import ConfirmModal from "../components/ConfirmModal";
import { useState, useEffect } from "react";
import SuccessModal from "../components/SuccessModal";
import WarningModal from "../components/WarningModal";
import axios from "axios";

export default function PickUp() {
  const [cartItems, setCartItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [pickupDate, setPickupDate] = useState("");

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://final-sarange-eff62c954ab5.herokuapp.com/cart",
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );
        console.log("Response data:", response.data);
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setCartItems([]); // Set cartItems to an empty array in case of error
      }
    };

    fetchCartItems();
  }, []);

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

  const isDataComplete = () => {
    const phoneNumberComplete = phoneNumber !== "";
    const userAddressComplete = userAddress !== "";
    const pickupDateComplete = pickupDate !== "";

    return phoneNumberComplete && userAddressComplete && pickupDateComplete;
  };

  const sendTransactionRequest = async () => {
    try {
      if (!Array.isArray(cartItems)) {
        console.error("Cart items is not an array");
        return;
      }

      if (cartItems.length === 0) {
        console.error("No cart items available");
        setErrorMessage(
          "Tidak ada item dalam keranjang belanja. Tambahkan item ke keranjang belanja sebelum melanjutkan."
        );
        return;
      }

      const requestData = {
        cartItems: cartItems.map((cartItem) => ({
          id_cart: cartItem.id_cart,
          pickup_date: pickupDate,
        })),
      };
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://final-sarange-eff62c954ab5.herokuapp.com/transaction",
        requestData,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      console.log("Response:", response.data);
      setOpenModal(true);
    } catch (error) {
      console.error("Error creating transaction:", error);
      setErrorMessage(
        "Terjadi kesalahan saat membuat transaksi. Silakan coba lagi."
      );
    }
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
        <button
          disabled={!isDataComplete()}
          onClick={() => {
            if (!isDataComplete()) {
              setWarningModal(true);
            } else {
              sendTransactionRequest();
            }
          }}
        >
          Atur Jadwal
        </button>
        {cartItems.length === 0 && (
          <div className="text-red-500 mt-2">{errorMessage}</div>
        )}
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
