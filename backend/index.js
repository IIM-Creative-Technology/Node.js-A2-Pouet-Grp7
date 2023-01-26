import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {Server} from "socket.io";

import http from 'http';

import userRoute from "./routes/user.js";

const app = express();
const httpServer = http.createServer(app);

const port = 3000;

const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});

io.on("connection", (socket) => {
    console.log(`A user connected. Socket id: ${socket.id}`);
    socket.on("msgNote", (msg) => {
        console.log(msg)
        socket.emit("data",{msg})
    })
    socket.on("msgGlobal", (msg) => {
        console.log(msg)
        socket.broadcast.emit("data",{msg})
    })
    socket.on("msgSuperGlobal", (msg) => {
        console.log(msg)
        io.emit("data",{msg})
    })
});

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    console.log(`Un utilisateur s'est connecté`);
    res.json({msg: "Hello world"});
});

app.use("/api/user", userRoute);

httpServer.listen(port, () => {
    console.log(`Le serveur écoute sur ${port}`);
});