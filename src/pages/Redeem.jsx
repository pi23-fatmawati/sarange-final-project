import { useState } from "react";
import CardCoin from "../components/Card-coin";
import CardRedeem from "../components/Card-redeem";
import '../App.css';
import CardEwallet from "../components/Card-ewallet";
import Gopay from '../assets/gopay.png';
import Shopeepay from '../assets/shopeepay.png';
import Dana from '../assets/dana.png';
import Ovo from '../assets/ovo.png';
import ButtonOutline from "../components/Button-outline";
import { useNavigate } from "react-router-dom";
import BackNavigation from "../components/BackNavigation";

export default function Redeem() {
    const data = [
      { id: 1, money: '20.000', coin: 500},
      { id: 2, money: '50.000', coin: 1000 },
      { id: 3, money: '100.000', coin: 2000 }
    ];
  
    const eWalletData = [
      { id: 1, img: Gopay },
      { id: 2, img: Shopeepay },
      { id: 3, img: Dana },
      { id: 4, img: Ovo }
    ];
  
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedEwallet, setSelectedEwallet] = useState(null);
  
    const handleCardClick = (id) => {
        const cardCoinValue = 1000;
        const selectedCardCoin = data.find(item => item.id === id)?.coin;
    
        if (cardCoinValue < selectedCardCoin) {
          alert('Koin Anda tidak cukup');
          return;
        }
    
        setSelectedCard(id);
      };
  
    const handleEwalletClick = (id) => {
      setSelectedEwallet(id);
    };
    const isAnyCardSelected = selectedCard !== null && selectedEwallet !== null;
    const navigate = useNavigate();
  
    return (
      <div className="container-page">
        <BackNavigation page="Beranda" />
        <div className="redeem-coin container mx-auto">
          <CardCoin coin={1000}></CardCoin>
          <div className="redeem-content mt-8 flex flex-col items-center py-8">
            <div className="redeem-card flex justify-center w-full">
              {data.map((item, index) => (
                <CardRedeem
                  key={index}
                  money={item.money}
                  coin={item.coin}
                  onClick={() => handleCardClick(item.id)}
                  className={selectedCard === item.id ? 'selected-card' : null}
                />
              ))}
            </div>
            <div className="redeem-ewallet flex flex-wrap justify-center max-w-screen-sm mt-10">
              {eWalletData.map((item, index) => (
                <CardEwallet
                  key={index}
                  img={item.img}
                  onClick={() => handleEwalletClick(item.id)}
                  className={selectedEwallet === item.id ? 'selected-ewallet bg-zinc-200' : null}
                />
              ))}
            </div>
            <div className="btn-claim flex gap-10 mt-5">
                <ButtonOutline text='Kembali' onClick={()=> navigate(-1)}></ButtonOutline>
                <button 
                    className="btn-klaim px-10 text-center rounded text-white" 
                    disabled={!isAnyCardSelected}
                    onClick={() => navigate('/sell/form-redeem')}>Klaim</button>
            </div>
          </div>
        </div>
      </div>
    );
  }