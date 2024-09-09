export default function CvEditAchievement({
  achievementFields,
  formFunctions,
}) {
  const { register, errors, handleAddAchievement } = formFunctions
  return (
    <div
      className="edit-cv-achievement-container"
      data-cy="edit-cv-achievement-container"
    >
      <p className="section-title">Achievements</p>
      {getAchievementSection(achievementFields, { register, errors })}
      <button
        type="button"
        onClick={handleAddAchievement}
        className="edit-cv-add-achievement-btn"
        data-cy="edit-cv-add-achievement-btn"
      >
        + Add Achievement
      </button>
    </div>
  )
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
