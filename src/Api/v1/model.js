const User = require("./users/user.model");
const UserRole = require("./users/userRole/UserRole.model");
const Claim = require('./claim/claim.model');
const ClaimDetails = require('./claim/claimDetails/claimDetails.model');

// sync
// User.sync({alter: true});
// UserRole.sync({alter: true});
// Claim.sync({alter: true})
// ClaimDetails.sync({alter: true})

// relations
User.hasOne(UserRole, {
	foreignKey: 'id',
	sourceKey: 'roleId'
});
Claim.hasOne(ClaimDetails, {
	foreignKey: 'claimId',
	sourceKey: 'id'
})

module.exports = {
	User,
	UserRole,
	Claim,
	ClaimDetails
}