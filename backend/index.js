//const express = require('express');
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {Server} from "socket.io";

import http from 'http';

const app = express();
const server = http.createServer(app);

const port = 3000;

const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

io.on("connection", (socket) => {
    console.log(`A user connected. Socket id: ${socket.id}`)

    socket.on("message", (data) => {
        socket.emit("data", (data))
    })
})

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({msg: "Hello"});
})

app.get('/school', (req, res) => {
    console.log(`Un utilisateur s'est connecté`);
    res.json({msg: "iim"});
})

app.post('/', (req, res) => {
    console.log(req.body);
    res.json(req.body);
})

app.delete('/', (req, res) => {
    res.json({msg: "au revoir"});
})

server.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}`);
})