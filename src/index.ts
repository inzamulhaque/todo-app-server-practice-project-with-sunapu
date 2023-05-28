// const mongoose = require("mongoose");
import mongoose from "mongoose";
// const dotenv = require("dotenv").config();
import * as dotenv from "dotenv";
dotenv.config();

const app = require("./app");

const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7kpjj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(URI).then(() => {
  console.log(`Database connection is successful 🛢`);
});

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
