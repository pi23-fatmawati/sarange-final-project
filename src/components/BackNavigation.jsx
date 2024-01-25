import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function BackNavigation(props) {
  return (
    <div className="mb-3 flex items-center gap-2">
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            className="text-green-2 text-2xl"
          />
          <h3 className="text-lg text-grey-2">{props.page}</h3>
        </div>
  )
}
