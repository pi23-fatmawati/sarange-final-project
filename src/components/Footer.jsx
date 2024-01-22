import Youtube from '../assets/youtube.png'
import Tiktok from '../assets/tiktok.png'
import Twitter from '../assets/twitter.png'
import Facebook from '../assets/facebook.png'
import Instagram from '../assets/instagram.png'
import LogoIcon from '../assets/Logo-icon.png'

export default function Footer() {
    return(
        <div className="footer flex justify-between py-5 mx-5">
            <div className="sosmed">
                <p>Follow us on:</p>
                <div className="img-sosmed flex">
                    <img src={Youtube} alt="Youtube" />
                    <img src={Tiktok} alt="Tiktok" />
                    <img src={Twitter} alt="Twitter" />
                    <img src={Facebook} alt="Facebook" />
                    <img src={Instagram} alt="Instagram" />
                </div>
            </div>
            <div className="copyright flex items-center">
                <p>&copy;Sarange, 2023.</p>
                <img src={LogoIcon} className='w-10' alt="Logo Icon" />
            </div>
        </div>
    )
}