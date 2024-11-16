import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const users = {};
const messages = [];

// Serve a test endpoint
app.get("/", (req, res) => {
	res.send("Socket.IO server is running.");
});

// Handle WebSocket connections
io.on("connection", (socket) => {
	console.log("A user connected:", socket.id);

    socket.emit("messageHistory", messages);

    socket.on("setUsername", (username) => {
        socket.username = username;
        users[socket.id] = username;

        socket.broadcast.emit("message", {
            username: "System",
            text: `${username} has joined the chat.`
        });

        const joinMessage = {
            username: "System",
            text: `${username} has joined the chat.`,
        };
        messages.push(joinMessage);
        socket.broadcast.emit("message", joinMessage);

        io.emit("userList", Object.values(users));
    })

	// Broadcast messages to all clients
	socket.on("message", (text) => {
        const message = {
            username: socket.username,
            text,
        };
        messages.push(message);
		io.emit("message", message); // Broadcast to all users
	});

	// Handle disconnections
	socket.on("disconnect", () => {
		console.log("A user disconnected:", socket.id);

        if (socket.username) {
            delete users[socket.id];

            const leaveMessage = {
                username: "System",
                text: `${socket.username} has left the chat`,
            };
            messages.push(leaveMessage);
            socket.broadcast.emit("message", leaveMessage);

            io.emit("userList", Object.values(users));
        }
	});
});

// Start the server
server.listen(3000, () => {
	console.log("Server is running on http://localhost:3000");
});
