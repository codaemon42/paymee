const dev = process.env.DEV_ENV;
module.exports = (message, arg=null) => {
	if(!dev) return;
	console.log(arg? `${arg} : ` : '', message);
}