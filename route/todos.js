const express = require('express');
const router = express.Router();
const {SaveTodos, GetAllTodos, viewTodos} = require('../controler/todos');
const { auth } = require('../middlewares/auth');

// router.use(auth)
router.post('/', SaveTodos);
router.get('/', GetAllTodos);
router.get('/getall', GetAllTodos);
router.get('/viewtodos', viewTodos);




module.exports = router;