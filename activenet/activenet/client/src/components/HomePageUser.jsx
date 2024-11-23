import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/HomePage.module.css'
import withAuthProtection from '../context/Authentication'
import generalStyle from '../styles/GeneralStyles.module.css'
function HomePageUser() {
  const navigate = useNavigate()

  return (
    <div className={generalStyle.generalCard}>
      <h1>Welcome to ActiveNet</h1>
      <div className={styles.buttonGrid}>
        <button
          onClick={() => navigate('/ExerciseFinder')}
          className={styles.gridButton}
        >
          Find an Exercise
        </button>
        <button
          onClick={() => navigate('/DietFinder')}
          className={styles.gridButton}
        >
          Find a Diet
        </button>
        <button
          onClick={() => navigate('/TrainerFinder')}
          className={styles.gridButton}
        >
          Find a Trainer
        </button>
        {/* <button
          onClick={() => navigate('/eventFinder')}
          className={styles.gridButton}
        >
          Find an Event
        </button> */}
        <button
          onClick={() => navigate('/EventCreator')}
          className={styles.gridButton}
        >
          Events
        </button>
      </div>
    </div>
  )
}

export default withAuthProtection(HomePageUser)
