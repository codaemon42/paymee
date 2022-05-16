require('dotenv').config();
const express = require('express');
const cors = require('cors');
const createError = require('http-errors');

const { middleware } = require('./src/middleware');
const { logger } = require('./src/config');
const { console, prepare } = require('./src/helpers');
const apiV1Routers = require('./src/Api/v1/routes');

const app = express();
const port = process.env.PORT || 3000;


// handle rejection
app.use('unhandledRejection', (reason) => {
	logger.error(reason);
	process.exit(1);
});

// cors
app.use(cors({
	origin: '*',
	optionsSuccessStatus: 200
}));

// middleware
middleware(app);

// routes
app.use('/api/v1', apiV1Routers);

// unmatched route handle errors
app.use((req, res, next)=>{
	const error = createError(404);
	next(error);
})

// logging errors
app.use((error, req, res, next) => {
	console(error);
	logger.error(error.message);
	res.statusCode = error.statusCode;
	res.json(prepare(error));
})

// listen
app.listen(port, ()=>{
	console(`server is listening at port ${port}`);
})