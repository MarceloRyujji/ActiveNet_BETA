import React, { useState } from 'react'
import { getOpenAiResponse } from '../services/OpenaiServiceAPI'
import DietSearch from './DietSearch'
import DietResult from './DietResult'
import withAuthProtection from '../context/Authentication'
import GeneralStyle from '../styles/GeneralStyles.module.css'

const DietFinder = () => {
  const [recipie, setRecipie] = useState([])
  const [error, setError] = useState(null)

  const handleSearch = async (prompt) => {
    setError(null)

    try {
      const data = await getOpenAiResponse({ prompt })
      setRecipie(data)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className={GeneralStyle.generalClearDiv}>
      <DietSearch onSubmit={handleSearch} />
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <DietResult props={recipie} />
    </div>
  )
}

export default withAuthProtection(DietFinder)
