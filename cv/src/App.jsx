import CvView from "./components/CvView"
import Header from "./components/Header"
import "./styles/App.css"

function App() {
  // TODO handle state switch between editing, printing, preview of CV
  return (
    <>
      <Header title="My CV" />
      <CvView />
    </>
  )
}

export default App
