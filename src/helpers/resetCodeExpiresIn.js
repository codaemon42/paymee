module.exports = resetDateExpiresIn = () => {
	const minutes = 10;
	const now = new Date();
	const future = new Date();
    future.setMinutes(now.getMinutes()+minutes)
    return future;
}