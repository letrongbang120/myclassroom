import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import classRouter from './routers/classRouter.js'
import userRouter from './routers/userRouter.js';

const PORT = 8000;
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use("/api/classes/", classRouter);
app.use("/api/users/", userRouter);

app.get("/", (req, res) => {
  res.send("Hello");
})

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
})