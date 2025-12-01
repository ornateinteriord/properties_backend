const express = require("express");
const cors = require("cors");
const ImageKit = require("imagekit");
const Authrouter = require("./routes/auth.routes");
const Productrouter = require("./routes/product.routes");
const PropertyTypeRouter = require("./routes/propertyType.routes")
const  userRouter = require('./routes/user.routes');
const { getCounts } = require("./controllers/product.controller");
const { Authenticated, AuthorizeRoles } = require("./middlewares/auth");

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

// Initialize ImageKit
let imagekit = null;
if (
  process.env.IMAGEKIT_PUBLIC_KEY &&
  process.env.IMAGEKIT_PRIVATE_KEY &&
  process.env.IMAGEKIT_URL_ENDPOINT
) {
  imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });
  console.log("ImageKit initialized successfully");
} else {
  console.warn("ImageKit not initialized - missing environment variables");
}

// ImageKit authentication endpoint
app.get("/image-kit-auth", (_req, res) => {
  if (imagekit) {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
  } else {
    res.status(500).json({ error: "ImageKit not configured" });
  }
});

//router
app.use("/auth",Authrouter );
app.use("/product",Productrouter)
app.use("/property-type", PropertyTypeRouter )
app.use("/user", userRouter )
app.get("/get-counts",Authenticated,AuthorizeRoles('admin'), getCounts)


app.get("/",(req,res)=>{
  res.send("Welcome to properties Server")
})

//server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
