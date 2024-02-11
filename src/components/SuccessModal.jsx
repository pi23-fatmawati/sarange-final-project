import { Modal } from "flowbite-react";
import React from "react";
import { HiCheckCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function SuccessModal({ show, header, content, onClose, link }) {
  return (
    <Modal size="md" show={show} onClose={onClose} popup>
      <Link to={link}>
        <Modal.Header />
      </Link>
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
