import express from "express";
import { User } from "../models/index.js";
import bcryptjs from "bcryptjs";

const router = express.Router();

router.put("/", async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({ email: email });
        if(!user){
            console.log("User Not Found !!!");
        }
        user.password = await bcryptjs.hash(password, 10);
        await user.save();
        res.status(200).send("Password Updated Successfully !!!");
    }catch(err){
        res.status(500).send("Error Updating Password !!!");
        console.log("Error Updating Password !!!");
    }
});

export default router;