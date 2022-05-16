const createError = require('http-errors');


module.exports = (req, res, next) => {
    try{
        const {role} = req.user;
		if(role && role === 1) {
			next();
		}
        else {
			return next(createError(401));
		}
    }
    catch(err){
        next(createError(401));
    }
}