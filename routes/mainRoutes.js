import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

import UserData from "../models/UserData.js";

router.get("/users", async (req, res) => {
  try {
    const allUserData = await UserData.find();
    res.status(200).json(allUserData);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.post("/createAccount", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new UserData({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    //409 es cuando hay conlficto en cliente
    res.status(409).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const user = await UserData.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).send({
      message: "user not found"
    });
  }

  if (!await bcrypt.compare(req.body.password, user.password)) {
    return res.status(400).send({
      message: "invalid credentials"
    });
  }

  const token = jwt.sign({ _id: user._id }, "secret");

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 dia
  });

  res.send({
    message: "success"
  });
});

router.get("/userInfo", async (req, res) => {
    //solo checa cookie
  try {
    const cookie = req.cookies["jwt"];
    const claims = jwt.verify(cookie, "secret");
    if (!claims) {
      return res.status(401).send({
        message: "unauthenticated, need to log in"
      });
    }

    const user = await UserData.findOne({ _id: claims._id });
    //solo lo hago para no mostrar la password
    const { password, ...data } = await user.toJSON();

    res.send(data);
  } catch (e) {
    return res.status(401).send({
      message: "unauthenticated"
    });
  }
});

router.post('/logout', (req, res) => {
    //solo borra cookie
    res.cookie('jwt', '', {maxAge: 0})
    res.send({
        message: 'success'
    })
})

export default router;
