import express from "express";
 import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import { connectDb } from "./db/index.ts";
import router from "./routes/index.ts";
import errorHandler from "./middleware/errorHandler.ts";
import type { IError } from "./models.ts";
const app = express();
const port = 3001;
const corsOptions = {
  origin: ["http://localhost:5173"],
};

const connect = async () => {
  await connectDb();
};

connect();

app.use(express.json());
app.use(cors(corsOptions));
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
