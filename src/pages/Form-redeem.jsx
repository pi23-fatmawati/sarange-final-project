import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import FormImage from '../assets/form-redeem.png'
import ButtonGreen from '../components/Button-green'
import ButtonOutline from '../components/Button-outline'
import LogoIcon from '../assets/logo-icon.png'

export default function FormRedeem(){
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handleInputChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handleFormSubmit = () => {
        if (phoneNumber.trim() === '') {
            alert('Masukkan nomor handphone anda');
            return;
        }

        setShowPopup(true)
    };

    const closePopup = () => {
        setShowPopup(false)
    }
    return(
        <div className="form-redeem flex flex-col items-center justify-center">
            <img className='w-fit mt-20' src={FormImage} alt="image-form" />
            <div className="number-phone my-4 mx-4 text-center">
                <p className='font-medium'>Nomor handphone yang dimasukkan harus benar dan aktif</p>
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={handleInputChange}
                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Masukkan Nomor HP Anda"
                    required
                />
            </div>
            <div className="btn-form flex gap-8">
                <ButtonOutline text='Kembali' onClick={()=> navigate(-1)}></ButtonOutline>
                <ButtonGreen text='Kirim' onClick={handleFormSubmit}></ButtonGreen>
            </div>
            {showPopup && (
                <div className="popup flex justify-center fixed items-center h-full w-full top-0 left-0">
                    <div className="popup-content bg-white p-8 flex flex-col items-center justify-center font-semibold gap-1">
                        <img src={LogoIcon} alt="Logo Icon" />
                        <p>Nomor: {phoneNumber}</p>
                        <p>Email: xxxx@gmail.com</p>
                        <p className='w-60 text-center'>Pastikan nomor handphone dan email anda sudah benar</p>
                        <div className="btn-popup flex gap-4 mt-4">
                            <ButtonOutline text='Kembali' onClick={closePopup}></ButtonOutline>
                            <ButtonGreen text='Kirim' onClick={()=> navigate('/sell/redeem-success')}></ButtonGreen>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}