import cors from "cors";
import express, { json } from "express";
import { createServer } from "http";
import multer from "multer";
import authRoutes from "./routes/auth.routes";
import creatorRoutes from "./routes/creator.routes";
import lectureRoutes from "./routes/lecture.routes";
import profileRoutes from "./routes/profile.routes";
import progressRoutes from "./routes/progress.routes";
import userRoutes from "./routes/user.routes";

require("dotenv").config();

const app = express();

app.use(cors());
app.use(multer().single("file"));
app.use(json());

app.use(authRoutes);
app.use(lectureRoutes);
app.use(progressRoutes);
app.use(userRoutes);
app.use(profileRoutes);
app.use(creatorRoutes);

app.all("*", (req, res) => {
	res.status(404).json({ code: 404, message: "Not found" });
});

const server = createServer(app);

server.listen(4000, () => {
	console.log("Server is up on port 4000");
});
