const express = require('express');
const authenticateToken = require('../middlewares/AuthenticateToken');

const {
  createAdvertisement,
  getAllAdvertisements,
  getOneAdvertisement, 
  updateAdvertisement,
  deleteOneAdvertisement, 
  deleteAllAdvertisements,
} = require('../controllers/advertisementController');

const router = express.Router();

router.get('/', getAllAdvertisements); 
router.get('/:id', getOneAdvertisement); 

router.use(authenticateToken);
router.post('/', createAdvertisement);

router.put('/:id', updateAdvertisement);
router.delete('/:id', deleteOneAdvertisement);
router.delete('/', deleteAllAdvertisements);

module.exports = router;
