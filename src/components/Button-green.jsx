import "./component.css";
export default function ButtonGreen({
  text,
  dataModalTrigger,
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
      className="btn-green py-1.5 px-7 font-normal rounded-lg text-white"
      data-modal-trigger={dataModalTrigger}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}
