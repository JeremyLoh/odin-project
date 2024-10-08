import "../styles/CvAction.css"
import { FiPrinter } from "react-icons/fi"
import { BiEdit } from "react-icons/bi"

export default function CvAction({ handleEditClick, handleCvPrint }) {
  return (
    <div className="cv-action-container">
      <FiPrinter
        size="1.8em"
        data-cy="print-action-icon"
        className="icon"
        onClick={handleCvPrint}
      />
      <BiEdit
        size="1.8em"
        data-cy="edit-action-icon"
        className="icon"
        onClick={handleEditClick}
      />
    </div>
  )
}
