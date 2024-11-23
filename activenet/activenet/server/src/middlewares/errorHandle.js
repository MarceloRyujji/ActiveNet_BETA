import mongoose from 'mongoose'
import errorBase from '../Error/errorBase.js'
import incorrectReq from '../Error/incorrectReq.js'
import validationError from '../Error/validatorError.js'

function errorHandle(err, req, res, next) {
  if (err instanceof mongoose.Error.CastError) {
    new incorrectReq().sendResponse(res)
  } else if (err instanceof mongoose.Error.ValidationError) {
    new validationError(err).sendResponse(res)
  } else if (err instanceof errorBase) {
    err.sendResponse(res)
  } else {
    new errorBase().sendResponse(res)
  }
}

export default errorHandle
