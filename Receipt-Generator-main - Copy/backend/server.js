import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import receiptsRouter from './routes/receipts.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Increase payload size limit to handle large base64 strings (like images)
app.use(express.json({ limit: '10mb' }));
app.use(cors());

// Routes
app.use('/api/receipts', receiptsRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'receiptsDB',
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => console.error('MongoDB connection error:', err));
