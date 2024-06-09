import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
    res.send("Signup works!");
});

export default router;