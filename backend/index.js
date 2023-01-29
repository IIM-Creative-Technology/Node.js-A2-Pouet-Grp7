import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {Server} from "socket.io";

import http from 'http';

import userRoute from "./routes/user.js";

import registerRoute from "./routes/register.js"
import loginRoute from "./routes/login.js"

const app = express();
const httpServer = http.createServer(app);

const port = 3000;

const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log(`A user connected. Socket id: ${socket.id}`);
    socket.on("msgNote", (msg) => {
        if(msg.msg !== '' && msg.msg.trim().length !== 0){
            msg.id = randomId()
            console.log(msg)
            socket.emit("data",{msg})
        }
    })
    socket.on("msgGlobal", (msg) => {
        if(msg.msg !== '' && msg.msg.trim().length !== 0){
            msg.id = randomId()
            console.log(msg)
            socket.broadcast.emit("data",{msg})
        }
    })
    socket.on("msgSuperGlobal", (msg) => {
        if(msg.msg !== '' && msg.msg.trim().length !== 0){
            msg.id = randomId()
            console.log(msg)
            io.emit("data",{msg})
        }
    })
});

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    console.log(`Un utilisateur s'est connecté`);
    res.json({msg: "Hello world"});
});

app.delete("/api/msg", (req, res) => {
    console.log("ok")
    console.log(req.body)
    io.emit("destroy",req.body)
    res.json("request send");
});

app.use("/api/user", userRoute);
app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute)

httpServer.listen(port, () => {
    console.log(`Le serveur écoute sur ${port}`);
});

let randomId = function() {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}