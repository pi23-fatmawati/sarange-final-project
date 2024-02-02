import LogoIcon from "../assets/Logo-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook ,
  faInstagram,
  faTiktok,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import "./component.css"

export default function Footer() {
  return (
    <div className="footer bottom-0 flex justify-between py-6 px-14 text-sm bg-gray-200">
      <div className="flex flex-col sosmed gap-2">
        <p>Follow us on:</p>
        <div className="img-sosmed flex gap-2 text-2xl text-grey-500">
          <FontAwesomeIcon icon={faYoutube} className="socmed-icon" />
          <FontAwesomeIcon icon={faTiktok} className="socmed-icon" />
          <FontAwesomeIcon icon={faTwitter} className="socmed-icon" />
          <FontAwesomeIcon icon={faFacebook} className="socmed-icon" />
          <FontAwesomeIcon icon={faInstagram} className="socmed-icon" />
        </div>
      </div>
      <div className="copyright flex items-center gap-2">
        <p>&copy; Sarange, 2023</p>
        <img src={LogoIcon} className="w-8" alt="Logo Icon" />
      </div>
    </div>
  );
}
