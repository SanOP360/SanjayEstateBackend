const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/user.route");
const authRouter=require('./routes/auth.route')

dotenv.config();

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api",userRouter);
app.use("/api/auth",authRouter)