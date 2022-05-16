const createError = require("http-errors");
const { isValid, prepare, console } = require("../../helpers");



class Controller {
	constructor(Validation, Service){
		console('Controller initiated');
		this.validation = Validation;
		this.service = Service;
		this.fetch = this.fetch.bind(this);
		this.findOne = this.findOne.bind(this);
		this.create = this.create.bind(this);
		this.update = this.update.bind(this);
		this.delete = this.delete.bind(this);
	}


	async fetch(req, res, next) {
		try{
			// process
			const result = await this.service.fetchAll();

			// handle error and send response
			return res.json(prepare(result));
		} catch(err) {
			console(err.message)
			next(createError(500));
		}
	}

	async findOne(req, res, next) {
		try{
			const id = req.params.id;

			// validate
			if(!id) return next(createError(400))

			// process
			const result = await this.service.findOne(id);

			// handle error  response

			return res.json(prepare(result));
			
		} catch(err) {
			console(err.message)
			throw next(createError(500));
		}
	}


	async create(req, res, next) {
		try{
			const data = req.body;

			const validation = this.validation.postDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error);

			const result = await this.service.create(data);

			return res.status(201).json(prepare(result, `${result.title} category created successfully`));
		} catch(err) {
			console(err.message);
			return next(createError(500))
		}
	}


	async update(req, res, next) {
		try{
			const data = req.body;
			const id = req.params.id;

			const validation = this.validation.updateDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error);

			const result = await this.service.update(id, data);

			return res.json(prepare(result, `${result.title} category updated successfully`));
		} catch(err) {
			console(err.message);
			return next(createError(500))
		}
	}

	
	async delete(req, res, next) {
		try{
			const id = req.params.id;
			if(!id) return next(createError(404));

			// process
			const result = await this.service.delete(id);

			// handle error and send response
			return res.json(prepare(result));
		} catch(err) {
			console(err.message)
			return next(createError(500));
		}
	}
}


module.exports = Controller;