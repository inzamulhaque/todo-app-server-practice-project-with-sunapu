// const express = require("express");
import express, { Request, Response } from "express";
import cors from "cors";

// import routes
import userRoute from './app/modules/user/user.routes';
import categoriesRoute from './app/modules/categories/categories.routes';

const app = express();


//middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/category", categoriesRoute);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Route is working!");
});

module.exports = app;
