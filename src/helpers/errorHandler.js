const console = require('./console');
/**
 * Check if the passed data is an instance of error or not
 * @param {*} error 
 * @returns Error | false
 */
module.exports = (error) => {
	console(error);
	if(error instanceof Error){
		error.statusCode = error.statusCode ? error.statusCode : 500;
		return error;
	}
	return false;
}