import express from "express";
import cors from "cors";

import contentPageRouter from "./routes/contentPage.routes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/01_module_c/api", contentPageRouter);

export default app;
