import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Signup works!");
});

export default router;