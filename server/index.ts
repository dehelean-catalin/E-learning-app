import express, { json } from "express";
import http from "http";
import cors from "cors";
import userRoutes from "./routes/users-routes";
import authRoutes from "./routes/auth-routes";
import appInitRoutes from "./routes/app-init-routes";
import lecturesRoutes from "./routes/lectures-routes";
import watchingLecturesRoutes from "./routes/watching-lectures-routes";
const app = express();

app.use(cors());
app.use(json());

app.use(authRoutes);
app.use(appInitRoutes);
app.use(userRoutes);
app.use(lecturesRoutes);
app.use(watchingLecturesRoutes);

app.use("/", (req, res) => {
	res.status(200).json("serverul a pronit");
});

const server = http.createServer(app);

server.listen(4000);
