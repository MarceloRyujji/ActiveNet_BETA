import incorrectReq from './incorrectReq.js'

class validationError extends incorrectReq {
  constructor(err) {
    const errorMessage = Object.values(err.errors)
      .map((err) => err.message)
      .join('; ')
    super(`The following error(s) happened: ${errorMessage}`)
  }
}

export default validationError
