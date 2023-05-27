import cors from "cors";
import express, { json } from "express";
import http from "http";
import multer from "multer";
import authRoutes from "./routes/auth.routes";
import creatorRoutes from "./routes/creator.routes";
import historyRoutes from "./routes/history.routes";
import homeRoutes from "./routes/home.routes";
import lectureRoutes from "./routes/lecture.routes";
import profileRoutes from "./routes/profile.routes";
import savedLectureRoutes from "./routes/savedLecture.routes";
import searchRotes from "./routes/search.routes";
import userRoutes from "./routes/user.routes";
const app = express();

app.use(cors());
app.use(multer().single("file"));
app.use(json());

app.use(authRoutes);
app.use(homeRoutes);
app.use(lectureRoutes);
app.use(userRoutes);
app.use(profileRoutes);
app.use(searchRotes);
app.use(creatorRoutes);
app.use(savedLectureRoutes);
app.use(historyRoutes);

app.all("*", (req, res) => {
	res.status(404).json({ code: 404, message: "Not found" });
});

const server = http.createServer(app);

server.listen(4000, () => {
	console.log("Server is up on port 4000");
});
