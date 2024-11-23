import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/HomePage.module.css'
import withAuthProtection from '../context/Authentication'
import generalStyle from '../styles/GeneralStyles.module.css'
function HomePageTrainer() {
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
          onClick={() => navigate('/TrainerPost')}
          className={styles.gridButton}
        >
          Post your trainer services
        </button>
        <button
          onClick={() => navigate('/eventFinder')}
          className={styles.gridButton}
        >
          Find an Event
        </button>
      </div>
    </div>
  )
}

export default withAuthProtection(HomePageTrainer)
