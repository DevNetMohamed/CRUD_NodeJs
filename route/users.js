const express = require("express");
const router = express.Router();
const { SaveUsers, GetAll, GetById, UserLogin } = require("../controler/users");
const { auth, restrictTO } = require("../middlewares/auth");

// router.use(auth)
router.post("/", auth, restrictTO("admin"), SaveUsers); // admin
router.post("/login",auth, UserLogin);
router.get("/", auth, restrictTO("admin", "user"), GetAll); //admin or User
router.get("/", auth, restrictTO("admin", "user"), GetById); //admin or User

module.exports = router;
