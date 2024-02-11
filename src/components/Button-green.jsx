import "./component.css";
export default function ButtonGreen({
  text,
  dataModalTrigger,
  onClick,
  onConfirm,
  padding,
  width,
  disabled,
}) {
  const handleClick = (e) => {
    if (onConfirm) {
      onConfirm(e);
    } else if (onClick) {
      onClick(e);
    }
  };
  const buttonClasses = `btn-green py-1.5 ${
    padding || "px-7"
  } font-normal rounded-lg text-white ${width} || 'w-full' ${
    disabled ? "disabled" : ""
  }`;
  return (
    <button
      className={buttonClasses}
      data-modal-trigger={dataModalTrigger}
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

