import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import ButtonGreen from "./Button-green";
import ButtonOutline from "./Button-outline";

export default function ConfirmModal({
  show,
  onConfirm,
  onClose,
  header,
  content,
}) {
  return (
    <Modal size="md" show={show} onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="flex flex-col gap-3 text-center">
          <HiOutlineExclamationCircle className="mx-auto h-14 w-14 text-yellow-300" />
          <div>
            <h3 className="mb-2 text-lg font-medium">{header}</h3>
            <p>{content}</p>
          </div>
          {onConfirm && onClose && (
            <div className="flex justify-center gap-4">
              <ButtonGreen text="Ya" onConfirm={onConfirm} />
              <ButtonOutline text="Kembali" width="w-max" onClose={onClose} />
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
