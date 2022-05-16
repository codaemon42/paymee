const { Router } = require('express');
const { auth, admin } = require('../../../middleware');
const UserController = require('./User.Controller');
const userRouter = Router();

userRouter
.get('/', auth, admin, UserController.fetch)
.get('/single', auth, UserController.fetchOne)
.post('/', UserController.signUp)
.post('/login', UserController.login)
.get('/verify/:token', UserController.verifyUser)
.get('/forgot/check/:username', UserController.forgotCheck)
.post('/forgot/reset', UserController.forgotPassword)


module.exports = userRouter;