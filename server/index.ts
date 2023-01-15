import cors from "cors";
import express, { json } from "express";
import http from "http";
import authRoutes from "./routes/auth-routes";
import lecturesRoutes from "./routes/lectures-routes";
import userRoutes from "./routes/users-routes";
import multer from "multer";

const app = express();

app.use(cors());
app.use(multer().single("file"));
app.use(json());

app.use(authRoutes);
app.use(userRoutes);
app.use(lecturesRoutes);

app.all("*", (req, res) => {
	console.log(req);
	res.status(404).json({ code: 404, message: "Not found" });
});
const server = http.createServer(app);

server.listen(4000, () => {
	console.log("Server is up on port 4000");
});
