import errorBase from './errorBase.js'

class incorrectReq extends errorBase {
  constructor(message) {
    super(message, 400)
  }
}

export default incorrectReq
