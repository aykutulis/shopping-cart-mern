import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import routes from './routes/index.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

// Environment Config
dotenv.config();

// Connect MongoDB
connectDB();

// App
const app = express();

// Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body Parser
app.use(express.json());

// Test Server
app.get('/', (req, res, next) => {
  res.send('API is running...');
});

// Routes
app.use('/api', routes);

// Static Routes
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// PayPal
app.get('/api/config/paypal', (req, res, next) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// Not Found
app.use(notFound);

// Error Handler Middleware
app.use(errorHandler);

// Port
const PORT = process.env.PORT || 5000;

// Server Listen
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow));
