import { nanoid } from "nanoid"

export default class Experience {
  constructor(title, organization, description, startDate, endDate) {
    this._id = nanoid()
    this._title = title
    this._organization = organization
    this._description = description
    this._startDate = startDate
    this._endDate = endDate
  }

  get id() {
    return this._id
  }

  get title() {
    if (this._organization == "") {
      return `${this._title}`
    }
    return `${this._title} - ${this._organization}`
  }

  get dateRange() {
    if (this._endDate == null || this._endDate == "") {
      return `${this._startDate}`
    }
    return `${this._startDate} - ${this._endDate}`
  }

  get description() {
    return this._description
  }
}

export const defaultWorkExperience = [
  new Experience(
    "Job Title",
    "Company",
    "Key Responsibilities and Achievements. Value delivered to Company",
    "Jan 2022",
    "Current"
  ),
]

export const defaultEducationHistory = [
  new Experience(
    "School",
    "Certification",
    "GPA - 5.0/5.0",
    "Jan 2018",
    "Jan 2022"
  ),
]

export const defaultAchievements = [
  new Experience(
    "First Achievement",
    "",
    "Achievement Description",
    "Jan 2016",
    ""
  ),
]
