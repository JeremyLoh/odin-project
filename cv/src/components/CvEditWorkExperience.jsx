import HorizontalLine from "./HorizontalLine"

export default function CvEditWorkExperience({ fields, formFunctions }) {
  const { register, errors, removeWorkExperience, handleAddWorkExperience } =
    formFunctions
  return (
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
      {getWorkExperienceSection(fields, {
        errors,
        register,
        removeWorkExperience,
      })}
      <button
        type="button"
        onClick={handleAddWorkExperience}
        className="edit-cv-add-work-experience-btn"
        data-cy="edit-cv-add-work-experience-btn"
      >
        Add Work Experience
      </button>
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
  fields,
  { errors, register, removeWorkExperience }
) {
  const lastElementIndex = fields.length - 1
  return fields.map((field, index) => {
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
        {index === lastElementIndex ? null : <HorizontalLine />}
      </section>
    )
  })
}
