import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import generalStyles from '../styles/GeneralStyles.module.css';

const TrainerSearch = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(prompt);
  };

  return (
    <div className={generalStyles.generalCard}>
      <h1>Trainer Finder</h1>
      <Link to="#">
        <button className={generalStyles.generalButton}>
          Find a Personal Trainer for you!
        </button>
      </Link>

      <form className={generalStyles.generalForm} onSubmit={handleSubmit}>
        {/* <input
          className={generalStyles.generalInput}
          type="text"
          id="trainerPrompt"
          placeholder="Describe your needs"
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
        /> */}
        <button className={generalStyles.generalButton} type="submit">
          Search Trainers
        </button>
      </form>
    </div>
  );
};

export default TrainerSearch;
