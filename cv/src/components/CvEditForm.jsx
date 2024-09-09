import { useFieldArray, useForm } from "react-hook-form"
import "../styles/CvEditForm.css"
import Experience from "../model/Experience"

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
        <div
          className="edit-cv-education-container"
          data-cy="edit-cv-education-container"
        >
          <p className="section-title">Education</p>
          {errors.educationHistory && errors.educationHistory.empty ? (
            <p className="error" data-cy="error-education-history-empty">
              {errors.educationHistory.empty.message}
            </p>
          ) : null}
          {getEducationSection(educationFields, {
            errors,
            register,
            removeEducationHistory,
          })}
          <button
            type="button"
            onClick={() => {
              appendEducationHistory(new Experience("", "", ""))
              clearErrors("educationHistory.empty")
            }}
            className="edit-cv-add-education-history-btn"
            data-cy="edit-cv-add-education-history-btn"
          >
            + Add Education History
          </button>
        </div>
        <div
          className="edit-cv-achievement-container"
          data-cy="edit-cv-achievement-container"
        >
          <p className="section-title">Achievements</p>
          {getAchievementSection(achievementFields, { register, errors })}
          <button
            type="button"
            onClick={() => {
              appendAchievement(new Experience("", "", ""))
            }}
            className="edit-cv-add-achievement-btn"
            data-cy="edit-cv-add-achievement-btn"
          >
            + Add Achievement
          </button>
        </div>
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

const educationTitleValidation = {
  required: "Education Title is required",
  maxLength: {
    value: 150,
    message: "Education Title cannot exceed 150 characters",
  },
}
const educationDescriptionValidation = {
  maxLength: {
    value: 300,
    message: "Education Description cannot exceed 300 characters",
  },
}
const educationDateRangeValidation = {
  required: "Education Date Range is required",
  maxLength: {
    value: 50,
    message: "Education Date Range cannot exceed 50 characters",
  },
}

function getEducationSection(
  educationFields,
  { errors, register, removeEducationHistory }
) {
  const lastElementIndex = educationFields.length - 1
  return educationFields.map((field, index) => {
    return (
      <section key={field.id} className="education-history-card">
        <label htmlFor={`educationHistory.${index}.title`}>
          Education Title
        </label>
        <input
          key={`${field.id}-${index}-education-title`}
          type="text"
          data-cy={`edit-cv-education-${index}-title`}
          {...register(
            `educationHistory.${index}.title`,
            educationTitleValidation
          )}
        />
        {errors.educationHistory &&
          errors.educationHistory[index] &&
          errors.educationHistory[index].title && (
            <span
              className="error"
              data-cy={`edit-education-history-title-${index}-error`}
            >
              {errors.educationHistory[index].title.message}
            </span>
          )}
        <label htmlFor={`educationHistory.${index}.description`}>
          Education Description
        </label>
        <textarea
          key={`${field.id}-${index}-education-description`}
          rows={5}
          data-cy={`edit-cv-education-${index}-description`}
          {...register(
            `educationHistory.${index}.description`,
            educationDescriptionValidation
          )}
        />
        {errors.educationHistory &&
          errors.educationHistory[index] &&
          errors.educationHistory[index].description && (
            <span
              className="error"
              data-cy={`edit-education-history-description-${index}-error`}
            >
              {errors.educationHistory[index].description.message}
            </span>
          )}
        <label htmlFor={`educationHistory.${index}.dateRange`}>
          Education Date Range
        </label>
        <input
          key={`${field.id}-${index}-education-dateRange`}
          type="text"
          data-cy={`edit-cv-education-${index}-dateRange`}
          {...register(
            `educationHistory.${index}.dateRange`,
            educationDateRangeValidation
          )}
        />
        {errors.educationHistory &&
          errors.educationHistory[index] &&
          errors.educationHistory[index].dateRange && (
            <span
              className="error"
              data-cy={`edit-education-history-dateRange-${index}-error`}
            >
              {errors.educationHistory[index].dateRange.message}
            </span>
          )}
        <button
          type="button"
          onClick={() => removeEducationHistory(index)}
          className="edit-cv-education-history-delete-btn"
          data-cy={`edit-cv-education-history-${index}-delete-btn`}
        >
          Delete Education History
        </button>
        {index === lastElementIndex ? null : <hr className="divider" />}
      </section>
    )
  })
}

const achievementTitleValidation = {
  required: "Achievement Title is required",
  maxLength: {
    value: 100,
    message: "Achievement Title must not be more than 100 characters",
  },
}

const achievementDescriptionValidation = {
  required: "Achievement Description is required",
  maxLength: {
    value: 300,
    message: "Achievement Description must not be more than 300 characters",
  },
}

const achievementDateRangeValidation = {
  required: "Achievement Date Range is required",
  maxLength: {
    value: 50,
    message: "Achievement Date Range must not be more than 50 characters",
  },
}

function getAchievementSection(achievementFields, { register, errors }) {
  const lastElementIndex = achievementFields.length - 1
  return achievementFields.map((field, index) => {
    return (
      <section key={field.id} className="achievement-card">
        <label htmlFor={`achievements.${index}.title`}>Achievement Title</label>
        <input
          {...register(
            `achievements.${index}.title`,
            achievementTitleValidation
          )}
          type="text"
          data-cy={`edit-cv-achievement-${index}-title`}
        />
        {errors.achievements &&
          errors.achievements[index] &&
          errors.achievements[index].title && (
            <span
              className="error"
              data-cy={`edit-cv-achievement-title-${index}-error`}
            >
              {errors.achievements[index].title.message}
            </span>
          )}
        <label htmlFor={`achievements.${index}.description`}>
          Achievement Description
        </label>
        <textarea
          {...register(
            `achievements.${index}.description`,
            achievementDescriptionValidation
          )}
          rows={5}
          data-cy={`edit-cv-achievement-${index}-description`}
        />
        {errors.achievements &&
          errors.achievements[index] &&
          errors.achievements[index].description && (
            <span
              className="error"
              data-cy={`edit-cv-achievement-description-${index}-error`}
            >
              {errors.achievements[index].description.message}
            </span>
          )}
        <label htmlFor={`achievements.${index}.dateRange`}>
          Achievement Date Range
        </label>
        <input
          {...register(
            `achievements.${index}.dateRange`,
            achievementDateRangeValidation
          )}
          type="text"
          data-cy={`edit-cv-achievement-${index}-dateRange`}
        />
        {errors.achievements &&
          errors.achievements[index] &&
          errors.achievements[index].dateRange && (
            <span
              className="error"
              data-cy={`edit-cv-achievement-dateRange-${index}-error`}
            >
              {errors.achievements[index].dateRange.message}
            </span>
          )}
        {index === lastElementIndex ? null : <hr className="divider" />}
      </section>
    )
  })
}
