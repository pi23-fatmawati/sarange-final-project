import { useParams } from "react-router-dom";
import BackNavigation from "../components/BackNavigation";
import HeaderPage from "../components/HeaderPage";
import { Card } from "flowbite-react";
import ButtonGreen from "../components/Button-green";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocation } from "@fortawesome/free-solid-svg-icons";

export default function DetailTransaction() {
  const { id } = useParams();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const tanggalTransaksi = urlParams.get("tanggalTransaksi");
  const waktuPenjemputan = urlParams.get("waktuPenjemputan");
  const produk = urlParams.get("produk");
  const koin = urlParams.get("koin");
  const status = urlParams.get("status");

  if (!tanggalTransaksi || !waktuPenjemputan || !produk || !koin || !status) {
    return <div className="container-page">Transaksi tidak ditemukan</div>;
  }

  return (
    <div className="container-page">
      <BackNavigation page="Transaksi" />
      <HeaderPage title="Detail Transaksi" />
      <div className="w-[1220px] h-[167px] bg-white rounded-xl border border-zinc-200 justify-start items-center inline-flex">
        <div className="w-[237px] h-[167px] justify-start items-start flex">
          <div className="h-[268px] rounded-tl-lg rounded-tr-lg flex-col justify-start items-start gap-2 inline-flex">
            <img
              className="max-h-fit"
              src="https://via.placeholder.com/237x240"
            />
          </div>
        </div>
        <div className="grow shrink basis-0 self-stretch p-2.5 flex-col justify-center items-center inline-flex">
          <div className="self-stretch p-4 justify-start items-center gap-12 inline-flex">
            <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
              <div className=" text-gray-500 text-base font-normal leading-7">
                Order ID: {id}
              </div>
              <div className="text-neutral-800 text-2xl font-semibold">
                {produk}
              </div>
              <div className="self-stretch text-gray-500 text-base font-normal leading-7">
                x 1kg
              </div>
            </div>
            <div className="w-[215px] border-l border-r border-neutral-400 flex-col justify-center items-center gap-2 inline-flex">
              <div className="text-neutral-800 text-xl font-semibold">
                Koin didapat
              </div>
              <div className="self-stretch text-center text-lime-600 text-2xl font-semibold">
                {koin}
              </div>
            </div>
            <div className="flex-col justify-center items-center gap-2 inline-flex mr-2">
              <ButtonGreen
                className="text-white text-base font-semibold background-green-2"
                text="Selesai"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[1220px] h-[216px] p-10 rounded-2xl border border-zinc-200 justify-start items-center gap-9 inline-flex">
        <div className="w-[878px] flex-col justify-center items-center gap-2 inline-flex">
          <div className="self-stretch text-black text-xl font-medium leading-7">
            Alamat Penjemputan
          </div>
          <div className="self-stretch p-3 justify-start items-center gap-5 inline-flex">
            <div className="text-2xl"><FontAwesomeIcon icon={faMapLocation}/></div>
            <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
              <div className="text-zinc-500 text-base font-normal leading-normal">
                Home
              </div>
              <div className="w-[324px] text-black text-base font-normal leading-normal">
                Jl. Soekarno Hatta No. 1, Kota Bandung, Jawa Barat
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch px-3 flex-col justify-center items-start gap-3 inline-flex">
          <div className="h-[52px] flex-col justify-start items-start gap-1 flex">
            <div className="self-stretch text-zinc-500 text-base font-normal leading-normal">
              Dijemput pada:
            </div>
            <div className="self-stretch text-black text-base font-normal leading-normal">
              dd/mm/yy ss:mm:hh
            </div>
          </div>
          <div className="h-[61px] flex-col justify-center items-start gap-2 flex">
            <div className="text-neutral-800 text-xl font-semibold">
              Total Koin{" "}
            </div>
            <div className="self-stretch text-lime-600 text-2xl font-semibold">
              400
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
