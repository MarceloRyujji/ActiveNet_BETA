import dotenv from 'dotenv'
import OpenAI from 'openai'

dotenv.config()

const OPENAI_API_KEY = OPENAI_API_KEY
 

async function obtenerRespuesta(req, res) {
  const { prompt } = req.body
  const promptAsString = JSON.stringify(prompt) + ' '
  console.log(promptAsString)
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: promptAsString,
        },
      ],
      max_tokens: 500,
    })
    const respuesta = completion.choices[0].message.content
    console.log('IMPRIMO la respuesta de la api: ' + respuesta)
    res.json(respuesta)
  } catch (error) {
    console.error('Error en la solicitud:', error)
    res.status(500).json({ error: 'Error al obtener respuesta de OpenAI' })
  }
}

export default obtenerRespuesta
