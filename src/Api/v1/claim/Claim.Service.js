const console = require("../../../helpers/console");
const createError = require('http-errors');
const { Claim } = require("../Model");
const Service = require("../Service");


class ClaimService extends Service {
	constructor() {
		super(Claim);
		console(`${this.model.name} service initiated`);
	}


}

module.exports = new ClaimService();