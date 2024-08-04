import "../styles/CvView.css"
import Card from "./Card"
import HorizontalLine from "./HorizontalLine"

export default function CvView() {
  return (
    <div data-cy="cv-container" className="cv-container">
      <div data-cy="cv-name" className="cv-name">
        YOUR NAME
      </div>
      <div data-cy="cv-contact-summary" className="cv-contact-summary">
        <p>Role | Location | Phone Number | Email | URL</p>
      </div>
      <HorizontalLine />
      <div data-cy="cv-work-experience" className="cv-work-experience">
        <p className="bold section-title">WORK EXPERIENCE</p>
        <Card
          title="Job Title - Company"
          date="Jan 2022 - Current"
          body="Key Responsibilities and Achievements. Value delivered to Company"
        />
      </div>
      <HorizontalLine />
      <div data-cy="cv-education" className="cv-education">
        <p className="bold section-title">EDUCATION</p>
        <Card
          title="School - Certification"
          date="Jan 2018 - Jan 2022"
          body="GPA - 5.0/5.0"
        />
      </div>
      <HorizontalLine />
      <div data-cy="cv-achievements" className="cv-achievements">
        <p className="bold section-title">ACHIEVEMENTS</p>
        <Card
          title="First Achievement"
          date="Jan 2016"
          body="Achievement Description"
        />
      </div>
    </div>
  )
}
