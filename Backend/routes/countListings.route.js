import express from 'express';
import { Listing } from "../models/index.js";

const router = express.Router();

router.post("/", async(req, res) => {
    const email = req.query.email;

    if (!email) {
        return res.status(400).json({ error: 'Current user email is required' });
    }
    try{
        const count = await Listing.countDocuments({ email });
        res.status(200).json({ count });
    } catch(err){
        res.status(500).json({ error: 'Internal Server Error' });
        console.log("Internal Server Error");
    }
});

export default router;