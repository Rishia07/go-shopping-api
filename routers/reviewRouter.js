const express = require('express');
const authenticateToken = require('../middlewares/AuthenticateToken');

const {
  createReview,
  getAllReviews,
  getOneReview, 
  updateReview,
  deleteOneReview, 
  deleteAllReviews,
} = require('../controllers/reviewController');

const router = express.Router();

router.get('/', getAllReviews); 

router.use(authenticateToken);

router.post('/', createReview);
router.get('/:id', getOneReview); 
router.put('/:id', updateReview);
router.delete('/:id', deleteOneReview);
router.delete('/', deleteAllReviews);

module.exports = router;
