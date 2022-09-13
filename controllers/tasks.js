const { findByIdAndDelete } = require("../models/Task");
const Task = require("../models/Task");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).send(error);
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    // console.log(error);
    res.status(500).send(error);
  }
};

const getTask = async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send(`Can't get task with id:${_id}`);
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateTask = async (req, res) => {
  try {
    const {id:taskId} = req.params
    const {body} = req
    const task = await Task.findByIdAndUpdate(taskId, body, {new:true, runValidators:true})
    if(!task){
      return res.status(404).send(`Can't get task with id${taskId}`)
    }
    res.status(200).json({task})
  } catch (error) {
    res.status(500).send(error)
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id)
    if (!task) {
      return res.status(404).send(`Can't get task with id:${id}`);
    }
    res.status(200).json({ task });
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
