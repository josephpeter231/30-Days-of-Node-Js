// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Define MongoDB Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number
});

// Create Product model
const Product = mongoose.model('Product', productSchema);

// Define routes

// Route to create a new product
app.post('/products', async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const product = new Product({ name, price, quantity });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get product statistics
app.get('/product-statistics', async (req, res) => {
  try {
    const statistics = await getProductStatistics();
    res.json(statistics);
  } catch (error) {
    console.error('Error getting product statistics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Function to calculate product statistics
async function getProductStatistics() {
  const aggregationPipeline = [
    {
      $group: {
        _id: null,
        totalProducts: { $sum: 1 },
        averagePrice: { $avg: "$price" },
        highestQuantity: { $max: "$quantity" }
      }
    }
  ];

  const result = await Product.aggregate(aggregationPipeline);
  return result[0];
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
