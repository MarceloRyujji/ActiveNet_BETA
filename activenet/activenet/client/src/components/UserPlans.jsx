import React, { useState, useEffect } from 'react'
import generalStyle from '../styles/GeneralStyles.module.css'
import { getUserPlans, createPlan, deletePlan } from '../services/planService'

const UserPlans = ({ onPlanSelect, reload, setReload }) => {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true)
        const fetchedPlans = await getUserPlans()
        setPlans(fetchedPlans)
        setError(null)
      } catch (err) {
        setError('Error loading plans')
      } finally {
        setLoading(false)
      }
    }

    fetchPlans()
  }, [reload])

  const createNewPlan = async (event) => {
    event.preventDefault()
    try {
      const planName = event.target.name.value.trim()
      if (!planName) {
        alert('Please enter a name for the plan')
        return
      }

      await createPlan(planName)
      setReload((prev) => !prev)
      event.target.reset()
      alert('Plan created successfully')
    } catch (error) {
      setError(
        error.message || 'Unknown error occurred while creating the plan'
      )
    }
  }

  const deletePlanHandler = async (planId) => {
    try {
      await deletePlan(planId)
      setReload((prev) => !prev)
      alert('Plan deleted successfully')
    } catch (error) {
      setError(
        error.message || 'Unknown error occurred while deleting the plan'
      )
    }
  }

  if (loading) return <p>Loading plans...</p>
  if (error) return <p>{error}</p>

  return (
    <div className={generalStyle.generalCard}>
      <h1>User Plans</h1>
      <form className={generalStyle.generalForm} onSubmit={createNewPlan}>
        <input
          className={generalStyle.generalInput}
          placeholder="Enter a new plan name"
          type="text"
          id="name"
        />
        <button className={generalStyle.generalSubmitButton} type="submit">
          Create
        </button>
      </form>

      <div>
        {plans.length > 0 ? (
          plans.map((plan) => (
            <div className={generalStyle.planButton} key={plan._id}>
              <button
                className={generalStyle.generalButton}
                onClick={() => onPlanSelect(plan)}
              >
                {plan.name}
              </button>
              <button
                className={generalStyle.generalDeleteButton}
                onClick={() => deletePlanHandler(plan._id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No plans available</p>
        )}
      </div>
    </div>
  )
}

export default UserPlans
