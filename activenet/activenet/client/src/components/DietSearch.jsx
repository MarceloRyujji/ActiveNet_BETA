import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import generalStyles from '../styles/GeneralStyles.module.css'

const DietSearch = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(prompt)
  }

  return (
    <div className={generalStyles.generalCard}>
      <h1>Diet Finder</h1>
      <Link to="#">
        <button className={generalStyles.generalButton}>
          View Personal Diet
        </button>
      </Link>

      <form className={generalStyles.generalForm} onSubmit={handleSubmit}>
        <input
          className={generalStyles.generalInput}
          type="text"
          id="myPrompt"
          placeholder="Write the prompt"
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
        />

        <button className={generalStyles.generalButton} type="submit">
          Find in OpenAI
        </button>
      </form>
    </div>
  )
}

export default DietSearch
