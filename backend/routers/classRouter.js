import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Class from '../models/classModel.js';
import { isAuth } from '../utils.js'

const classRouter = express.Router();

classRouter.post("/add", isAuth, expressAsyncHandler(async (req, res) => {
  try {
    const newClass = new Class({
      name: req.body.name,
      owner: req.body.userId,
      description: req.body.description,
    });
    const savedClass = await newClass.save();
    res.status(200).send(savedClass);
  } catch (error) {
    res.status(500).send(error)
  }
}))

classRouter.get("/user/:userId", expressAsyncHandler(async (req, res) => {
  const classes = await Class.find({ owner: req.params.userId });
  res.status(200).send(classes);
}))

classRouter.get("/", expressAsyncHandler(async (req, res) => {
  const classes = await Class.find({}).populate('owner', 'name');
  res.send(classes);
}))

classRouter.get("/:classId", expressAsyncHandler(async (req, res) => {
  try {
    const c = await Class.findById(req.params.classId);
    console.log(c)
    res.status(200).send(c);
  } catch (error) {
    res.status(404).send({ message: "Class not Found" })
  }
}))

export default classRouter