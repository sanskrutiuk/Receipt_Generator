// backend/models/Receipt.js

import mongoose from 'mongoose';
import express from 'express';
const router = express.Router();


const receiptSchema = new mongoose.Schema({
  receiptId: String,
  date: String,
  fromName: String,
  fromEmail: String,
  billToName: String,
  billToEmail: String,
  billToAddress: String,
  billToPhone: String,
  description: String,
  amount: Number,
  notes: String,
  signature: String,
}, { timestamps: true });

const Receipt = mongoose.model('Receipt', receiptSchema);

export default Receipt; // ✅ Default export

