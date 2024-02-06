import express from "express";
import { User } from "../models/userModel.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    if (
      !req.body.username ||
      !req.body.password ||
      !req.body.name ||
      !req.body.email
    ) {
      return res.status(400).send({
        message: "Please include all fields",
      });
    }
    const user = await User.create(req.body);
    return res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && user.password === password) {
      res.status(200).send({ message: "logged in!" });
    } else {
      res
        .status(404)
        .send({ message: "Please check username and/or password" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});
export default router;
