import axios from 'axios'

export const fetchExercises = async (params) => {
  const apiUrl = 'http://localhost:3001/api/exercises'
  try {
    const response = await axios.get(apiUrl, { params })
    return response.data
  } catch (error) {
    throw new Error('Error fetching exercises')
  }
}
