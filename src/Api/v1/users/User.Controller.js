const { console, prepare, isValid, createUniqueId, resetDateExpiresIn, isResetCodeValid } = require('../../../helpers');
const { jwtOptions } = require('../../../config/auth');
const { hashSync, compareSync } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const {sendEmail, verificationTemplate, resetTemplate} = require('../../../config/email');
const UserValidator = require('./User.Validator');
const UsersService = require('./User.Service');
const Controller = require('../Controller');


class UsersController extends Controller {
	constructor() {
		super(UserValidator, UsersService)
		console('users controller created');
	}

	async fetch(req, res, next){
		try{
			// validation & verification
			// const validation = ProductValidator.searchDto(req.body);
			// const validationHandler = isValid(validation);
			// if(!validationHandler.valid) return next(validationHandler.error)

			// process
			const result = await UsersService.getUsers();

			// handle error & send response
			return res.json(prepare(result));
		}catch(err){
			console(err.message)
			return next(createError(500));
		}
	}

	async fetchOne(req, res, next){
		try{
			// validation & verification
			const {id} = req.user;
			// process
			const result = await UsersService.findOne(id);
			result.password = null;

			// handle error & send response
			return res.json(prepare(result));

		}catch(err){
			console(err.message)
			return next(createError(500));
		}
	}

	async signUp(req, res, next) {
		try{
			//* validation & verification
				const userData = req.body;
				const validation = UserValidator.signUp(userData);
				const validationHandler = isValid(validation);
				if(!validationHandler.valid) return next(validationHandler.error);

			//* process

				//* check username and email for existing user
				const userExists = await UsersService.checkUser(userData.username, userData.email);
				console(userExists)
				if(userExists){
					return res.status(400).json(prepare([], 'user already exists', false));
				}
				else {
					//* hashing password and create user
					userData.code = createUniqueId();
					const user = await UsersService.create(userData);

					//*  generating jwt token 
					const token = jwt.sign( jwtOptions(user.id, user.username, user.roleId), process.env.JWT_SECRET);

					//* sending verification email 
					// ! mail response is ignored 
					const emailData = verificationTemplate(user.username, token);
					sendEmail(emailData.from, user.email, emailData.subject, emailData.body);
					

					//* handle error & send response
					return res.status(201).json(prepare({user, token}));
				}
		}catch(err){
			console(err.message)
			return next(createError(500));
		}
	}


	async login( req, res, next ) {
		try{
			// validation & verification
			const userData = req.body;
			const validation = UserValidator.login(userData);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error);

			const user = await UsersService.checkUser(userData.username, userData.username);
			if(!user){
				return res.json(prepare([], 'user does not exist', false));
			} else {
				const matched = compareSync(userData.password, user.password );
				if(!matched) return res.json(prepare([], 'incorrect password !', false));

				// verify
				if(!user.verified) return res.json(prepare([], 'user is not verified', false));

				// jwt token {id: user.id, username: user.username, role: user.roleId}
				const token = jwt.sign( jwtOptions(user.id, user.username, user.roleId), process.env.JWT_SECRET);

				// handle error & send response
				return res.json(prepare({user, token}));
			}
		}catch(err){
			console(err.message);
			return next(createError(500));
		}
	}

	/**
	 * * Verify customer by token params
	 * ? Model User.verified = true
	 * @param {*} req 
	 * @param {*} res 
	 * @param {*} next 
	 * @returns 
	 */
	async verifyUser(req, res, next) {
		try{
			const { token } = req.params;
			const { id } = jwt.verify(token, process.env.JWT_SECRET);

			const validation = UserValidator.verify({ id, token });
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error);

			const user = await UsersService.checkUser(userData.username, userData.username);

			
			console(result, 'console result : ')
			return result instanceof Error ? res.redirect(process.env.FAILED_VERIFICATION_URL) : res.redirect(process.env.LOGIN_URL);

		} catch(err){
			console(err.message);
			return next(createError(500));
		}
	}

	async forgotCheck(req, res, next) {
		try{
			const { username } = req.params;
			if(!username) return res.status(400).json(prepare([], 'username is required', false));

			const userExists = await UsersService.checkUser(username, username);
			if(!userExists){
				return res.status(404).json(prepare([], 'user does not exist', false));
			}
			else {
				//* 
				const resetCode = createUniqueId();
				const resetExpiresIn = resetDateExpiresIn();
				const user = await UsersService.update(userExists.id, {resetCode, resetExpiresIn});
				user.resetCode = null;
				user.resetExpiresIn = null;
				user.password = null;

				//* sending reset email 
				// ! mail response is ignored 
				const emailData = resetTemplate(userExists.username, resetCode);
				sendEmail(emailData.from, user.email, emailData.subject, emailData.body);
				

				//* handle error & send response
				return res.status(201).json(prepare(user));
			}

		} catch(err){
			console(err.message);
			return next(createError(500));
		}
	}


	async forgotPassword(req, res, next) {
		try{
			const userData = req.body;
			const validation = UserValidator.forgotPass(userData);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error);

			const userExists = await UsersService.checkUser(userData.username, userData.username);
			if(!userExists){
				return res.status(404).json(prepare([], 'user does not exist', false));
			}
			else {
				const isValidCode = isResetCodeValid(userData.resetCode, userExists.resetCode, userExists.resetExpiresIn);
				if(!isValidCode.valid) return res.json(prepare([], isValidCode.message, false))
				
				//* hashing password and create user
				userData.password = hashSync(userData.password, +process.env.BCRYPT_SALT );
				const user = await UsersService.update(userExists.id, {password: userData.password, resetCode: null, resetExpiresIn: null});
				user.password = null;

				//*  generating jwt token 
				const token = jwt.sign( jwtOptions(userExists.id, userExists.username, userExists.roleId), process.env.JWT_SECRET);
				

				//* handle error & send response
				return res.status(201).json(prepare({user, token}, isValidCode.message));
			}

		} catch(err){
			console(err.message);
			return next(createError(500));
		}
	}
}

module.exports = new UsersController();
