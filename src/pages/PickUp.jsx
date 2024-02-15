import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BackNavigation from "../components/BackNavigation";
import HeaderPage from "../components/HeaderPage";
import { faMapLocation } from "@fortawesome/free-solid-svg-icons";
import InputPickUp from "../components/InputPickUp";
import ButtonGreen from "../components/Button-green";
import ConfirmModal from "../components/ConfirmModal";
import SuccessModal from "../components/SuccessModal";
import WarningModal from "../components/WarningModal";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { updateCart } from "../redux/slice/cart-slice";
import { useNavigate } from "react-router-dom";

export default function PickUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [userData, setUserData] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [pickupDate, setPickupDate] = useState("");
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [loadingCartData, setLoadingCartData] = useState(true);
  const [loadingTransaction, setLoadingTransaction] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");
        const userResponse = await axios.get(
          "https://final-sarange-eff62c954ab5.herokuapp.com/profile",
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );
        setUserData(userResponse.data);
        setLoadingUserData(false);
        console.log("User Data:", userResponse.data);

        const cartResponse = await axios.get(
          "https://final-sarange-eff62c954ab5.herokuapp.com/cart",
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );
        if (cartResponse.data && Array.isArray(cartResponse.data.carts)) {
          const checkedItems = cartResponse.data.carts.filter(
            (item) => item.is_check
          );
          setCartItems(checkedItems);
          setLoadingCartData(false);
          console.log("Cart Data:", checkedItems);
        } else {
          console.error("Invalid cart data structure:", cartResponse.data);
          setLoadingCartData(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoadingUserData(false);
        setLoadingCartData(false);
      }
    };

    fetchData();
  }, []);

  const handleEditProfile = () => {
    navigate("/sell/profile")
    console.log("page");
  }

  const handleChangeUserData = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      user: {
        ...prevUserData.user,
        [name]: value,
      },
    }));
    
  };

  const handlePickupDateChange = (newDate) => {
    setPickupDate(newDate);
    console.log(newDate);
  };

  const handleSchedulePickup = async () => {
    try {
      setLoadingTransaction(true);
      const token = Cookies.get("token");
      const requestData = {
        cartItems: cartItems.map((item) => ({
          id_cart: item.id_cart,
          pickup_date: pickupDate,
        })),
      };
      await axios.post(
        "https://final-sarange-eff62c954ab5.herokuapp.com/transaction",
        requestData,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      dispatch(updateCart());
      setLoadingTransaction(false);
    } catch (error) {
      console.error("Error creating transaction:", error);
      setLoadingTransaction(false);
    }
  };

  const handleConfirmPickup = () => {
    if (!userData.user.address || !userData.user.phone_number || userData.user.address === 'null' || userData.user.phone_number === 'null')  {
      alert("Mohon isi alamat dan nomor handphone anda");
    } else if (!pickupDate) {
      alert("Mohon isi tanggal penjemputan")
    }
    else {
      setOpenModal(true);
    }
  }

  if (loadingUserData || loadingCartData) return <p>Loading...</p>;

  return (
    <div className="container-page">
      <BackNavigation page="Keranjang" />
      <HeaderPage
        title="Atur Jadwal Penjemputan"
        subtitle=" Pastikan sampahmu sudah siap dan kamu berada di tempat saat waktu penjemputan ya!"
      />
      <div className="flex w-full gap-8 pt-4">
        <div className="flex flex-col w-full gap-3">
          <input
            className="rounded-lg"
            type="text"
            value={userData.user.user_name}
            disabled
          />
          <input
            className="rounded-lg"
            type="text"
            value={userData.user.phone_number}
          
            onClick={() => {
              if (!userData.user.phone_number || userData.user.phone_number === 'null') {
                handleEditProfile()
              }
            }}
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
                  value={userData.user.address}
                  onClick={() => {
                    if (!userData.user.address || userData.user.address === 'null') {
                      handleEditProfile()
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-4">
          <InputPickUp
            title="Tangal Penjemputan"
            type="date"
            value={pickupDate}
            onChange={(e) => handlePickupDateChange(e.target.value)}
          />
          <InputPickUp
            title="Waktu Penjemputan"
            subtitle="Jadwal penjemputan adalah sekitar pukul 08.00 - 17.00 WIB. Mohon bersiap di jam tersebut."
          />
        </div>
      </div>
      <div className="mt-6 float-right">
        {loadingTransaction ? (
          <span>
            <ButtonGreen
              text="Mengatur..."
              dataModalTrigger
              disabled={loadingTransaction}
            />
          </span>
        ) : (
          <ButtonGreen
            text="Atur Jadwal"
            dataModalTrigger
            onClick={handleConfirmPickup}
            disabled={loadingTransaction}
          />
        )}
      </div>
      <ConfirmModal
        show={openModal}
        textConfirm={loadingTransaction ? "Mengatur..." : "Ya"}
        onClose={() => setOpenModal(false)}
        onConfirm={async () => {
          try {
            await handleSchedulePickup();
            setOpenModal(false);
            setSuccessModal(true);
          } catch (error) {
            console.error("Error handling pickup:", error);
          }
        }}
        onClick
        header="Apakah kamu sudah yakin dengan jadwal penjemputanmu?"
        content={`Sampahmu akan dijemput pada ${pickupDate}`}
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