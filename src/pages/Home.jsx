import Home from "../assets/home.png";
import Coin from "../assets/coin.png";
import Redeem from "../assets/redeem.png";
import Image1 from "../assets/carousel-1.png";
import Image2 from "../assets/carousel-2.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { useSelector, useDispatch } from "react-redux";
import { getUserBasicInfo } from "../redux/slice/user-slice";
import Cookies from "js-cookie";
import axios from "axios";

export default function HomePage() {
  const slides = [Image1, Image2];
  const [curr, setCurr] = useState(0);
  const [getMetrics, setGetMetrics] = useState(null)

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  useEffect(() => {
    const autoSlideInterval = 8000;
    const autoSlide = true;

    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  const dispatch = useDispatch();
  const { data: userData, isLoading } = useSelector(
    (state) => state.user_basic_info
  );

  useEffect(() => {
    dispatch(getUserBasicInfo());
  }, [dispatch]);

  if (isLoading) {
    return <div className="container-page text-center">Loading...</div>;
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const token = Cookies.get("token");
        // Fetch user id
        const userResponse = await axios.get(
          "https://final-sarange-eff62c954ab5.herokuapp.com/homepage",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const { id_user: userId } = userResponse.data.user;
  
        // Fetch transaction data
        const transactionResponse = await axios.get(
          `https://final-sarange-eff62c954ab5.herokuapp.com/transaction?id_user=${userId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const transactions = transactionResponse.data.transactions;

        let totalProducts = 0;
        transactions.map((transaction) => {
          totalProducts += transaction.total_product;
        });
  
        const environmentalFactor = 0.64;
        const environmentalMetrics = environmentalFactor * totalProducts;
        const outputMetrics = environmentalMetrics.toFixed(2)
        setGetMetrics(outputMetrics)
  
        console.log("Total produk:", totalProducts);
        console.log("Metrik lingkungan:", outputMetrics);
        
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  
    fetchData();
  }, []);

  return (
    <>
      <div className="home container mx-auto flex items-center justify center max-w-screen-lg">
        <div className="img-home mt-20 w-full">
          <img className="w-full" src={Home} alt="image home" />
        </div>
        <div className="text-home flex flex-col gap-1 container mx-auto absolute text-center justify-center items-center w-full right-0 left-0 mt-5">
          <p className="text-xl font-medium">
            Hai {userData.user_name || "User"}! Terima kasih, ya
          </p>
          <h1 className="text-3xl font-bold py-1">
          {getMetrics !== null && getMetrics !== undefined
              ? `${getMetrics} Kg CO`
              : "0 Kg CO"}<sub>2</sub>
          </h1>
          <p className="text-xl font-medium">
            telah berkurang berkat penjualan sampahmu.
          </p>
          <Link to="/sell/products">
            <button className="btn-home text-white mt-2 py-2 px-10 rounded-full">
              Jual Sekarang
            </button>
          </Link>
        </div>
      </div>
      <div className="coin mt-5 mx-auto w-full flex justify-around p-2 max-w-screen-lg">
        <Link
          to={"/sell/history-coin"}
          className="coin-user flex items-center gap-2 mx-auto"
        >
          <img src={Coin} className="w-auto max-h-12" alt="coin image" />
          <h1 className="coin-home font-semibold text-xl">
            {userData.coin_user !== null && userData.coin_user !== undefined
              ? `${userData.coin_user} Koin`
              : "0 Koin"}
          </h1>
        </Link>
        <div className="line"></div>
        <Link
          to={"/sell/redeem"}
          className="redeem-coin flex items-center gap-2 mx-auto"
        >
          <img src={Redeem} className="w-auto max-h-12" alt="reedem image" />
          <p className="font-semibold text-xl">Tukar Koin</p>
        </Link>
      </div>
      <div className="carousel container mx-auto mt-5 max-w-screen-lg">
        <p className="font-semibold text-xl">Untuk Anda</p>
        <div className="flex justify-center items-center">
          <div className="w-full">
            <div className="overflow-hidden w-full relative">
              <div
                className="flex carousel-img transition-transform ease-out duration-500 "
                style={{
                  transform: `translateX(-${curr * 100}%)`,
                  width: "100%",
                }}
                onClick={()=> window.open('/education')}
              >
                {slides.map((s, index) => (
                  <img
                    className="block w-full object-cover mx-0"
                    style={{ maxHeight: "100%", maxWidth: "100%", cursor: "pointer"}}
                    key={index}
                    src={s}
                    alt={`slide-${index}`}
                  />
                ))}
              </div>
              <div className="absolute top-0 bottom-0 left-0 flex items-center">
                <button onClick={prev} className='p-1 absolute left-0 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'>
                  <ChevronLeft />
                </button>
              </div>
              <div className="absolute top-0 bottom-0 right-0 flex items-center">
                <button onClick={next} className='p-1 absolute right-0 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'>
                  <ChevronRight />
                </button>
              </div>
              <div className="absolute bottom-4 right-0 left-0">
                <div className="flex items-center justify-center gap-2">
                  {slides.map((_, i) => (
                    <div
                      key={i}
                      className={`transition-all w-1.5 h-1.5 bg-white rounded-full ${
                        curr === i ? "p-0.5" : "bg-opacity-50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
