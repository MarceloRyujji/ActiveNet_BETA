import incorrectReq from '../Error/incorrectReq.js'

async function pagination(req, res, next) {
  try {
    let { limit = 10, page = 1, ordernation = 'name:1' } = req.query
    const [orderCamp, order] = ordernation.split(':')
    limit = parseInt(limit)
    page = parseInt(page)
    order = parseInt(order)

    const result = req.result

    if (limit > 0 && page > 0) {
      const pageResult = await result
        .find()
        .sort({ [orderCamp]: order })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec()
      res.status(200).json(pageResult)
    } else {
      next(new incorrectReq())
    }
  } catch (err) {
    next(err)
  }
}

export default pagination
