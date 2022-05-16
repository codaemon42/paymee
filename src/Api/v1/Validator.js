const joi = require('@hapi/joi');


class Validator {
	constructor(){
		this.joi = joi;
	}

	searchDto(data) {
		return joi.object({
			title: joi.string().optional(),
			page: joi.number().optional(),
			limit: joi.number().optional()
		}).validate(data);
	}

}

module.exports = Validator;