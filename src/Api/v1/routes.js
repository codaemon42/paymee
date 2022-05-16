const { Router } = require('express');
const userRouter = require('./users/user.router');
const claimRouter = require('./claim/claim.router');
const router = Router();

router
.use('/users', userRouter)
.use('/claims', claimRouter)
.get('/', (req, res, next) => {

		res.send('hello world, are you bold ? ')
})


module.exports = router;