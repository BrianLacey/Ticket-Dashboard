import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./db/index.ts";
import router from "./routes/index.ts";
import errorHandler from "./middleware/errorHandler.ts";
import type { IError } from "./models.ts";
import dns from 'node:dns';

const app = express();
dotenv.config();
const port = process.env.PORT;
const corsOptions = {
  origin: [`${process.env.ORIGIN}`],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connect = async () => {
  await connectDb();
};

connect();

app.use(cors(corsOptions));
app.use(express.json());
app.options("*all", cors());
app.use("/api", router);
app.all("/*splat", (req: Request, res: Response, next: NextFunction) => {
  let error: IError;
  error = new Error(`Path \"${req.originalUrl}\" does not exist`);
  error.status = 404;
  next(error);
});
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
