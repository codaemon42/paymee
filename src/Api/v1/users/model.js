const { DataTypes } = require("sequelize");
const sequelize = require('../../config/mysql.db');

const User = sequelize.define('users',{
	id: {
		type: DataTypes.BIGINT,
		autoIncrement: true,
		primaryKey: true
	},
	username: {
		type: DataTypes.STRING
	},
	firstName: {
		type: DataTypes.STRING
	},
	lastName: {
		type: DataTypes.STRING
	},
	email: {
		type: DataTypes.STRING,
		validate: {
			isEmail: true
		}
	},
	phone: {
		type: DataTypes.STRING
	},
	password: {
		type: DataTypes.STRING,
	},
	profileImage: {
		type: DataTypes.STRING
	},
	token: {
		type: DataTypes.STRING
	},
	verified: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
	roleId: {
		type: DataTypes.INTEGER,
		defaultValue: 2
	}
});

module.exports = User;