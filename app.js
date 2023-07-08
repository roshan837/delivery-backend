import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import UserRouter from "./routes/userRoutes.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/user", UserRouter);
mongoose
  .connect(
    "mongodb+srv://khushisingh:khushi5716@delivery.remntj8.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => console.log(err));
