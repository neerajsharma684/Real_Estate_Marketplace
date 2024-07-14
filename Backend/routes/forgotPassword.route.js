import express from "express";
import { User } from "../models/index.js";
import bcryptjs from "bcryptjs";

const router = express.Router();

router.post("/", async(req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send("User Not Found !!!");
        if (!password) {
            return res.status(200).send("User Exists !!!");
        }
        const hashedPassword = bcryptjs.hashSync(password, 10);
        await user.updateOne({ password: hashedPassword });
        return res.status(200).send("Password Updated Successfully !!!");
    }
    catch(err){
        res.status(500).send("User Not Found !!!");
        console.log("User Not Found !!!");
    }
});

export default router;