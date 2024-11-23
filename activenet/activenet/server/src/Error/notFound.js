import errorBase from './errorBase.js'

class notFound extends errorBase {
  constructor(message = 'Not found') {
    super(message, 404)
  }
}

export default notFound
