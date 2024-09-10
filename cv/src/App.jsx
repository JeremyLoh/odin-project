import { useState } from "react"
import "./styles/App.css"
import CvAction from "./components/CvAction"
import CvView from "./components/CvView"
import Header from "./components/Header"
import {
  defaultWorkExperience,
  defaultEducationHistory,
  defaultAchievements,
} from "./model/Experience"
import CvEditForm from "./components/CvEditForm"

function App() {
  // TODO handle state switch between editing, printing, preview of CV
  const [isEditCvMode, setIsEditCvMode] = useState(false)
  const [cvDetails, setCvDetails] = useState({
    name: "YOUR NAME",
    contactSummary: "Role | Location | Phone Number | Email | URL",
    workExperiences: defaultWorkExperience,
    educationHistory: defaultEducationHistory,
    achievements: defaultAchievements,
  })
  function handleEditClick() {
    setIsEditCvMode(!isEditCvMode)
  }
  function handleCvSubmit(data) {
    setCvDetails({
      ...cvDetails,
      name: data.name,
      contactSummary: data.contactSummary,
      workExperiences: data.workExperiences,
      educationHistory: data.educationHistory,
      achievements: data.achievements,
    })
    setIsEditCvMode(false)
  }
  function handleCvPrint() {
    window.print()
  }
  return (
    <>
      <Header title="My CV" />
      <main className="cv">
        <CvAction
          handleEditClick={handleEditClick}
          handleCvPrint={handleCvPrint}
        />
        {isEditCvMode ? (
          <CvEditForm cvDetails={cvDetails} handleCvSubmit={handleCvSubmit} />
        ) : (
          <CvView details={cvDetails} />
        )}
      </main>
    </>
  )
}

export default App
