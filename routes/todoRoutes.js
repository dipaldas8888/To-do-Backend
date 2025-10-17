const express = require("express");
const router = express.Router();
const Todo = require("../models/todoModel");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, async (req, res) => {
  const todos = await Todo.findAll({ where: { userId: req.user.id } });
  res.json(todos);
});

router.post("/", protect, async (req, res) => {
  const todo = await Todo.create({ text: req.body.text, userId: req.user.id });
  res.status(201).json(todo);
});

router.put("/:id", protect, async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  if (todo.userId !== req.user.id)
    return res.status(401).json({ message: "Not authorized" });

  todo.text = req.body.text || todo.text;
  todo.completed = req.body.completed ?? todo.completed;
  await todo.save();

  res.json(todo);
});

router.delete("/:id", protect, async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  if (todo.userId !== req.user.id)
    return res.status(401).json({ message: "Not authorized" });

  await todo.destroy();
  res.json({ message: "Todo deleted" });
});

module.exports = router;
