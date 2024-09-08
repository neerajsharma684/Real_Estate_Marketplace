import express from "express";
import { User } from "../models/index.js";

const router = express.Router();

router.put("/", async(req, res) => {
    try{
        const {oldEmail, email} = req.body;
        const user = await User.findOne({ email: oldEmail });
        if(!user){
            console.log("User Not Found !!!");
        }
        user.email = email;
        await user.save();
        res.status(200).send("Email Updated Successfully !!!");
    }catch(err){
        res.status(500).send("Error Updating Email !!!");
        console.log("Error Updating Email !!!");
    }
});

export default router;