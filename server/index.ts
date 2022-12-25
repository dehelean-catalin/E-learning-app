import express, { json } from "express";
import http from "http";
import cors from "cors";
import userRoutes from "./routes/users-routes";
import authRoutes from "./routes/auth-routes";
import appInitializationRoutes from "./routes/app-initialization";
import lecturesRoutes from "./routes/lectures-routes";

const app = express();

app.use(cors());
app.use(json());

app.use(authRoutes);
app.use(appInitializationRoutes);
app.use(userRoutes);
app.use(lecturesRoutes);
app.use("/", (req, res) => {
	res.status(200).json("serverul a pronit");
});

const server = http.createServer(app);

server.listen(4000);

// const io = new Server(server, {
// 	cors: {
// 		origin: "http://localhost:3000",
// 		methods: ["GET", "POST"],
// 	},
// });

// io.on("connection", (socket) => {
// 	console.log(`User Connected: ${socket.id}`);

// 	socket.on("join_room", (data) => {
// 		socket.join(data);
// 	});

// 	socket.on("send_message", (data) => {
// 		socket.to(data.roomId).emit("receive_message", data);
// 	});
// });
