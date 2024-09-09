import { useFieldArray, useForm } from "react-hook-form"
import "../styles/CvEditForm.css"
import Experience from "../model/Experience"
import CvEditAchievement from "./CvEditAchievement"
import CvEditEducation from "./CvEditEducation"
import CvEditWorkExperience from "./CvEditWorkExperience"

const nameValidation = {
  required: "Name is required",
  minLength: {
    value: 2,
    message: "Name must have at least 2 characters",
  },
  maxLength: {
    value: 70,
    message: "Name must not be more than 70 characters",
  },
}

const contactSummaryValidation = {
  maxLength: {
    value: 150,
    message: "Contact Summary must not be more than 150 characters",
  },
}

export default function CvEditForm({ cvDetails, handleCvSubmit }) {
  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: cvDetails.name,
      contactSummary: cvDetails.contactSummary,
      workExperiences: cvDetails.workExperiences.map(
        (exp) => new Experience(exp.title, exp.description, exp.dateRange)
      ),
      educationHistory: cvDetails.educationHistory.map(
        (exp) => new Experience(exp.title, exp.description, exp.dateRange)
      ),
      achievements: cvDetails.achievements.map(
        (exp) => new Experience(exp.title, exp.description, exp.dateRange)
      ),
    },
  })
  const {
    fields: workExperiencesFields,
    append: appendWorkExperience,
    remove: removeWorkExperience,
  } = useFieldArray({
    control,
    name: "workExperiences",
  })
  const {
    fields: educationFields,
    append: appendEducationHistory,
    remove: removeEducationHistory,
  } = useFieldArray({
    control,
    name: "educationHistory",
  })
  const { fields: achievementFields, append: appendAchievement } =
    useFieldArray({
      control,
      name: "achievements",
    })

  function onSubmit(data) {
    if (data.workExperiences.length === 0) {
      setError("workExperiences.empty", {
        type: "custom",
        message: "Work Experience section cannot be empty",
      })
      return
    }
    if (data.educationHistory.length === 0) {
      setError("educationHistory.empty", {
        type: "custom",
        message: "Education History section cannot be empty",
      })
      return
    }
    clearErrors("workExperiences.empty")
    clearErrors("educationHistory.empty")
    handleCvSubmit(data)
  }

  return (
    <div className="edit-cv-form-container" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="edit-cv-title">Edit CV</h2>
      <form data-cy="edit-cv-form">
        <label htmlFor="name">Name</label>
        <input
          {...register("name", nameValidation)}
          name="name"
          id="name"
          type="text"
          placeholder="your name"
          data-cy="edit-cv-name"
        />
        {errors.name && (
          <span data-cy="edit-cv-name-error" className="error">
            {errors.name.message}
          </span>
        )}
        <label htmlFor="contactSummary">Contact Summary</label>
        <input
          {...register("contactSummary", contactSummaryValidation)}
          name="contactSummary"
          id="contactSummary"
          type="text"
          placeholder="your contact summary"
          data-cy="edit-cv-contact-summary"
        />
        {errors.contactSummary && (
          <span className="error" data-cy="edit-cv-contact-summary-error">
            {errors.contactSummary.message}
          </span>
        )}
        <CvEditWorkExperience
          fields={workExperiencesFields}
          formFunctions={{
            register,
            errors,
            removeWorkExperience,
            handleAddWorkExperience: () => {
              appendWorkExperience(new Experience("", "", ""))
              clearErrors("workExperiences.empty")
            },
          }}
        />
        <CvEditEducation
          fields={educationFields}
          formFunctions={{
            register,
            errors,
            removeEducationHistory,
            handleAddEducationHistory: () => {
              appendEducationHistory(new Experience("", "", ""))
              clearErrors("educationHistory.empty")
            },
          }}
        />
        <CvEditAchievement
          fields={achievementFields}
          formFunctions={{
            register,
            errors,
            handleAddAchievement: () => {
              appendAchievement(new Experience("", "", ""))
            },
          }}
        />
        <button
          type="submit"
          className="edit-cv-form-submit-btn"
          data-cy="edit-cv-form-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  )
}
