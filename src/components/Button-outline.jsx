import "./component.css";
export default function ButtonOutline({ text, width, onClick, onClose }) {
  const buttonClasses = `btn-outline py-1.5 px-7 font-normal rounded-lg ${
    width || "w-full"
  }`;
  const handleOnClick = (e) => {
    if (onClose) {
      onClose(e);
    } else if (onClick) {
      onClick(e);
    }
  };
  return (
    <button className={buttonClasses} onClick={handleOnClick}>
      {text}
    </button>
  );
}
