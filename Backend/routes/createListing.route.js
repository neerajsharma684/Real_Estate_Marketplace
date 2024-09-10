import express from "express";
import { Listing } from "../models/index.js";

const router = express.Router();

router.post("/", async(req, res) => {
    let {
        email, 
        phone,
        whatsapp,
        telegram,
        name, 
        description, 
        address, 
        action, 
        bedrooms, 
        halls, 
        kitchens, 
        bathrooms, 
        furnished, 
        four_wheeler_parking, 
        two_wheeler_parking, 
        area, 
        property_type, 
        price, 
        discountPercent, 
        discountAmount, 
        imageName} = req.body;
    price = parseFloat(price);
    discountAmount = parseFloat(discountAmount);
    console.log("Request Body: ", req.body);
    console.log("Parsed Data: ", email, name, description, address, action, bedrooms, halls, kitchens, bathrooms, furnished, four_wheeler_parking, two_wheeler_parking, area, property_type, price, discountPercent, discountAmount, imageName);
    const listing = new Listing({
        email, 
        phone,
        whatsapp,
        telegram,
        name, 
        description, 
        address, 
        action, 
        bedrooms, 
        halls, 
        kitchens, 
        bathrooms, 
        furnished, 
        four_wheeler_parking, 
        two_wheeler_parking, 
        area, 
        property_type, 
        price, 
        discountPercent, 
        discountAmount, 
        imageName
    });

    try {
        await listing.save();
        console.log("Listing Created Successfully !!!");
        res.status(201).send("Listing Created Successfully !!!");
    } catch (error) {
        console.log("Listing Already Exists !!!");
        res.status(500).send("Listing Already Exists !!!");
    }
});

export default router;