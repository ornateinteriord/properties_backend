const express = require("express");
const cors = require("cors");
const Authrouter = require("./routes/auth.routes");
const Productrouter = require("./routes/product.routes");
require("dotenv").config();
require("./models/db");
const app = express();

//middleware
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

//router
app.use("/auth",Authrouter );
app.use("/product",Productrouter)

//server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
