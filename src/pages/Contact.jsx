import { TextInput, Textarea } from "flowbite-react";
import ButtonGreen from "../components/Button-green";
import ContactItem from "../components/ContactItem";
import {
  faClockFour,
  faMapLocation,
  faMessage,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";


export default function Contact() {
  const contactList = [
    {
      id: 1,
      icon: faMapLocation,
      content:
        "Kantor Sarange: <br> Jalan Ketintang Madya 18, Surabaya, Jawa Timur 60223",
    },
    {
      id: 2,
      icon: faClockFour,
      content: `Jam operasional: <br> Senin sampai Jumat 08.00 - 17.00 WIB (kecuali libur Nasional)`,
    },
    {
      id: 3,
      icon: faMessage,
      content: `Email: <br> sarange.contact@gmail.com`,
    },
    { id: 4, icon: faPhone, content: "081122233456" },
  ];
  return (
    <div className="container-page">
      <div className="flex gap-8 justify-around">
        <form className="flex w-[472px] h-[480px] flex-col gap-4 p-10 rounded-xl shadow border">
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <h1 className="font-medium text-xl">Hubungi Kami</h1>
                <p className="text-sm">
                  Sampaikan kritik dan saranmu atau hubungi kami untuk
                  bekerjasama
                </p>
              </div>
              <img
                src="../src/assets/logo-icon.png"
                alt="Sarange Icon"
                style={{ width: "52px" }}
              />
            </div>
          </div>
          <TextInput
            id="email-user"
            type="email"
            placeholder="Email"
            required
          />
          <TextInput id="subject" type="text" placeholder="Subject" required />
          <Textarea
            placeholder="Kritik, saran, kendala, atau pesan lainnya"
            className="min-h-36"
          />
          <ButtonGreen text="Kirim" />
        </form>
        <form className="flex w-[472px] h-[480px] flex-col gap-4 p-10 rounded-xl shadow border">
          <div className="flex flex-col gap-5">
            <h1 className="font-medium text-xl">Kontak</h1>
          </div>
          <div className="flex flex-col gap-5">
            {contactList.map((contact) => (
              <ContactItem
                key={contact.id}
                icon={contact.icon}
                content={<div dangerouslySetInnerHTML={{__html: contact.content}} />}
              />
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}
