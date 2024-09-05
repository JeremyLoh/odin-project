import { useFieldArray, useForm } from "react-hook-form"
import "../styles/CvEditForm.css"
import Experience from "../model/Experience"

export default function CvEditForm({ cvDetails, handleCvSubmit }) {
  const {
    register,
    handleSubmit,
    control,
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
    },
  })
  const { fields: workExperiencesFields } = useFieldArray({
    control,
    name: "workExperiences",
  })
  const { fields: educationFields } = useFieldArray({
    control,
    name: "educationHistory",
  })

  function onSubmit(data) {
    handleCvSubmit(data)
  }

  return (
    <div className="edit-cv-form-container" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="edit-cv-title">Edit CV</h2>
      <form data-cy="edit-cv-form">
        <label htmlFor="name">Name</label>
        <input
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must have at least 2 characters",
            },
            maxLength: {
              value: 70,
              message: "Name must not be more than 70 characters",
            },
          })}
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
          {...register("contactSummary", {
            maxLength: {
              value: 150,
              message: "Contact Summary must not be more than 150 characters",
            },
          })}
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
          <p>Work Experience</p>
          {getWorkExperienceSection(workExperiencesFields, errors, register)}
        </div>
        <div data-cy="edit-cv-education-container">
          {getEducationSection(educationFields, errors, register)}
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

function getWorkExperienceSection(workExperiencesFields, errors, register) {
  return workExperiencesFields.map((field, index) => {
    return (
      <section key={field.id} className="work-experience-card">
        <label htmlFor={`workExperiences.${index}.title`}>Title</label>
        <input
          key={`${field.id}-${index}-title`}
          type="text"
          data-cy={`${index}-title`}
          {...register(`workExperiences.${index}.title`, {
            required: "Title is required",
            maxLength: {
              value: 100,
              message:
                "Work experience title cannot be more than 100 characters",
            },
          })}
        />
        {errors.workExperiences && errors.workExperiences[index].title && (
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
          data-cy={`${index}-description`}
          rows={5}
          {...register(`workExperiences.${index}.description`, {
            required: "Description is required",
            maxLength: {
              value: 300,
              message:
                "Work experience description cannot be more than 300 characters",
            },
          })}
        />
        {errors.workExperiences &&
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
          data-cy={`${index}-dateRange`}
          {...register(`workExperiences.${index}.dateRange`)}
        />
      </section>
    )
  })
}

function getEducationSection(educationFields, errors, register) {
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
          {...register(`educationHistory.${index}.title`, {
            required: "Education Title is required",
            maxLength: {
              value: 150,
              message: "Education Title cannot exceed 150 characters",
            },
          })}
        />
        {errors.educationHistory && errors.educationHistory[index].title && (
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
          {...register(`educationHistory.${index}.description`, {
            maxLength: {
              value: 300,
              message: "Education Description cannot exceed 300 characters",
            },
          })}
        />
        {errors.educationHistory &&
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
          {...register(`educationHistory.${index}.dateRange`, {
            required: "Education Date Range is required",
            maxLength: {
              value: 50,
              message: "Education Date Range cannot exceed 50 characters",
            },
          })}
        />
        {errors.educationHistory &&
          errors.educationHistory[index].dateRange && (
            <span
              className="error"
              data-cy={`edit-education-history-dateRange-${index}-error`}
            >
              {errors.educationHistory[index].dateRange.message}
            </span>
          )}
      </section>
    )
  })
}
