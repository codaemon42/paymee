const createError = require('http-errors');
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    console.log("auth is entered");
    if(!req.get('Authorization')){
        console.log("unauthorized");
        return next(createError(401));
    }
    console.log("auth before secret");
    const secret = process.env.JWT_SECRET;
    const token = req.get('Authorization').split(' ')[1];
    console.log("token : ", token);

    try{
        const decode = jwt.verify(token, secret);
        console.log(decode);
        if(typeof decode.id === 'undefined') return next(createError(401))
        req.user = {id: decode.id, username: decode.username, role: decode.role};
        console.log("auth");
        next();
    }
    catch(err){
        next(createError(401));
    }
}