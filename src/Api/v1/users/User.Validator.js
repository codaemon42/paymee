const Validator = require("../Validator");


class UserValidator extends Validator {

	signUp(data) {
		return this.joi.object({
			firstName: this.joi.string().optional(),
			lastName: this.joi.string().optional(),
			username: this.joi.string().required(),
			email: this.joi.string().required().email(),
			phone: this.joi.string().optional(),
			password: this.joi.string().required()
		}).validate(data);
	}

	login(data){
		return this.joi.object({
			username: this.joi.string().required(),
			password: this.joi.string().required()
		}).validate(data);
	}

	forgotPass(data) {
		return this.joi.object({
			username: this.joi.string().required(),
			password: this.joi.string().required(),
			resetCode: this.joi.string().required()
		}).validate(data);
	}

	verify(data) {
		return this.joi.object({
			id: this.joi.number().required(),
			token: this.joi.string().required()
		}).validate(data);
	}
}

module.exports = new UserValidator();