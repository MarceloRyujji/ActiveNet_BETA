import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

function mainPicture(app) {
  // Simulation of __dirname using import.meta.url e path
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  app.use('/public', express.static(path.join(__dirname, '../public')))
}

export default mainPicture
