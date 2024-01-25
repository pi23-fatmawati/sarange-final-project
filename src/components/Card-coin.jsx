import Coin from '../assets/coin.png'
import { Link } from 'react-router-dom'
import './component.css'

export default function CardCoin(props){
    return (
        <div className="w-full flex justify-center">
            <Link to={'/history-coin'} className="card-coin flex flex-col items-center justify-center gap-2 w-fit mt-24 w-72 h-28">
                <p className='text-center font-medium'>Koin Anda</p>
                <div className="card-coin-content flex gap-2 items-center">
                    <img className='w-auto max-h-12' src={Coin} alt="coin image" />
                    <h1 className='text-2xl font-semibold'>{props.coin}</h1>
                    <p className='font-medium'>Koin</p>
                </div>
            </Link>
        </div>
    )
}