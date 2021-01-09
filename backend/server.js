import express from 'express';
import dotenv from 'dotenv';
import products from './data/products.js';

dotenv.config();

const app = express();

app.get('/', (req, res, next) => {
  res.send('API is running...');
});

app.get('/api/products', (req, res, next) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res, next) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
