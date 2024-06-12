import express from "express";
import { User } from "../models/index.js";
import bcryptjs from "bcryptjs";

const router = express.Router();

router.post("/", async(req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const user = new User({
        name,
        email,
        password: hashedPassword
    });
    try{
        await user.save();
        res.status(201).send("User Created Successfully !!!");
    } catch(err){
        res.status(500).send("User Already Exists !!!");
    }
});

export default router;