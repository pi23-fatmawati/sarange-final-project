import { useEffect, useState } from "react";
import axios from "axios";

export default function PickUp() {
  const [userData, setUserData] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [pickupDate, setPickupDate] = useState("");
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [loadingCartData, setLoadingCartData] = useState(true);
  const [loadingTransaction, setLoadingTransaction] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        // Fetch user data
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

        // Fetch cart data
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

  const handleSchedulePickup = async () => {
    try {
      setLoadingTransaction(true);
      const token = localStorage.getItem("token");
      const requestData = {
        cartItems: cartItems.map((item) => ({
          id_cart: item.id_cart,
          pickup_date: pickupDate,
        })),
      };

      // Create transaction
      await axios.post(
        "https://final-sarange-eff62c954ab5.herokuapp.com/transaction",
        requestData,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      setLoadingTransaction(false);
      // Handle success
    } catch (error) {
      console.error("Error creating transaction:", error);
      setLoadingTransaction(false);
      // Handle error
    }
  };

  if (loadingUserData || loadingCartData) return <p>Loading...</p>;

  return (
    <div className="container-page">
      <div>
        <h2>Atur Jadwal Penjemputan</h2>
        <p>
          Pastikan sampahmu sudah siap dan kamu berada di tempat saat waktu
          penjemputan ya!
        </p>
      </div>
      <div>
        <h3>Informasi Pengguna</h3>
        <p>Nama: {userData.user.user_name}</p>
        <p>Nomor Telepon: {userData.user.phone_number}</p>
        <p>Alamat: {userData.user.address}</p>
      </div>
      <div>
        <h3>Atur Jadwal Pengiriman</h3>
        <input
          type="date"
          value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleSchedulePickup} disabled={loadingTransaction}>
          Atur Jadwal
        </button>
      </div>
    </div>
  );
}
