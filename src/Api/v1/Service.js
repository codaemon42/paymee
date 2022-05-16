const console = require("../../helpers/console");
const createError = require('http-errors');

class Service {

	constructor(model){
		this.model = model;
	}

	async fetchAll() {
		try {
			return await this.model.findAndCountAll();
		} catch(err) {
			console(err, `${this.model.name} get`)
			throw createError(500);
		}
	}

	async create(data) {
		try{
			return await this.model.create(data);
		} catch(err) {
			console(err, `${this.model.name} create`)
			return createError(500);
		}
	}

	async findOne(id) {
		try{
			const item = await this.model.findByPk(id)
			if(!item) {
				return createError(404);
			}else{
				return item;
			}
		} catch(err) {
			console(err, `${this.model.name} update id: ${id}`)
			throw createError(500);
		}
	}

	async update(id, data) {
		try{
			const item = await this.findOne(id);
			if(item instanceof Error) return item;
			return await item.update(data);
		} catch(err) {
			console(err, `${this.model.name} update id: ${id}`)
			return createError(500);
		}
	}

	async delete(id) {
		try{
			return await this.model.destroy({where: {id}});
		} catch(err) {
			console(err, `${this.model.name} delete id: ${id}`)
			return createError(500);
		}
	}
}
module.exports = Service;