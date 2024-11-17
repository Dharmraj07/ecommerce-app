const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middleware/auth');

router.get("/",auth,cartController.getAllCart);
router.post('/', auth, cartController.addToCart);
router.put('/', auth, cartController.updateCartQuantity);
router.delete('/', auth, cartController.removeFromCart);

module.exports = router;
