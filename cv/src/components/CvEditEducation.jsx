import HorizontalLine from "./HorizontalLine"

export default function CvEditEducation({ fields, formFunctions }) {
  const {
    errors,
    register,
    removeEducationHistory,
    handleAddEducationHistory,
  } = formFunctions
  return (
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
      {getEducationSection(fields, {
        errors,
        register,
        removeEducationHistory,
      })}
      <button
        type="button"
        onClick={handleAddEducationHistory}
        className="edit-cv-add-education-history-btn"
        data-cy="edit-cv-add-education-history-btn"
      >
        Add Education History
      </button>
    </div>
  )
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
  fields,
  { errors, register, removeEducationHistory }
) {
  const lastElementIndex = fields.length - 1
  return fields.map((field, index) => {
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
        {index === lastElementIndex ? null : <HorizontalLine />}
      </section>
    )
  })
}
