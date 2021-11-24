import http from "http";
import "./db/mongoDB.js";
import { config } from "dotenv";
import app from "./app.js";

config();

const PORT = process.env.PORT || 5000;
export const server = http.createServer(app);

process.on("uncaughtException", (error) => {
    console.log(`Uncaught Exception: ${error.message}`);

    process.exit(1);
});

process.on("unhandledRejection", (error) => {
    console.log(error);
    console.log(`Unhandled Rejection: ${ {name: error.name, message: error.message || error}}`);

    process.exit(1);
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`);
});