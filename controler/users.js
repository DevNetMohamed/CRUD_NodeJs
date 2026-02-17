const TodoModel = require("../models/todos");
const UserModel = require("../models/Users");

const SaveUsers = async (req, res, next) => {
  let SaveNewUser = req.body;
  try {
    const user = await UserModel.create(SaveNewUser);

    res.status(201).json({
      status: "sccessfully",
      message: "saved successfully",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: "Fial",
      mass: err.message,
    });
  }
};

const GetAll = async (req, res, next) => {
  try {
    const AllUser = await UserModel.find().populate("userID");
    res.status(200).json({
      status: "Success",
      data: AllUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fial",
      mass: error.message,
    });
  }
};

const GetById = async (req, res) => {
  const { id } = req.param;
  try {
    const todo = await UserModel.find({ _id: id });
    if (todo) {
      res.status(200).json({
        status: "Success",
        data: todo,
      });
    } else {
      res.status(400).json({
        status: "faild",
        massage: "todo not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      massage: err.massage,
    });
  }
};

module.exports = { SaveUsers, GetAll, GetById };
