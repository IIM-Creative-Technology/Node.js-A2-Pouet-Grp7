import express from "express";
import User from "./user.js"
const router = express.Router();

export default router.post('/:name/:password', (req,res) => {
    User.find({ name:req.params.name ,password:req.params.password}).then(function(users){
        res.send(users);
    })
})