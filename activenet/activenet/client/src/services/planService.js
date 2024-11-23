import axios from 'axios'

const URL_CONNECTION = 'http://localhost:3001/db/exercisesPlan'

export const createPlan = async (name) => {
  try {
    const response = await axios.post(
      URL_CONNECTION,
      { name },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }
    )
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error creating the plan')
  }
}

export const getUserPlans = async () => {
  try {
    const response = await axios.get(URL_CONNECTION, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    })
    return response.data.plans
  } catch (error) {
    return []
  }
}

export const updateUserPlan = async (exercise, plan) => {
  try {
    const response = await axios.put(
      URL_CONNECTION,
      {
        planId: plan._id,
        exercise: exercise,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )

    if (response.status === 200) {
      return 'Exercise added successfully'
    }
  } catch (error) {
    throw new Error('Error adding the exercise to the plan')
  }
}

export const deletePlan = async (planId) => {
  try {
    await axios.delete(URL_CONNECTION, {
      data: { planId },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    })
  } catch (error) {
    throw new Error('Unknown error while deleting the plan')
  }
}

export const deleteExercise = async (exerciseName, planName) => {
  try {
    await axios.delete('http://localhost:3001/db/exercises', {
      data: { exerciseName, planName },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    })
  } catch (error) {
    throw new Error('Unknown error while deleting the exercise')
  }
}
