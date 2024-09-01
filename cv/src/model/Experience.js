import { nanoid } from "nanoid"

export default class Experience {
  constructor(title, description, dateRange) {
    this._id = nanoid()
    this._title = title
    this._description = description
    this._dateRange = dateRange
  }

  get id() {
    return this._id
  }

  get title() {
    return this._title
  }

  set title(value) {
    this._title = value
  }

  get dateRange() {
    return this._dateRange
  }

  set dateRange(value) {
    this._dateRange = value
  }

  get description() {
    return this._description
  }

  set description(value) {
    this._description = value
  }
}

export const defaultWorkExperience = [
  new Experience(
    "Job Title - Company",
    "Key Responsibilities and Achievements. Value delivered to Company",
    "Jan 2022 - Current"
  ),
]

export const defaultEducationHistory = [
  new Experience(
    "School - Certification",
    "GPA - 5.0/5.0",
    "Jan 2018 - Jan 2022"
  ),
]

export const defaultAchievements = [
  new Experience("First Achievement", "Achievement Description", "Jan 2016"),
]
