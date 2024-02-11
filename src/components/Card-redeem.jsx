import './component.css'

export default function CardRedeem({ money, coin, onClick, className }){
    const handleClick = () => {
        if (onClick) {
          onClick();
        }
      };
    return(
        <div className={`card-redeem flex flex-col items-center justify-center gap-2 w-fit h-fit p-4 mx-1 ${className}`}
        onClick={handleClick}>
            <p className='text-center text-2xl font-medium'>Rp. {money}</p>
            <div className="line-redeem"></div>
            <div className="card-redeem-content flex gap-2 items-center">
                <h1 className='text-2xl font-semibold'>{coin}</h1>
                <p className='font-medium'>Koin</p>
            </div>
        </div>
    )
}