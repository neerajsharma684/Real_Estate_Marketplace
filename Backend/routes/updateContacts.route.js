import express from "express";
import { User } from "../models/index.js";

const router = express.Router();

router.put("/", async(req, res) => {
    try{
        const {email, phone, whatsapp, telegram} = req.body;
        const user = await User.findOne({ email: email });
        if(!user){
            console.log("User Not Found !!!");
        }
        user.phone = phone;
        user.whatsapp = whatsapp;
        user.telegram = telegram;
        await user.save();
        res.status(200).send("Contact Details Updated Successfully !!!");
    }catch(err){
        res.status(500).send("Error Updating Contact Details !!!");
        console.log("Error Updating Contact Details !!!");
    }
});

export default router;