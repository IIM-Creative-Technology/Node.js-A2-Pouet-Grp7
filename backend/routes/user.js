import express from "express";
const router = express.Router();

export default router.get("/", (req, res) => {
    res.json({
        firstName: "Alex",
        lastName: "Zerah",
        email: "alex.zerah@gmail.com"
    });
});