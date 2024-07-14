import express from "express";
import { User } from "../models/index.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async(req, res) => {
    const { email, password } = req.body;
    try{
        const validUser = await User.findOne({ email })
        if (!validUser) return res.status(400).send("User Not Found !!!");
        const hashedPassword = bcryptjs.compareSync(password, validUser.password);
        if (!hashedPassword) return res.status(401).send("Invalid Password !!!");
        const token = jwt.sign({ email:email, id: validUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        const { password: pass, ...user } = validUser._doc;
        res.cookie("access_token", token, { httpOnly: true }).status(200).json(user);
    } catch(err){
        res.status(500).send("User Already Exists !!!");
        console.log("User Already Exists !!!");
    }
});

export default router;