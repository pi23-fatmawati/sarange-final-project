import Home from "../assets/home.png";
import Coin from "../assets/coin.png";
import Redeem from "../assets/redeem.png";
import Image1 from "../assets/carousel-1.png";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

export default function HomePage() {
  const slides = [Image1, Image1, Image1];
  const [curr, setCurr] = useState(0);
  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  useEffect(() => {
    const autoSlideInterval = 3000;
    const autoSlide = true;

    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);
  return (
    <>
      <div className="home container mx-auto flex items-center justify center">
        <div className="img-home mt-20 w-full">
          <img className="w-full" src={Home} alt="image home" />
        </div>
        <div className="text-home container mx-auto absolute text-center justify-center items-center w-full right-0 left-0 mt-5">
          <p className="text-xl font-medium">Hai User, Terima kasih ya</p>
          <h1 className="text-3xl font-bold py-1">10 Kg</h1>
          <p className="text-xl font-medium">
            CO<sub>2</sub> berkurang karenamu{" "}
          </p>
          <button className="btn-home text-white mt-2 py-2 px-10 rounded-full">
            Jual Sekarang
          </button>
        </div>
      </div>
      <div className="coin container mt-5 mx-auto w-full flex justify-around p-2">
        <Link
          to={"/history-coin"}
          className="coin-user flex items-center gap-2 mx-auto"
        >
          <img src={Coin} className="w-auto max-h-12" alt="coin image" />
          <h1 className="font-semibold text-2xl">1.000</h1>
          <p className="font-medium">Koin</p>
        </Link>
        <div className="line"></div>
        <Link
          to={"/redeem"}
          className="redeem-coin flex items-center gap-2 mx-auto"
        >
          <img src={Redeem} className="w-auto max-h-12" alt="reedem image" />
          <p className="font-semibold text-lg">Tukar Koin</p>
        </Link>
      </div>
      <div className="carousel container mx-auto mt-5">
        <p className="font-semibold text-xl">Untuk Anda</p>
        <div className="flex justify-center items-center">
          <div className="w-full">
            <div className="overflow-hidden w-full relative">
              <div
                className="flex carousel-img transition-transform ease-out duration-500"
                style={{
                  transform: `translateX(-${curr * 100}%)`,
                  width: "100%",
                }}
              >
                {slides.map((s, index) => (
                  <img
                    className="block w-full object-cover mx-0"
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                    key={index}
                    src={s}
                    alt={`slide-${index}`}
                  />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <button
                  onClick={prev}
                  className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={next}
                  className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                >
                  <ChevronRight />
                </button>
              </div>
              <div className="absolute bottom-4 right-0 left-0">
                <div className="flex items-center justify-center gap-2">
                  {slides.map((_, i) => (
                    <div
                      key={i}
                      className={`transition-all w-1.5 h-1.5 bg-white rounded-full ${curr === i ? "p-0.5" : "bg-opacity-50"}`}
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