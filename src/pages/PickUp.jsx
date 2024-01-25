import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BackNavigation from "../components/BackNavigation";
import HeaderPage from "../components/HeaderPage";
import { faMapLocation } from "@fortawesome/free-solid-svg-icons";
import InputPickUp from "../components/InputPickUp";
import ButtonGreen from "../components/Button-green";
import ConfirmModal from "../components/ConfirmModal";
import { useState } from "react";
import SuccessModal from "../components/SuccessModal";

export default function PickUp() {
  const [openModal, setOpenModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [phone, setPhone] = useState("081234567890");
  const [address, setAddress] = useState("Bandung");

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
            defaultValue="Fitri"
            disabled
          />
          <input
            className="rounded-lg"
            type="text"
            value="089613957876"
            onChange={(e) => setPhone(e.target.value)}
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
                  value="Bandung"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-4">
          <InputPickUp title="Tangal Penjemputan" type="date" />
          <InputPickUp
            title="Waktu Penjemputan"
            subtitle="Jadwal penjemputan adalah sekitar pukul 08.00 - 17.00 WIB. Mohon bersiap di jam tersebut."
          />
        </div>
      </div>
      <div className="mt-6 float-right">
        <ButtonGreen
          text="Atur Jadwal"
          dataModalTrigger
          onClick={() => setOpenModal(true)}
        />
      </div>
      <ConfirmModal
        show={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={() => {
          setOpenModal(false);
          setSuccessModal(true);
        }}
        header="Apakah kamu sudah yakin dengan jadwal penjemputanmu?"
        content="Jadwal penjemputanmu adalah 20 Januari 2024"
      />
      <SuccessModal
        show={successModal}
        onClose={() => setSuccessModal(false)}
        header="Penjemputan sampahmu berhasil dijadwalkan"
        content="Pastikan sampahmu sudah siap dan sesuai dengan ketentuan. Sampah akan dijemput pada tanggal 20 Januari 2024 antara pukul 08.00 - 17.00 WIB."
      />
    </div>
  );
}
