import express from 'express'
import userController from '../controllers/regularUserController.js'
import pagination from '../middlewares/pagination.js'

const routes = express.Router()

routes.get('/users', userController.ListUser, pagination)
routes.get('/users/:id', userController.ListUserById)
routes.post('/users', userController.RegisterUser)
routes.put('/users/:id', userController.updateUser)
routes.delete('/users/:id', userController.deleteUser)

export default routes
