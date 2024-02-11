import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function BackNavigation({icon, page}) {
  return (
    <div className="mb-3 flex items-center gap-2">
          <FontAwesomeIcon
            icon={ icon || faCircleArrowLeft }
            className="text-green-2 text-2xl"
          />
          <h3 className="text-lg text-grey-2">{page}</h3>
        </div>
  )
}
