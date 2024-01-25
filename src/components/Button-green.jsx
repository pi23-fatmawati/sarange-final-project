import './component.css'
export default function ButtonGreen (props) {
    return(
        <button className='btn-green py-1.5 px-10 font-normal rounded text-white' onClick={props.onClick}>
            {props.text}
        </button>
    ) 
}