import { useFieldArray, useForm } from "react-hook-form"
import "../styles/CvEditForm.css"
import Experience from "../model/Experience"
import CvEditAchievement from "./CvEditAchievement"
import CvEditEducation from "./CvEditEducation"

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
        <div
          className="edit-cv-work-experience-container"
          data-cy="edit-cv-work-experience-container"
        >
          <p className="section-title">Work Experience</p>
          {errors.workExperiences && errors.workExperiences.empty ? (
            <p className="error" data-cy="error-work-experience-empty">
              {errors.workExperiences.empty.message}
            </p>
          ) : null}
          {getWorkExperienceSection(workExperiencesFields, {
            errors,
            register,
            removeWorkExperience,
          })}
          <button
            type="button"
            onClick={() => {
              appendWorkExperience(new Experience("", "", ""))
              clearErrors("workExperiences.empty")
            }}
            className="add-work-experience-btn"
            data-cy="edit-cv-add-work-experience-btn"
          >
            + Add Work Experience
          </button>
        </div>
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
          achievementFields={achievementFields}
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

const workExperienceTitleValidation = {
  required: "Title is required",
  maxLength: {
    value: 100,
    message: "Work experience title cannot be more than 100 characters",
  },
}
const workExperienceDescriptionValidation = {
  required: "Description is required",
  maxLength: {
    value: 300,
    message: "Work experience description cannot be more than 300 characters",
  },
}

function getWorkExperienceSection(
  workExperiencesFields,
  { errors, register, removeWorkExperience }
) {
  const lastElementIndex = workExperiencesFields.length - 1
  return workExperiencesFields.map((field, index) => {
    return (
      <section key={field.id} className="work-experience-card">
        <label htmlFor={`workExperiences.${index}.title`}>Title</label>
        <input
          key={`${field.id}-${index}-title`}
          type="text"
          data-cy={`edit-cv-work-experience-${index}-title`}
          {...register(
            `workExperiences.${index}.title`,
            workExperienceTitleValidation
          )}
        />
        {errors.workExperiences &&
          errors.workExperiences[index] &&
          errors.workExperiences[index].title && (
            <span
              className="error"
              data-cy={`edit-work-experience-title-${index}-error`}
            >
              {errors.workExperiences[index].title.message}
            </span>
          )}

        <label htmlFor={`workExperiences.${index}.description`}>
          Description
        </label>
        <textarea
          key={`${field.id}-${index}-description`}
          data-cy={`edit-work-experience-${index}-description`}
          rows={5}
          {...register(
            `workExperiences.${index}.description`,
            workExperienceDescriptionValidation
          )}
        />
        {errors.workExperiences &&
          errors.workExperiences[index] &&
          errors.workExperiences[index].description && (
            <span
              className="error"
              data-cy={`edit-work-experience-description-${index}-error`}
            >
              {errors.workExperiences[index].description.message}
            </span>
          )}

        <label htmlFor={`workExperiences.${index}.dateRange`}>Date Range</label>
        <input
          key={`${field.id}-${index}-dateRange`}
          type="text"
          data-cy={`edit-work-experience-${index}-dateRange`}
          {...register(`workExperiences.${index}.dateRange`)}
        />
        <button
          type="button"
          onClick={() => removeWorkExperience(index)}
          className="edit-cv-work-experience-delete-btn"
          data-cy={`edit-cv-work-experience-${index}-delete-btn`}
        >
          Delete Work Experience
        </button>
        {index === lastElementIndex ? null : <hr className="divider" />}
      </section>
    )
  })
}
