const Cart = require('../models/cart');

// Our predefined products array
const productsArr = [
  {
    productId: '1',
    title: 'Colors',
    price: 100,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
  },
  {
    productId: '2',
    title: 'Black and white Colors',
    price: 50,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
  },
  {
    productId: '3',
    title: 'Yellow and Black Colors',
    price: 70,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
  },
  {
    productId: '4',
    title: 'Blue Color',
    price: 100,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
  },
];

exports.getAllCart = async (req, res) => {
  try {
    const { userId } = req.user;

    // Find the cart for the given user
    const cart = await Cart.findOne({ userId });

    if (!cart || cart.products.length === 0) {
      return res.status(404).send({ message: 'Cart is empty' });
    }

    res.send(cart);
  } catch (error) {
    res.status(500).send({ message: 'An error occurred while fetching the cart', error });
  }
};


exports.addToCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const { productId } = req.body;

    const product = productsArr.find(p => p.productId === productId);
    if (!product) return res.status(404).send({ message: 'Product not found' });

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      // Create a new cart with the first product added
      cart = new Cart({ userId, products: [{ ...product, quantity: 1 }] });
    } else {
      const productIndex = cart.products.findIndex(p => p.productId === productId);
      if (productIndex > -1) {
        return res.status(400).send({ message: 'Product is already in the cart' });
      }
      cart.products.push({ ...product, quantity: 1 });
    }
    await cart.save();
    res.send(cart);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateCartQuantity = async (req, res) => {
  try {
    const { userId } = req.user;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });
    const product = cart.products.find(p => p.productId === productId);
    if (!product) return res.status(404).send({ message: 'Product not found in cart' });

    product.quantity = quantity;
    await cart.save();
    res.send(cart);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const { productId } = req.body;

    const cart = await Cart.findOne({ userId });
    cart.products = cart.products.filter(p => p.productId !== productId);
    await cart.save();
    res.send(cart);
  } catch (error) {
    res.status(500).send(error);
  }
};
