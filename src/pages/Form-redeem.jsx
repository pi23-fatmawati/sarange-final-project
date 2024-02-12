import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormImage from '../assets/form-redeem.png';
import ButtonGreen from '../components/Button-green';
import ButtonOutline from '../components/Button-outline';
import LogoIcon from '../assets/logo-icon.png';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function FormRedeem() {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState('');

    const submitPhoneNumber = () => {
        if (phoneNumber.trim() === '') {
            alert('Masukkan nomor handphone anda');
            return;
        }
        setShowPopup(true);
    };

    const handleFormSubmit = async () => {
        try {
            const redeemData = JSON.parse(Cookies.get("redeemData"))
            const token = Cookies.get("token")
            await axios.post("https://final-sarange-eff62c954ab5.herokuapp.com/redeem", {
                phone_number: phoneNumber,
                ...redeemData
            }, 
            {
                headers: {
                  authorization: `${token}`,
                },
              }
            );
            navigate('/sell/redeem-success');
        } catch (error) {
            setError('Gagal mengirim nomor telepon');
            console.error('Error post data', error);
        }
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="form-redeem flex flex-col items-center justify-center">
            <img className='w-fit mt-20' src={FormImage} alt="image-form" />
            <div className="number-phone my-4 mx-4 text-center">
                <p className='font-medium'>Nomor handphone yang dimasukkan harus benar dan aktif</p>
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Masukkan Nomor HP Anda"
                    required
                />
            </div>
            <div className="btn-form flex gap-8">
                <ButtonOutline text='Kembali' onClick={()=> navigate(-1)}></ButtonOutline>
                <ButtonGreen text='Kirim' onClick={submitPhoneNumber}></ButtonGreen>
            </div>
            {showPopup && (
                <div className="popup flex justify-center fixed items-center h-full w-full top-0 left-0 bg-black bg-opacity-50">
                    <div className="popup-content bg-white p-8 flex flex-col items-center justify-center font-semibold gap-1 rounded-lg">
                        <img src={LogoIcon} alt="Logo Icon" />
                        <p>Nomor: {phoneNumber}</p>
                        <p>Email: example@example.com</p>
                        <p className='w-60 text-center'>Pastikan nomor handphone dan email anda sudah benar</p>
                        <p className="text-red-500">{error}</p>
                        <div className="btn-popup flex gap-4 mt-4">
                            <ButtonOutline text='Kembali' onClick={closePopup}></ButtonOutline>
                            <ButtonGreen text='Kirim' onClick={handleFormSubmit}></ButtonGreen>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
