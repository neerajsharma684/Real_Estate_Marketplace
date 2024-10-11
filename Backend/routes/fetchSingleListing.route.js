import express from 'express';
import { Listing } from '../models/index.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.json(listing);
});

export default router;
