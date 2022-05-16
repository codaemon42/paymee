const { DataTypes } = require("sequelize");
const sequelize = require('../../../../config/postgres.db');

const ClaimDetails = sequelize.define('claimsDetails',{
	id: {
		type: DataTypes.BIGINT,
		autoIncrement: true,
		primaryKey: true
	},
	debtType: {
		type: DataTypes.STRING,
	},
	totalOwed: {
		type: DataTypes.STRING
	},
	totalReceived: {
		type: DataTypes.STRING
	},
	existingClaimId: {
		type: DataTypes.STRING,
	},
	inCourt: {
		type: DataTypes.BOOLEAN,
            default: false
	},
	claimId: {
		type: DataTypes.INTEGER
	}
});

module.exports = ClaimDetails;