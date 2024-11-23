import React from 'react'
import generalStyle from '../styles/GeneralStyles.module.css'
import ExerciseCard from './ExerciseCard'

const ExerciseResult = ({ exercises }) => {
  if (exercises.length === 0) {
    return null
  }
  return (
    <div className={generalStyle.generalCard}>
      <h2>Exercise Results</h2>
      <div className={generalStyle.cardsContainer}>
        {exercises.map((exercise, index) => (
          <ExerciseCard
            key={index}
            exercise={exercise}
            plan={''}
            showDropdownMenu={true}
            showDeleteButton={false}
          />
        ))}
      </div>
    </div>
  )
}

export default ExerciseResult
