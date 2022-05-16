const { DataTypes } = require("sequelize");
const sequelize = require('../../../config/postgres.db');

const Claim = sequelize.define('claims',{
	id: {
		type: DataTypes.BIGINT,
		autoIncrement: true,
		primaryKey: true
	},
	type: {
		type: DataTypes.STRING,
		scopes: ['individual', 'business']
	},
	name: {
		type: DataTypes.STRING
	},
	address: {
		type: DataTypes.STRING
	},
	town: {
		type: DataTypes.STRING,
	},
	postCode: {
		type: DataTypes.INTEGER
	},
	state: {
		type: DataTypes.STRING
	},
	acnNumber: {
		type: DataTypes.INTEGER,
	}
});

module.exports = Claim;