const express = require("express");
const http = require("http");
const port = 4200;
const api = require("./server/routes/api");

const app = express();
const path = require("path");

const server = http.createServer(app);
const cors = require("cors");
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
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

const Socket = require("./server/socketIo");
const match = new Socket();

io.on("connection", (socket) => {
	console.log(socket.id);

	socket.on("addUser", ({ _id, username }) => {
		match.addUser({ _id, username });
		console.log("User Was Added!!!!!!");
	});

	socket.on("increaseUserScore", (id) => {
		match.increaseUserScore(id);
		console.log("User Score Was Increased!!!");
	});

	socket.on("removeUser", (id) => {
		match.removeUser(id);
		console.log("User Was Removed!!!");
	});
	// socket.on("join", ({ username, password }) => {

	// })

	socket.on("disconnect", () => {
		console.log("user has left");
	});
});
// const getApiAndEmit = (socket) => {
// 	const response = new Date();
// 	// Emitting a new message. Will be consumed by the client
// 	socket.emit("FromAPI", response);
// };

server.listen(port, () => console.log(`listening on port ${port}`));
