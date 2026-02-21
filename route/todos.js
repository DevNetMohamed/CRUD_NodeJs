const express = require('express');
const router = express.Router();
const {SaveTodos, GetAllTodos} = require('../controler/todos')

router.post('/', SaveTodos);
router.get('/gatall', GetAllTodos);



module.exports = router;