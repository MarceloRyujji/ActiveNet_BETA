import axios from 'axios'

export const getOpenAiResponse = async (prompt) => {
  const apiUrl = 'http://localhost:3001/api/openAi'

  try {
    const response = await axios.post(apiUrl, prompt, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
      timeout: 5000,
    })

    return response.data
  } catch (error) {
    const errorMessage =
      error.response?.data ||
      error.message ||
      'Unknown error occurred while fetching response.'
    throw new Error(errorMessage)
  }
}
