import React from 'react'
import { Link } from 'react-router-dom'
import ExerciseCard from './ExerciseCard'
import GeneralStyle from '../styles/GeneralStyles.module.css'

const PlanExercises = ({ selectedExercises, planSelected }) => {
  if (!planSelected) return null

  if (planSelected && selectedExercises.length === 0) {
    return (
      <div className={GeneralStyle.generalCard}>
        <h2>{planSelected}</h2>
        <Link to="/ExerciseFinder">
          <button className={GeneralStyle.generalButton}>Add Exercise</button>
        </Link>
        <p style={{ color: 'white' }}>
          No exercises have been added to this plan.
        </p>
      </div>
    )
  }

  return (
    <div className={GeneralStyle.generalCard}>
      <h2>{planSelected}</h2>
      <Link to="/ExerciseFinder">
        <button className={GeneralStyle.generalButton}>Add Exercise</button>
      </Link>
      <div className={GeneralStyle.cardsContainer}>
        {selectedExercises.map((exercise, index) => (
          <ExerciseCard
            key={index}
            exercise={exercise}
            plan={planSelected}
            showDropdownMenu={false}
            showDeleteButton={true}
          />
        ))}
      </div>
    </div>
  )
}

export default PlanExercises
