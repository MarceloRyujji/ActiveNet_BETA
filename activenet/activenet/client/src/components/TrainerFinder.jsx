import React, { useState } from 'react';
import { fetchTrainers } from '../services/TrainerServiceAPI.js'; 
import TrainerSearch from './TrainerSearch';
import TrainerResult from './TrainerResult';
import withAuthProtection from '../context/Authentication';
import GeneralStyle from '../styles/GeneralStyles.module.css';

const TrainerFinder = () => {
  const [trainers, setTrainers] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (prompt) => {
    setError(null);

    try {
      const data = await fetchTrainers(prompt); 
      setTrainers(data || []); 
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={GeneralStyle.generalClearDiv}>
      <TrainerSearch onSubmit={handleSearch} />
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <TrainerResult trainers={trainers} />
    </div>
  );
};

export default withAuthProtection(TrainerFinder);
