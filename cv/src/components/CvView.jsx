import "../styles/CvView.css"
import Card from "./Card"
import HorizontalLine from "./HorizontalLine"

export default function CvView({ details }) {
  const {
    name,
    contactSummary,
    workExperiences,
    educationHistory,
    achievements,
  } = details
  return (
    <div data-cy="cv-container" className="cv-container">
      <div data-cy="cv-name" className="cv-name">
        {name}
      </div>
      <div data-cy="cv-contact-summary" className="cv-contact-summary">
        <p>{contactSummary}</p>
      </div>
      <HorizontalLine />
      <div data-cy="cv-work-experience" className="cv-work-experience">
        <p className="bold section-title">WORK EXPERIENCE</p>
        {workExperiences.map((e) => (
          <Card
            key={e.id}
            title={e.title}
            date={e.dateRange}
            body={e.description}
          />
        ))}
      </div>
      <HorizontalLine />
      <div data-cy="cv-education" className="cv-education">
        <p className="bold section-title">EDUCATION</p>
        {educationHistory.map((e) => (
          <Card
            key={e.id}
            title={e.title}
            date={e.dateRange}
            body={e.description}
          />
        ))}
      </div>
      <HorizontalLine />
      <div data-cy="cv-achievements" className="cv-achievements">
        <p className="bold section-title">ACHIEVEMENTS</p>
        {achievements.map((e) => (
          <Card
            key={e.id}
            title={e.title}
            date={e.dateRange}
            body={e.description}
          />
        ))}
      </div>
    </div>
  )
}
