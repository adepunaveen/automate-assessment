const express = require("express");
const app = express();
const dotenv = require("dotenv");
const dashboardRoutes = require("./routes/dashboard");
const verifyToken = require("./routes/validate-token");
const authRoutes = require("./routes/auth");
const fileRoutes = require("./routes/file");
const folderRoutes = require("./routes/folder");
const mongoose = require("mongoose");

dotenv.config();
// import routes
// connect to db
mongoose.connect(
  process.env.DB_CONNECT_URL,
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
},
(err,db) => {
  if(err){
    console.log(" Error Connecting Database ",err)
    return
  }
  console.log("connected to db")}
);
// middlewares
app.use(express.json()); // for body parser


// route middlewares
app.use("/api/user", authRoutes);
app.use("/api/dashboard", verifyToken, dashboardRoutes);
app.use("/api/file", verifyToken,fileRoutes);
app.use("/api/folder", verifyToken,folderRoutes);

const port = process.env.port || 3000
app.listen(3000, () => console.log(`server is running on port ${port}...`));