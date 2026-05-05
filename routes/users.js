/* eslint-disable no-undef */
import express from "express";

const router = express.Router();

let users = [
  {
    id: 1,
    name: "John",
    role: "Backend",
  },
  {
    id: 2,
    name: "Jesse",
    role: "Designer",
  },
];

router.get("/", (req, res) => {
  res.json(users);
});

router.post("/", (req, res) => {
  const { name, role } = req.body;

  if (!name || !role) {
    return res.status(400).json({ error: "name and role are required" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    role,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

router.get("/slow", async (req, res) => {
  console.log("/slow so'rovi keldi, 2 soniya kutilmoqda...");

  await new Promise((resolve) => setTimeout(resolve, 2000));

  res.json({ message: "Finished after 2 seconds" });
});

export default router;
