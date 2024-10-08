import express from "express";
import { Listing } from "../models/index.js";

const router = express.Router();

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const listing = await Listing.deleteOne({ _id: id });
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }
        res.status(200).json({ message: "Listing deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;  
