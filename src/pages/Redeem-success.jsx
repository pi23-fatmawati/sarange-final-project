import { useNavigate } from 'react-router-dom'
import Success from '../assets/success.gif'
import ButtonGreen from '../components/Button-green'

export default function RedeemSuccess(){
    const navigate = useNavigate()
    return(
        <div className="redeem-success flex flex-col justify-center items-center gap-4 w-full h-screen">
            <img src={Success} alt="redeem success" />
            <p className='font-semibold'>Terima kasih telah mendukung sarange </p>
            <ButtonGreen text='Kembali' onClick={()=> navigate('/sell/home')}></ButtonGreen>
        </div>
    )
}