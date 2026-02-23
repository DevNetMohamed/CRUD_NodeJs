const todoModel = require("../models/todos");
const { catchAsync } = require("../utils/CatchAsync");

const SaveTodos = catchAsync(async (req, res, next) => {
  let NewTodo = req.body;
  NewTodo.userID = req.id;
  const todo = await todoModel.create(NewTodo);
  res.status(201).json({
    status: "sccessfully",
    message: "saved successfully",
    data: todo,
  });
});
const GetAllTodos = catchAsync(async (req, res) => {
  const alltoto = await todoModel.find().populate({ _id: id });
  res.status(200).json({
    status: "Sccusse",
    data: alltoto,
  });
});

const viewTodos = catchAsync(async (req, res) => {
  const todosList = await Todo.find(); // assuming you're using Mongoose
  res.render("todos", { viewtodos: todosList });
});

module.exports = { SaveTodos, GetAllTodos, viewTodos };
