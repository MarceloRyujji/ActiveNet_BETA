import React from 'react';

const TrainerResult = ({ trainers }) => {
  if (!trainers || trainers.length === 0) {
    return <p>No trainers found.</p>;
  }

  return (
    <ul>
      {trainers.map((trainer, index) => (
        <li key={index}>
          <h3>{trainer.firstName} {trainer.lastName || 'No Name Provided'}</h3>
          <p>Specialization: {trainer.specialties || 'N/A'}</p>
          <p>Email: {trainer.email || 'N/A'}</p>
          <p>City: {trainer.city || 'N/A'}</p>
          <p>Available Hours: {trainer.availableHours || 'N/A'}</p>
          <p>Biography: {trainer.biography || 'No biography available'}</p>
        </li>
      ))}
    </ul>
  );
};

export default TrainerResult;
