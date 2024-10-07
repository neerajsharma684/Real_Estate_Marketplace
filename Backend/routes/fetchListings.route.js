import express from 'express';
import { Listing } from "../models/index.js";

const router = express.Router();

router.get("/", async(req, res) => {
    const { page = 1, limit = 20, email } = req.query;
  try {
    const listings = await Listing.find({ email }) // Filter by the email
      .skip((page - 1) * limit) // Skip the documents for pagination
      .limit(parseInt(limit)); // Limit the documents for pagination

    const totalListings = await Listing.countDocuments({ email }); // Count total documents for pagination
    res.json({ listings, totalListings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;