import React, { useState } from 'react'
import { fetchExercises } from '../services/ExerciseAPI'
import ExerciseSearch from './ExerciseSearch'
import ExerciseResult from './ExerciseResult'
import GeneralStyle from '../styles/GeneralStyles.module.css'
import withAuthProtection from '../context/Authentication'

const ExerciseFinder = () => {
  const [exercises, setExercises] = useState([])
  const [error, setError] = useState(null)

  const handleSearch = async (event) => {
    event.preventDefault()
    setError(null)

    const name = event.target.name.value
    const type = event.target.type.value
    const muscle = event.target.muscle.value
    const difficulty = event.target.difficulty.value

    try {
      const data = await fetchExercises({ name, type, muscle, difficulty })
      setExercises(data)
    } catch (error) {
      setError('Error fetching exercises: ' + error.message)
    }
  }

  return (
    <div className={GeneralStyle.generalClearDiv}>
      <ExerciseSearch onSubmit={handleSearch} />
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <ExerciseResult exercises={exercises} />
    </div>
  )
}

export default withAuthProtection(ExerciseFinder)
