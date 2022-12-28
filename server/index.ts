import cors from "cors";
import express, { json } from "express";
import http from "http";
import appInitRoutes from "./routes/app-init-routes";
import authRoutes from "./routes/auth-routes";
import lecturesRoutes from "./routes/lectures-routes";
import userRoutes from "./routes/users-routes";
const app = express();

app.use(cors());
app.use(json());

app.use(authRoutes);
app.use(appInitRoutes);
app.use(userRoutes);
app.use(lecturesRoutes);

app.use((req, res) => {
	res.status(404).json({ code: 404, message: "Not found" });
});

const server = http.createServer(app);

server.listen(4000);
