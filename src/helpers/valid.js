module.exports = (validation) => {
	if( validation.error ) {
		const error = new Error(validation.error.message);
		error.statusCode = 400;
		return {valid: false, error};
	}
	return {valid: true, error: null}
}