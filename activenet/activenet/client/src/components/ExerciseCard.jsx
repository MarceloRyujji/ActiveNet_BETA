import React, { useState } from 'react'
import styles from '../styles/ExerciseCard.module.css'
import DropdownMenu from './DropdownListMenu'
import generalStyle from '../styles/GeneralStyles.module.css'
import { deleteExercise } from '../services/planService'

const ExerciseCard = ({
  exercise,
  plan,
  showDropdownMenu,
  showDeleteButton,
}) => {
  const [error, setError] = useState(null)
  const [expandedDescription, setExpandedDescription] = useState(false)
  const MAX_DESCRIPTION_LENG = 300
  const deleteExerciseHandler = async (exercise, plan) => {
    try {
      await deleteExercise(exercise, plan)
      alert('Exercise successfully deleted')
    } catch (error) {
      setError(
        error.message || 'Unknown error occurred while deleting the exercise'
      )
    }
  }
  const tonggleDescription = (id) => {
    setExpandedDescription((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }
  return (
    <div className={styles.card}>
      <h3>{exercise.name}</h3>
      <p>Type: {exercise.type}</p>
      <p>Muscle: {exercise.muscle}</p>
      <p>Equipment: {exercise.equipment}</p>
      <p>Difficulty: {exercise.difficulty}</p>
      <p>
        Instructions:{' '}
        {exercise.instructions &&
        exercise.instructions.length > MAX_DESCRIPTION_LENG &&
        !expandedDescription[exercise.instructions]
          ? exercise.instructions.slice(0, MAX_DESCRIPTION_LENG) + '...'
          : exercise.instructions}{' '}
        {exercise.instructions &&
          exercise.instructions.length > MAX_DESCRIPTION_LENG && (
            <span onClick={() => tonggleDescription(exercise.instructions)}>
              {expandedDescription[exercise.instructions]
                ? 'Show less'
                : 'Show more'}
            </span>
          )}
      </p>

      {showDropdownMenu && <DropdownMenu exercise={exercise} />}
      {showDeleteButton && (
        <button
          className={generalStyle.generalDeleteButton}
          onClick={() => deleteExerciseHandler(exercise.name, plan)}
        >
          Delete Exercise
        </button>
      )}
    </div>
  )
}

export default ExerciseCard
