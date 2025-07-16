import express from "express";
import cors from "cors";
const app = express();

import testRouter from "./routes/test.routes.js";

app.use(express.json());
app.use(cors());

app.use("/test", testRouter);

export default app;
