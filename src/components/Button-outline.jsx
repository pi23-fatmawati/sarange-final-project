import './component.css'
export default function ButtonOutline (props) {
    return(
        <button className='btn-outline py-1.5 px-7 w-full font-normal rounded'>
            {props.text}
        </button>
    ) 
}