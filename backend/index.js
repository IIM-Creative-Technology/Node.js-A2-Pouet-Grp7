import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {Server} from "socket.io";
const router = express.Router();

import http from 'http';

import registerRoute from "./routes/register.js"
import loginRoute from "./routes/login.js"

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
});

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    console.log(`Un utilisateur s'est connecté`);
    res.json({msg: "Hello world"});
});

app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute)

httpServer.listen(port, () => {
    console.log(`Le serveur écoute sur ${port}`);
});
