const express = require('express');
const authenticateToken = require('../middlewares/AuthenticateToken');

const {
  createRating,
  getAllRatings,
  getOneRating, 
  updateRating,
  deleteOneRating, 
  deleteAllRatings,
} = require('../controllers/ratingController');

const router = express.Router();

router.get('/', getAllRatings); 

router.use(authenticateToken);

router.post('/', createRating);
router.get('/:id', getOneRating); 
router.put('/:id', updateRating);
router.delete('/:id', deleteOneRating);
router.delete('/', deleteAllRatings);

module.exports = router;
