const { console, prepare, isValid, createUniqueId, resetDateExpiresIn, isResetCodeValid } = require('../../../helpers');

const createError = require('http-errors');

const ClaimValidator = require('./Claim.Validator');
const ClaimService = require('./Claim.Service');
const Controller = require('../Controller');


class UsersController extends Controller {
	constructor() {
		super(ClaimValidator, ClaimService)
		console('users controller initiated');
	}


}

module.exports = new UsersController();
