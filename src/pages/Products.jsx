import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import HeaderPage from "../components/HeaderPage";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUserSuccess } from "../redux/slice/user-slice";

function Product() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    nama: "",
    coin: 0,
  });
  const URL = "https://656bda9ee1e03bfd572ddc89.mockapi.io/sarange/listSampah";
  const [products, setProducts] = useState([]);
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://final-sarange-eff62c954ab5.herokuapp.com/homepage",
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );

      const userProfileData = response.data.user;
      dispatch(getUserSuccess({ data: userProfileData }));
      setUserData({
        nama: userProfileData.user_name,
        coin: userProfileData.coin_user,
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

  useEffect(() => {
    fetchUserProfile();
  }, []);
  useEffect(() => {
    getDataProduct();
  }, []);

  const getDataProduct = async () => {
    try {
      const response = await fetch(URL);
      const productsData = await response.json();
      setProducts(productsData);
    } catch (error) {
      console.log(error);
    }
  };
  if (products.length === 0 && loading) {
    return (
      <div className="container-page flex justify-center items-center">
        Loading...
      </div>
    );
  }
  return (
    <>
      <div className="container-page flex flex-col gap-4 w-full">
        <HeaderPage
          title={`Hai ${userData.nama}, mau jual apa hari ini?`}
          subtitle="Yuk, jaga bumi dan dapatkan koin dari setiap penjualan sampahmu!"
        />
        <div
          className="flex flex-wrap w-full justify-center gap-5 items-start"
          id="product-card"
        >
          {products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                imgSrc={product.img}
                imgAlt={product.nama}
                title={product.nama}
                coin={product.koin}
              />
            );
          })}
          ;
        </div>
        <Cart />
      </div>
    </>
  );
}

export default Product;
