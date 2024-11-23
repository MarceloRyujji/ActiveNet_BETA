import React, { useState } from 'react'
import styles from '../styles/ExerciseResult.module.css'
import generalStyle from '../styles/GeneralStyles.module.css'
import RecipeCard from './recipeCard'

function DietResult(recipe) {
  // if (recipie.length === 0) {
  //   return null
  // }
  console.log('IMPRIMO EL JSON recibido DietResult: ' + JSON.stringify(recipe))

  return (
    <div className={generalStyle.generalCard}>
      <h2>Recipe found</h2>
      <div className={styles.cardsContainer}>
        <RecipeCard props={recipe} />
      </div>
    </div>
  )
}

export default DietResult
