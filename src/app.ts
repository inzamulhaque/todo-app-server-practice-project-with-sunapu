// const express = require("express");
import express, { Request, Response } from "express";
import cors from "cors";

// import routes
import userRoute from './routes/user.routes';

const app = express();


//middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1/user", userRoute);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Route is working!");
});

module.exports = app;
