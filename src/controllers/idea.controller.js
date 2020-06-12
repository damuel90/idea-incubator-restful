let _ideaService = null;
let _fileService = null;

class IdeaController{
    constructor({ IdeaService, FileService }){
        _ideaService = IdeaService;
        _fileService = FileService;
    }

    // idea

    async create(req, res){
        let { body, user: { userId }, files } = req;
        if(files){
            const sketches = await _fileService.createFiles(files);
            body = {...body, sketches};
        }
        body = { ...body, author: userId };
        const createdIdea = await _ideaService.create(body);
        return res.status(201).send({
            status: 201,
            idea: createdIdea
        });
    }

    async getAll(req, res){
        const { pageSize, pageNum } = req.query;
        const ideas = await _ideaService.getAll(pageSize, pageNum, '-createdAt');
        return res.status(201).send({
            status: 201,
            ideas
        });
    }

    async getUserIdeas(req, res){
        const { userId } = req.params;
        const ideas = await _ideaService.getUserIdeas(userId);
        return res.status(201).send({
            status: 201,
            ideas
        });
    }

    async update(req, res){
        let { body, files, user: { userId } } = req;
        if(files.length > 0){
            const sketches = await _fileService.createFiles(files);
            body = {...body, sketches};
        }
        let { ideaId, ...entity } = body;
        const updatedIdea = await _ideaService.updateIdea(ideaId, userId, entity);
        if(!updatedIdea) return res.status(200).send({
            status: 200,
            message: 'Idea does not exist or does not have the correct credentials'
        })
        return res.status(200).send({
            status: 200,
            message: 'Idea successfully updated'
        });
    }

    async delete(req, res){
        const { userId } = req.user;
        const { ideaId } = req.params;
        const deletedIdea = await _ideaService.remove(ideaId, userId);
        if(!deletedIdea) return res.status(200).send({
            status: 200,
            message: 'Idea does not exist or does not have the correct credentials'
        })
        return res.status(200).send({
            status: 200,
            message: 'Idea successfully deleted'
        });
    }

    // votes

    async vote(req, res){
        const { body: { ideaId, vote }, user: { userId } } = req;
        const updatedIdea = await _ideaService.vote(ideaId, { vote, user: userId });
        if(!updatedIdea) return res.status(200).send({
            status: 200,
            message: 'Idea does not exist or does not have the correct credentials'
        })
        return res.status(200).send({
            status: 200,
            message: 'Vote successfully added'
        });
    }

    async updateVote(req, res){
        const { body: { ideaId, vote }, user: { userId } } = req;
        const updatedIdea = await _ideaService.updateVote(ideaId, userId, vote);
        if(!updatedIdea) return res.status(200).send({
            status: 200,
            message: 'Vote does not exist or does not have the correct credentials'
        })
        return res.status(200).send({
            status: 200,
            message: 'Vote successfully updated'
        });
    }

    async deleteVote(req, res){
        const { userId } = req.user;
        const { ideaId } = req.params;
        const updatedIdea = await _ideaService.deleteVote(ideaId, userId);
        if(!updatedIdea) return res.status(200).send({
            status: 200,
            message: 'Idea does not exist or does not have the correct credentials'
        })
        return res.status(200).send({
            status: 200,
            message: 'Vote successfully deleted'
        });
    }

    // comment

    async comment(req, res){
        const { body: { ideaId, comment }, user: { userId } } = req;
        const createdComment = await _ideaService.comment(ideaId, { comment, createdAt: Date.now(), user: userId });
        return res.status(201).send({
            status: 201,
            comment: createdComment
        });
    }

    async updateComment(req, res){
        const { body: { ideaId, commentId, comment } } = req;
        const updatedIdea = await _ideaService.updateComment(ideaId, commentId, comment);
        if(!updatedIdea) return res.status(200).send({
            status: 200,
            message: 'Idea does not exist or does not have the correct credentials'
        })
        return res.status(200).send({
            status: 200,
            message: 'Comment successfully updated'
        });
    }

    async deleteComment(req, res){
        const { ideaId, commentId } = req.params;
        const updatedIdea = await _ideaService.deleteComment(ideaId, commentId);
        if(!updatedIdea) return res.status(200).send({
            status: 200,
            message: 'Idea does not exist or does not have the correct credentials'
        })
        return res.status(200).send({
            status: 200,
            message: 'Comment successfully deleted'
        });
    }
};

module.exports = IdeaController;