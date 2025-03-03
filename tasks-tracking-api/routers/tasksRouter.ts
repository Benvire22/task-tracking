import express from "express";
import Task from "@/Task";

const tasksRouter = express.Router();

tasksRouter.get("/", async (req, res, next) => {
  try {
    const status = req.query.status;

    if (!status) {
      res.status(404).send({ message: "Status is required!" });
    }

    const tasks = await Task.find({ status });

    res.status(200).send(tasks);
    return next();
  } catch (e) {
    return next(e);
  }
});

tasksRouter.post("/", async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !status) {
      res.status(404).send({ message: "Title is required!" });
    }

    const newTask = new Task({
      title,
      description,
      status,
    });

    await newTask.save();

    res.status(200).send(newTask);
    return next();
  } catch (e) {
    return next(e);
  }
});

tasksRouter.put("/:id", async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const id = req.params.id;

    if (!title || !status) {
      res.status(404).send({ message: "Title is required!" });
    }

    const task = await Task.findOneAndUpdate({ id }, {
      title,
      description,
      status,
    }, { new: true });

    if (!task) {
      res.status(404).send({ message: "Task not found!" });
    }

    res.status(200).send({ message: "Task was created!" });
    return next();
  } catch (e) {
    return next(e);
  }
});

tasksRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const task = await Task.findOneAndDelete({ id });

    if (!task) {
      res.status(404).send({ message: "Task not found!" });
    }

    res.status(200).send({ message: "Task was deleted!" });
    return next();
  } catch (e) {
    return next(e);
  }
});