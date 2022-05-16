module.exports = isResetCodeValid = (userResetCode, dbResetCode, validityDate) => {
	let result = {
		valid: true,
		message: 'Password changed successfully...'
	}
	if(userResetCode !== dbResetCode) {
		result.valid = false;
		result.message = 'reset code is incorrect';
	}

	const now = new Date();
    const future = new Date(validityDate);
	if(future < now) {
		result.valid = false;
		result.message = 'code has been expired !';
	}
	console.log({result})
    return result;
}