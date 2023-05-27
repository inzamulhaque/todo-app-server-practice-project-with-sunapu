const express = require("express");
const app = express();
const cors = require("cors");

//middlewares
app.use(express.json());
app.use(cors());


app.get("/", (req:any, res:any) => {
  res.send("Route is working!");
});

module.exports = app;