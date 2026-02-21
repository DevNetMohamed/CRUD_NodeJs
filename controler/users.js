const TodoModel = require("../models/todos");
const UserModel = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

const UserLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({
      status: "Filed",
      mass: "Please Write your Email and password",
    });
  }
  let user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(401).json({
      status: "Not Found",
      massage: "Invaild Email Or Password",
    });
  }

  let isVaild = await bcrypt.compare(password, user.password);
  if (!isVaild) {
    return res.status(401).json({
      status: "Not Found",
      massage: "Invaild Email Or Password",
    });
  }

  // generate Token
  const token = jwt.sign({ user:user._id, email: user.email }, process.env.SECRET,{
    expiresIn: "1h",
  });
  res.status(200).json({
    status: "Sccess",
    token
  });
};

module.exports = { SaveUsers, GetAll, GetById, UserLogin };
