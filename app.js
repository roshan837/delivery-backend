import express from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import UserRouter from "./routes/userRoutes.js";
import BlogRouter from "./routes/blogRoutes.js";
import jwtMiddleware from './middleware/jwtMiddleware.js';
import dotenv from "dotenv";
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(jwtMiddleware);

dotenv.config();
app.use("/user", UserRouter);
app.use("/signup",UserRouter);
app.use("/blog",BlogRouter);
mongoose
  .connect(
    "mongodb+srv://admin:jnuXnAeFRAS6zMkq@cluster0.edvgza2.mongodb.net/Blog?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(3000);
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => console.log(err));
