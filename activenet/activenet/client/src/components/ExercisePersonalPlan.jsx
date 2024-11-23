import React, { useState } from 'react'
import GeneralStyle from '../styles/GeneralStyles.module.css'
import withAuthProtection from '../context/Authentication'
import UserPlans from './UserPlans'
import PlanExercises from './PlanExercises'

const ExercisePersonalPlan = () => {
  const [planSelected, setPlanSelected] = useState(null)
  const [selectedExercises, setSelectedExercises] = useState([])
  const [reload, setReload] = useState(false)

  const handlePlanSelect = (plan) => {
    setPlanSelected(plan.name)
    setSelectedExercises(plan.exercises)
  }

  return (
    <div className={GeneralStyle.generalClearDiv}>
      <UserPlans
        onPlanSelect={handlePlanSelect}
        reload={reload}
        setReload={setReload}
      />
      <PlanExercises
        selectedExercises={selectedExercises}
        planSelected={planSelected}
      />
    </div>
  )
}

export default withAuthProtection(ExercisePersonalPlan)
