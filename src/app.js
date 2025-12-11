import express from "express";
import routes from "./routes/index.js";
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(routes);

export default app;