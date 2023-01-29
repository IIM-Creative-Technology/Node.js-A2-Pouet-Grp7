import express from "express";
import User from "./user.js"
const router = express.Router();

export default router.post("/", (req, res) => {

    const register = new User ({
        name: req.body.name,
        mail: req.body.mail,
        password: req.body.password,
        age: req.body.age
    });

    const dbResponse = register.save();

    res.json({
        msg: "un utlisateur a crée un compte !"
    });
});

