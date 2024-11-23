import notFound from '../Error/notFound.js'

function handle404(req, res, next) {
  const error404 = new notFound()
  next(error404)
}

export default handle404
