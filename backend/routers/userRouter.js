import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.post("/register", expressAsyncHandler(async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 12),
    isAdmin: req.body.isAdmin ? true : false,
    isTeacher: req.body.isTeacher ? true : false
  })
  const newUser = await user.save();
  res.status(200).send(newUser);
}))

userRouter.post("/signin", expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {

      res.status(200).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isTeacher: user.isTeacher,
        token: generateToken(user)
      });
    }
    else {
      res.status(401).send({ message: "Password incorrect" });
    }
  } else {
    res.status(404).send({ message: "Email not Found." })
  }
}))

userRouter.get("/:userId", expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ message: "User not Found" });
  }
}))



export default userRouter;