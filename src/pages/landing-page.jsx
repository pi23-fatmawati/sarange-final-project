import Image1 from "../assets/Landing-page-1.png";
import Logo from "../assets/full-logo-sarange.svg";
import Mudah from "../assets/mudah.png";
import "../App.css";
import CardWhySarange from "../components/Card-why-sarange";
import Aman from "../assets/aman.png";
import Terpercaya from "../assets/terpercaya.png";
import Gabung from "../assets/gabung-sekarang.png";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <div className="introduction flex justify-between max-w-screen-xl mx-auto mt-20">
        <div className="introduction-desc flex flex-col justify-center text-center sm:text-start w-full">
          <h1 className="font-semibold text-4xl">Ubah sampahmu jadi uang</h1>
          <p className="mt-5 text-lg">
            Website jual barang bekas yang masih memiliki nilai ekonomis
          </p>
        </div>
        <div className="introduction-image md:flex md:justify-center sm:flex sm:justify-center w-full">
          <img
            src={Image1}
            className="max-h-auto max-w-full"
            alt="Landing Page 1"
          />
        </div>
      </div>
      <div
        className="about-us flex justify-around max-w-screen-xl mx-auto py-20"
        id="about-us"
      >
        <div className="about-image md:flex md:justify-center md:items-center w-full">
          <img src={Logo} className="h-28 w-full" alt="Logo Sarange" />
        </div>
        <div className="about-text flex flex-col justify-center w-full md:mt-5">
          <h1 className="font-semibold text-4xl">Kenalan dengan Sarange</h1>
          <p className="mt-3 text-lg">
            Sarange (akronim dari Sampah Daur Ulang (bernilai) Ekonomis)
            merupakan sebuah inovasi dalam upaya optimalisasi jual beli sampah.
            Website ini diperuntukkan untuk para perempuan Indonesia yang ingin
            menjual sampah daur ulang.
          </p>
        </div>
      </div>
      <div className="why-sarange">
        <div className="why-desc text-center font-semibold text-4xl">
          <h1>Kenapa Harus Sarange?</h1>
        </div>
        <div className="card-why flex flex-wrap align-center justify-center gap-20 mt-8">
          <CardWhySarange img={Mudah}></CardWhySarange>
          <CardWhySarange img={Aman}></CardWhySarange>
          <div className="terpercaya w-52 flex justify-center rounded-xl">
            <div className="img-sarange px-11 py-14">
              <img src={Terpercaya} alt="image card" />
            </div>
          </div>
        </div>
      </div>
      <div className="gabung mt-20 flex justify-around items-center mx-auto">
        <div className="img-gabung flex items-center justify-center w-full my-20">
          <img src={Gabung} className="h-52" alt="gabung image" />
        </div>
        <div className="gabung-desc w-full">
          <h1 className="font-semibold text-4xl">
            Mulai Jual Sampah Daur Ulangmu di Sarange
          </h1>
          <p className="my-5">
            Gabung dengan Sarange dan rasakan kemudahan menjual sampah
          </p>
          <Link to="/register" target="_blank">
            <Button text="Gabung Sekarang" />
          </Link>
        </div>
      </div>
    </>
  );
}