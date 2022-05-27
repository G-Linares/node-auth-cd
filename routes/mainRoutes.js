import express from "express";

const router = express.Router();

import UserData from "../models/UserData.js";
//aqui se importan los controladores

//aui van las rutas
router.get("/users", async (req, res) => {
  try {
    const allUserData = await UserData.find();
    res.status(200).json(allUserData);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.post("/create", async (req, res) => {
  const bodyUserData = req.body;
  const newUserData = new UserData(bodyUserData);
  try {
    await newUserData.save();
    res.status(201).json(newUserData);
  } catch (error) {
    //409 es cuando hay conlficto en cliente
    res.status(409).json({ message: error.message });
  }
});

export default router;
