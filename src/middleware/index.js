const morgan = require('morgan');
const { logger } = require('../config');
const express = require('express');
const auth = require('./auth');
const admin = require('./admin');

module.exports = {
	middleware: (app) =>{
		app.use(morgan('combined', { stream: logger.stream}));
		app.use(express.json());
	},
	auth,
	admin
}