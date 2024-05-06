import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";
import routes from './src/routes/index.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1', routes)

const port = process.env.PORT || 5000;
const sever = http.createServer(app);

//? Connect db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Mongodb connect");
    sever.listen(port, () => {
      console.log(`sever is listening on port ${port}`);
    });
  })
  .catch((e) => {
    console.log({ e });
    process.exit(1);
  });
