import React from 'react'
import { Link } from 'react-router-dom'
import generalStyles from '../styles/GeneralStyles.module.css'

const ExerciseSearch = ({ onSubmit }) => {
  return (
    <div className={generalStyles.generalCard}>
      <h1>Exercise Finder</h1>
      <Link to="/ExercisePersonalPlan">
        <button className={generalStyles.generalButton}>
          View Personal Plan
        </button>
      </Link>

      <form className={generalStyles.generalForm} onSubmit={onSubmit}>
        <input
          className={generalStyles.generalInput}
          type="text"
          id="name"
          placeholder="Write an exercise name..."
        />
        <select className={generalStyles.generalSelect} id="type">
          <option value="">Exercise Type...</option>
          <option value="cardio">Cardio</option>
          <option value="olympic_weightlifting">Olympic Weightlifting</option>
          <option value="plyometrics">Plyometrics</option>
          <option value="powerlifting">Powerlifting</option>
          <option value="strength">Strength</option>
          <option value="stretching">Stretching</option>
          <option value="strongman">Strongman</option>
        </select>

        <select className={generalStyles.generalSelect} id="muscle">
          <option value="">Target Muscle...</option>
          <option value="abdominals">Abdominals</option>
          <option value="abductors">Abductors</option>
          <option value="biceps">Biceps</option>
          <option value="calves">Calves</option>
          <option value="chest">Chest</option>
          <option value="forearms">Forearms</option>
          <option value="glutes">Glutes</option>
          <option value="hamstrings">Hamstrings</option>
          <option value="lats">Lats</option>
          <option value="lower_back">Lower Back</option>
          <option value="middle_back">Middle Back</option>
          <option value="neck">Neck</option>
          <option value="quadriceps">Quadriceps</option>
          <option value="traps">Traps</option>
          <option value="triceps">Triceps</option>
        </select>

        <select className={generalStyles.generalSelect} id="difficulty">
          <option value="">Difficulty Level...</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
        </select>

        <button className={generalStyles.generalButton} type="submit">
          Find Exercises
        </button>
      </form>
    </div>
  )
}

export default ExerciseSearch
