import './component.css'
export default function Button (props) {
    return(
        <button className='btn-green py-1.5 px-7 font-medium rounded text-white'>
            {props.text}
        </button>
    ) 
}