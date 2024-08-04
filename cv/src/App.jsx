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

function App() {
  // TODO handle state switch between editing, printing, preview of CV
  const [cvDetails, setCvDetails] = useState({
    name: "YOUR NAME",
    contactSummary: "Role | Location | Phone Number | Email | URL",
    workExperiences: defaultWorkExperience,
    educationHistory: defaultEducationHistory,
    achievements: defaultAchievements,
  })
  return (
    <>
      <Header title="My CV" />
      <main className="cv">
        <CvAction />
        <CvView details={cvDetails} />
      </main>
    </>
  )
}

export default App
