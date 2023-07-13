import cors from "cors";
import express, { json } from "express";
import multer from "multer";
import { tokenAuth } from "./middleware/tokenAuth";
import creatorRoutes from "./routes/creator.routes";
import lectureRoutes from "./routes/lecture.routes";
import monitoringRoutes from "./routes/monitoring.routes";
import userRoutes from "./routes/user.routes";

const app = express();
const port = 4000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(multer().single("file"), json());
app.use(tokenAuth);

app.use(userRoutes);
app.use(lectureRoutes);
app.use(monitoringRoutes);
app.use(creatorRoutes);

app.all("*", (req, res) => {
	res.status(404).json({ code: 404, message: "Not found" });
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
