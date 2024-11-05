const express = require('express');
const authenticateToken = require('../middlewares/AuthenticateToken');

const {
  addRating,
  createProduct,
  getAllProducts,
  getOneProduct, 
  updateProduct,
  deleteOneProduct, 
  deleteAllProducts,
} = require('../controllers/productController');

const router = express.Router();

router.get('/', getAllProducts); 
router.get('/:id', getOneProduct); 

router.use(authenticateToken);
router.post('/', createProduct);

router.post('/rate/:id', addRating);
router.put('/:id', updateProduct);
router.delete('/:id', deleteOneProduct);
router.delete('/', deleteAllProducts);

module.exports = router;
