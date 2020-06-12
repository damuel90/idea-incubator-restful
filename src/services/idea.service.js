const BaseService = require('./base.service');
const { ErrorHelper } = require('../helpers');
let _ideaRepository = null;

class IdeaService extends BaseService{
    constructor({ IdeaRepository }){
        super(IdeaRepository);
        _ideaRepository = IdeaRepository;
    }

    async getUserIdeas(userId){
        if(!userId){
            throw new ErrorHelper(400, 'ideaId must be sent');
        }

        return await _ideaRepository.getUserIdeas(userId);
    }

    async updateIdea(ideaId, userId, entity){
        if(!ideaId){
            throw new ErrorHelper(400, 'ideaId must be sent');
        }
        
        if(!userId){
            throw new ErrorHelper(400, 'userId must be sent');
        }

        return await _ideaRepository.updateIdea(ideaId, userId, entity);
    }

    async remove(ideaId, userId){
        if(!ideaId){
            throw new ErrorHelper(400, 'ideaId must be sent');
        }
        
        if(!userId){
            throw new ErrorHelper(400, 'userId must be sent');
        }

        return await _ideaRepository.remove(ideaId, userId);
    }

    async vote(ideaId, vote){
        if(!ideaId){
            throw new ErrorHelper(400, 'ideaId must be sent');
        }
        return await _ideaRepository.vote(ideaId, vote);
    }

    async updateVote(ideaId, userId, vote) {
        if(!ideaId){
            throw new ErrorHelper(400, 'ideaId must be sent');
        }

        if(!userId){
            throw new ErrorHelper(400, 'userId must be sent');
        }

        return await _ideaRepository.updateVote(ideaId, userId, vote);
    }

    async deleteVote(ideaId, userId) {
        if(!ideaId){
            throw new ErrorHelper(400, 'ideaId must be sent');
        }
        
        if(!userId){
            throw new ErrorHelper(400, 'userId must be sent');
        }

        return await _ideaRepository.deleteVote(ideaId, userId);
    }

    async comment(ideaId, entity){
        if(!ideaId){
            throw new ErrorHelper(400, 'ideaId must be sent');
        }
        return await _ideaRepository.comment(ideaId, entity);
    }

    async updateComment(ideaId, commentId, comment) {
        if(!ideaId){
            throw new ErrorHelper(400, 'ideaId must be sent');
        }

        if(!commentId){
            throw new ErrorHelper(400, 'commentId must be sent');
        }

        return await _ideaRepository.updateComment(ideaId, commentId, comment);
    }

    async deleteComment(ideaId, commentId) {
        if(!ideaId){
            throw new ErrorHelper(400, 'ideaId must be sent');
        }
        
        if(!commentId){
            throw new ErrorHelper(400, 'commentId must be sent');
        }

        return await _ideaRepository.deleteComment(ideaId, commentId);
    }
};

module.exports = IdeaService;