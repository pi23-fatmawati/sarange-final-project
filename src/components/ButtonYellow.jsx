import "./component.css";
export default function ButtonYellow({
  text,
  onClick,
  onConfirm,
}) {
  const handleClick = (e) => {
    if (onConfirm) {
      onConfirm(e);
    } else if (onClick) {
      onClick(e);
    }
  };
  return (
    <button
      className="bg-yellow-300 py-1.5 px-4 font-normal rounded-lg text-black"
      onClick={handleClick}
    >
      {text}
    </button>
  );
}
