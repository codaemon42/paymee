const errorHandler = require('./errorHandler');


/**
 * Prepare the data from service for proper response
 * @param {Error | Array | Any} result 
 * @param {String} message | default=successful
 * @returns {Boolean, Array|Any, String} {success, result, message}
 */

module.exports = (result, message='successful', success=true) => {
	const error = errorHandler(result);
	if(error) return {success: false, result: [], message: error.message}
	if(!success) return {success: false, result: [], message}
	return {success, result, message};
}