const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");

const getTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res) => {
  const _id = req.params.id;
  const task = await Task.findById(_id);
  if (!task) {
    return res.status(404).send(`Can't get task with id:${_id}`);
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const { body } = req;
  const task = await Task.findByIdAndUpdate(taskId, body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return res.status(404).send(`Can't get task with id${taskId}`);
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    return res.status(404).send(`Can't get task with id:${id}`);
  }
  res.status(200).json({ task });
});

module.exports = {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
