import './component.css'

export default function CardEwallet(props){
    const handleClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    };
    return(
        <div 
            className={`card-ewallet bg-white w-64 h-16 flex justify-center items-center ${props.className}`}
            onClick={handleClick}
        >
            <img className='h-fit' src={props.img} alt="image e-wallet" />
        </div>
    )
}