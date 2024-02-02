import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ContactItem({ icon, content }) {
  return (
    <div className="flex gap-4 items-center border-b-2 pb-3">
      <FontAwesomeIcon icon={icon} className="text-2xl text-green-2" />
      <p>{content}</p>
    </div>
  );
}
