import express from 'express';
import trainerController from '../controllers/trainersController.js';
import pagination from '../middlewares/pagination.js';

const routes = express.Router();

routes.get('/trainers/filter', trainerController.ListOnlyTrainers, pagination); 

export default routes;
