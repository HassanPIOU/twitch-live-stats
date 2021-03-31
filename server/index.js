require('dotenv').config()
const express = require('express')
const app = express();
const path = require('path')
const http = require('http').Server(app);
const io = require('socket.io')(http,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

const port = process.env.PORT || 4000;

const viewers = require('./_helpers/viewers')

// Get Twitch token
viewers.getToken()

io.set('transports', ['websocket']);

io.on("connection", socket => {
    // viewers number  socket communicate to frontend
    socket.on("request", () => {
        // Emit the first Time
        viewers.getGameRequest(viewers.access_token,'Chess').then((ches) => io.sockets.emit("chess", ches))
        viewers.getGameRequest(viewers.access_token,'Rocket League').then((rocket) => io.sockets.emit("rocket_league", rocket))
        viewers.getGameRequest(viewers.access_token,'Hearthstone').then((heart) => io.sockets.emit("heartstone", heart) )
        viewers.getGameRequest(viewers.access_token,'Dota 2').then((dota) => io.sockets.emit("dota", dota))

        // Emit every 30 seconds
        setInterval(()=>{
            viewers.getGameRequest(viewers.access_token,'Chess').then((ches) => io.sockets.emit("chess", ches))
            viewers.getGameRequest(viewers.access_token,'Rocket League').then((rocket) => io.sockets.emit("rocket_league", rocket))
            viewers.getGameRequest(viewers.access_token,'Hearthstone').then((heart) => io.sockets.emit("heartstone", heart))
            viewers.getGameRequest(viewers.access_token,'Dota 2').then((dota) => io.sockets.emit("dota", dota))
        },1000)
    })
    });

const buildPath = path.join(__dirname, '..', 'build');
http.use(express.static(buildPath));

http.listen(port,()=>{
    console.log('Server is running')
})