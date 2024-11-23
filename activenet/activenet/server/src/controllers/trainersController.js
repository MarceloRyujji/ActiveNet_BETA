import notFound from '../Error/notFound.js';
import { users } from '../models/signUp.js';

class trainerController {
  static async ListOnlyTrainers(req, res, next) {
    try {
      const { specialty } = req.query;
      const searchCriteria = {
        accountType: { $regex: 'trainer', $options: 'i' },
      };

      if (specialty) {
        searchCriteria.specialties = { $regex: new RegExp(specialty, 'i') }; 
        console.log('Search Criteria:', searchCriteria);
      }

      const trainers = await users.find(searchCriteria);
      if (trainers.length > 0) {
        res.status(200).json(trainers);
      } else {
        next(new notFound('No trainers found with the specified criteria.'));
      }
    } catch (err) {
      console.error('Error:', err);
      next(err);
    }
  }
}

export default trainerController;
