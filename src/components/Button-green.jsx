import './component.css'
export default function ButtonGreen (props) {
    return(
        <button className='btn-green py-1.5 px-7 font-normal rounded text-white'>
            {props.text}
        </button>
    ) 
}