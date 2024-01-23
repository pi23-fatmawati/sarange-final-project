import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Cart() {
  return (
    <>
      <Link to="/checkout">
        <div className="flex gap-2 items-center fixed bottom-5 bg-green-2 text-white p-4 rounded-full">
          <FontAwesomeIcon icon={faBagShopping} className="text-3xl" />
          <div id="count-item" className="font-medium hidden">item</div>
        </div>
      </Link>
    </>
  );
}
