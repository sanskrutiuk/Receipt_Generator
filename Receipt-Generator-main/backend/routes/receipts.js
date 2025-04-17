import express from 'express';
import Receipt from '../models/Receipt.js';

const router = express.Router();

// @POST /api/receipts
router.post('/', async (req, res) => {
  try {
    const receipt = new Receipt(req.body);
    const saved = await receipt.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error saving to DB:', error);
    res.status(500).json({ error: 'Failed to save receipt' });
  }
});

// @GET /api/receipts
router.get('/', async (req, res) => {
  try {
    const allReceipts = await Receipt.find();
    res.status(200).json(allReceipts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch receipts' });
  }
});

export default router;
