import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import routes from './routes/index.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

// Environment Config
dotenv.config();

// Connect MongoDB
connectDB();

// App
const app = express();

// Body Parser
app.use(express.json());

// Test Server
app.get('/', (req, res, next) => {
  res.send('API is running...');
});

// Routes
app.use('/api', routes);

// Not Found
app.use(notFound);

// Error Handler Middleware
app.use(errorHandler);

// Port
const PORT = process.env.PORT || 5000;

// Server Listen
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow));
