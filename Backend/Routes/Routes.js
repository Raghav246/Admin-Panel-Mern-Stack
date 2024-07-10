const express = require('express');
const { registerUser, loginUser, getUsers,updateUser,getUser,DeleteUser } = require('../Controller/Controller');
const authMiddleware = require('../Middlewares/Middleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users',getUsers);
router.get('/user/:id',getUser);
router.put('/update/:id',updateUser)
router.delete('/delete/:id',DeleteUser)
module.exports = router;
