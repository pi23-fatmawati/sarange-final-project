import { Modal } from "flowbite-react";
import { HiCheckCircle } from "react-icons/hi";

export default function SuccessModal({ show, header, content, onClose }) {
  return (
    <Modal size="md" show={show} onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="flex flex-col gap-3 text-center">
          <HiCheckCircle className="mx-auto h-14 w-14 text-green-2" />
          <div>
            <h3 className="mb-2 text-lg font-medium">{header}</h3>
            <p>{content}</p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
