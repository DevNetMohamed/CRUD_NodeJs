const express = require('express');
const router = express.Router();
const {SaveUsers, GetAll, GetById, UserLogin} = require('../controler/users');
const { auth } = require('../middlewares/auth');


// router.use(auth)
router.post('/', SaveUsers)
router.post('/login', UserLogin)
router.get('/', GetAll)
router.get('/', GetById)


module.exports = router;