import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { InitDB } from "./models/init.js";

import UserRouter from "./routes/User.route.js";
const Port = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use("/api/v1", UserRouter);

app.listen(Port, () => {
  InitDB();
  console.log("Server is start succesfully at port", Port);
});
