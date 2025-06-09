import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes";
import path from "path";
import errorHandler from "./middlewares/errorHandler";
import { errorLoger, requestLogger } from "./middlewares/logger";
import helmet from "helmet";
import { errors } from "celebrate";

const { PORT = 3000, DB_URL = "mongodb://127.0.0.1:27017/nevskayamasters" } =
  process.env;

const app = express();
app.use(requestLogger);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(DB_URL);
app.disable("x-powered-by");
app.use(userRoutes);
app.use(errorLoger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
