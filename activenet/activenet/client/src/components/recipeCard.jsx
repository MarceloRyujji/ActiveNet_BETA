import React from 'react'
import GeneralStyle from '../styles/GeneralStyles.module.css'

const RecipeCard = ({ props }) => {
  recipe = JSON.parse(props)
  // const data = { props }
  // const {
  //   name = 'Recipe Name Unavailable',
  //   ingredients = [],
  //   instructions = [],
  //   nutrition = {},
  // } = recipe

  return (
    <div>
      <div>
        <p>{props}</p>
      </div>
    </div>
  )
}

export default RecipeCard
