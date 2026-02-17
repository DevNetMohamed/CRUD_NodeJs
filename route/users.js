const express = require('express');
const router = express.Router();
const {SaveUsers, GetAll, GetById} = require('../controler/users');

router.post('/', SaveUsers)
router.get('/', GetAll)
router.get('/', GetById)
module.exports = router;