import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import postRoutes from "./routes/posts.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import homeRoute from "./routes/home.js";

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use((req, res, next) => {
// 	res.setHeader("Access-Control-Allow-Origin", "*");
// 	res.setHeader(
// 		"Access-Control-Allow-Headers",
// 		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
// 	);
// 	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
// 	next();
// });
app.use(
	cors({
		origin: "*",
		credentials: true, //access-control-allow-credentials:true
		optionSuccessStatus: 200,
	})
);

app.use("/posts", postRoutes);
app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/home", homeRoute);

// // authentication endpoint
// app.get("/allposts", auth, (request, response) => {
// 	response.json({ message: "You are authorized to access me" });
// });

app.use(helmet());
app.use(morgan("common"));

dotenv.config();
const PORT = process.env.PORT || 5000;

mongoose
	.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
	.catch((error) => console.log(error.message));
