import { useEffect, useState } from "react";
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
import axios from "axios";
import Cookies from "js-cookie";

export default function Redeem() {
    const data = [
      { id: 1, money: '20.000', coin: 500},
      { id: 2, money: '50.000', coin: 1000 },
      { id: 3, money: '100.000', coin: 2000 }
    ];
  
    const eWalletData = [
      { id: 1, img: Gopay, e_wallet: 'gopay' },
      { id: 2, img: Shopeepay, e_wallet: 'ovo' },
      { id: 3, img: Dana, e_wallet: 'dana' },
      { id: 4, img: Ovo, e_wallet: 'shopeepay' }
    ];
    
    const [coinUser, setCoinUser] = useState(0);
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedEwallet, setSelectedEwallet] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      async function fetchUserData() {
        try {
          const token = Cookies.get("token");
          const response = await axios.get(
            "https://final-sarange-eff62c954ab5.herokuapp.com/homepage",
            {
              headers: {
                authorization: token,
              },
            }
          );
          const getUserData = response.data.user;
          setCoinUser(getUserData.coin_user);
        } catch (error) {
          console.error("Error fetching coin", error);
        }
      }
    
      fetchUserData();
    }, []);
    
    const handleCardClick = (id) => {
      const selectedCardData = data.find(item => item.id === id);
      if (coinUser < selectedCardData.coin) {
        alert('Koin Anda tidak cukup');
        return;
      }
      setSelectedCard(selectedCardData);
        
    };
  
    const handleEwalletClick = (id) => {
      setSelectedEwallet(id);
    };

    const isAnyCardSelected = selectedCard !== null && selectedEwallet !== null;


    const handleClaim = async () => {
      try {
        if (!isAnyCardSelected) {
          alert('Pilih jumlah dan dompet elektronik terlebih dahulu');
          return;
        }

        const selectedCardData = data.find(item => item.id === selectedCard?.id);
        const moneyAsNumber = parseInt(selectedCardData.money.replace(/\D/g, ''));
        const { coin } = selectedCardData;


        const redeemData = {
          money_get: moneyAsNumber,
          coin_redeem: coin,
          e_wallet: eWalletData.find(item => item.id === selectedEwallet)?.e_wallet
        };

        console.log(redeemData);
        Cookies.set("redeemData", JSON.stringify(redeemData), { expires: 1 })

        navigate('/sell/form-redeem');
      } catch (error) {
        alert(error?.response?.data?.message || 'Gagal melakukan redeem');
      }
    }
    
    return (
      <div className="container-page">
        <BackNavigation page="Beranda" />
        <div className="redeem-coin container mx-auto">
          <CardCoin coin={coinUser}></CardCoin>
          <div className="redeem-content mt-8 flex flex-col items-center py-8">
            <div className="redeem-card flex justify-center w-full">
              {data.map((item) => (
                <CardRedeem
                  key={item.id}
                  money={item.money}
                  coin={item.coin}
                  onClick={() => handleCardClick(item.id)}
                  className={selectedCard?.id === item.id ? 'selected-card' : null}
                />
              ))}
            </div>
            <div className="redeem-ewallet flex flex-wrap justify-center max-w-screen-sm mt-10">
              {eWalletData.map((item) => (
                <CardEwallet
                  key={item.id}
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
                    onClick={handleClaim}>Klaim</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
