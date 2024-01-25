import './component.css'
export default function ButtonOutline (props) {
    return(
        <button className='btn-outline py-1.5 px-7 font-normal rounded' onClick={props.onClick}>
            {props.text}
        </button>
    ) 
}