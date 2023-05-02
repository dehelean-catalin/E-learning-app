import cors from "cors";
import express, { json } from "express";
import http from "http";
import multer from "multer";
import authRoutes from "./routes/auth-routes";
import creatorRoutes from "./routes/creator.routes";
import homeRoutes from "./routes/home.routes";
import profileRoutes from "./routes/profile-routes";
import searchRotes from "./routes/search-routes";
import userRoutes from "./routes/users-routes";
import watchingRoutes from "./routes/watching.routes";
const app = express();

app.use(cors());
app.use(multer().single("file"));
app.use(json());

app.use(authRoutes);
app.use(homeRoutes);
app.use(userRoutes);
app.use(profileRoutes);
app.use(searchRotes);
app.use(creatorRoutes);
app.use(watchingRoutes);

app.all("*", (req, res) => {
	res.status(404).json({ code: 404, message: "Not found" });
});

const server = http.createServer(app);

server.listen(4000, () => {
	console.log("Server is up on port 4000");
});
