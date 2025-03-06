const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

//middleware
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

//router

app.get("/", (req, res) => {
  res.send("Welcome to Properties Server");
});

//server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
