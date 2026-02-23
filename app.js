require("dotenv").config();
const express = require("express");
const cors = require("cors");
const todosRouters = require("./route/todos");
const userRouters = require("./route/users");
const mongoose = require("mongoose");
const AppErorr = require("./utils/AppError");
const app = express();
const port = 3000;

//Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.static("./static"));

app.use("/todos", todosRouters);
app.use("/users", userRouters);
app.use("/:id", userRouters);

// to Valit if user route any think in URL
app.use((req, res, next) => {
  next(new AppErorr(`Can not find ${req.originalUrl} on this server`));
});

// Middleware Error Handling
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "Samethig wrong",
  });
});

app.set("view engine", "pug");

app.set("views", "./views");
//Database Conniection
async function dbconnection() {
  try {
    await mongoose.connect(process.env.URL);
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
  }
}

dbconnection();

app.get("/app", (req, res, next) => {
  res.status(200).send("Hello World");
});

app.listen(port, (req, res) => {
  console.log(`the server is running in port ${port} `);
});
