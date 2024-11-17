// controllers/productController.js

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
  
  // Get all products
  exports.getAllProducts = (req, res) => {
    res.send(productsArr);
  };
  
  // Get a single product by productId
  exports.getProductById = (req, res) => {
    const { productId } = req.params;
    const product = productsArr.find(p => p.productId === productId);
  
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
  
    res.send(product);
  };
  