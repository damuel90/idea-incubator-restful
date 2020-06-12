const { ErrorHelper } = require('../helpers');

class BaseService{
    constructor(repository){
        this.repository = repository;
    }

    async get(id){
        if(!id){
            throw new ErrorHelper(400, 'id must be sent');
        }

        const currentEntity = await this.repository.get(id);

        if(!currentEntity){
            throw new ErrorHelper(404, 'entity does not found');
        }

        return currentEntity;
    }

    async getAll(pageSize, pageNum, sort){
        return await this.repository.getAll(pageSize, pageNum, sort);
    }

    async create(entity){
        return await this.repository.create(entity);
    }

    async update(id, entity){
        if(!id){
            throw new ErrorHelper(404, 'id must be sent');
        }

        return await this.repository.update(id, entity);
    }

    async delete(id){
        if(!id){
            throw new ErrorHelper(404, 'id must be sent');
        }

        return await this.repository.delete(id);
    }
};

module.exports = BaseService;