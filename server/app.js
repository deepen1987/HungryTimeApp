import cors from "cors";
import express from "express";
import { config } from "dotenv";
import passport from 'passport';
import cookieParser from 'cookie-parser';
import errorHandler from "./middleware/errorHandler.js";
import { NotFoundError } from "./helpers/errors.js";
import authRouter from "./routes/auth.route.js";
import restRouter from "./routes/restaurant.route.js"

config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

passport.initialize();

app.use("/auth", authRouter);
app.use("/user", restRouter);

app.get("/", (req, res) => {
  res.status(200).json({status: "success", message: "Welcome!"});
});

app.all("*", (req, res) => {
  throw new NotFoundError('Resource not found on this server')
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(errorHandler);

export default app;