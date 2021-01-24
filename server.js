const express = require("express");
const http = require("http");
const port = 4200;
const api = require("./server/routes/api");
const app = express();
const path = require("path");
const server = http.createServer(app);
const cors = require("cors");
const io = require("socket.io")(server, {
	cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/historyEventsDB", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
	res.header(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization, Content-Length, X-Requested-With"
	);
	next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/", api);
let interval;
io.on("connection", (socket) => {
	console.log("New client connected");
	if (interval) {
		clearInterval(interval);
	}
	interval = setInterval(() => getApiAndEmit(socket), 1000);
	socket.on("disconnect", () => {
		console.log("Client disconnected");
		clearInterval(interval);
	});
});
const getApiAndEmit = (socket) => {
	const response = new Date();
	// Emitting a new message. Will be consumed by the client
	socket.emit("FromAPI", response);
};
server.listen(port, () => console.log(`listening on port ${port}`));
