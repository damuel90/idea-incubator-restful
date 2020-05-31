const BaseService = require('./base.service');
const { ErrorHelper } = require('../helpers');
let _ideaRepository = null;

class IdeaService extends BaseService{
    constructor({ IdeaRepository }){
        super(IdeaRepository);
        _ideaRepository = IdeaRepository;
    }

    async getUserIdeas(author){
        if(!author){
            const error = new Error();
            error.status = 400;
            error.message = 'userId must be sent';
            throw error;
        }
        return await _ideaRepository.getUserIdeas(author);
    }

    async upVoteIdea(ideaId){
        if(!ideaId){
            throw new ErrorHelper(400, 'ideaId must be sent');
        }

        const idea = await _ideaRepository.get(ideaId);
        
        if(!idea){
            throw new ErrorHelper(404, 'idea does not exist');
        }

        idea.upvotes.push(true);

        return await _ideaRepository.update(ideaId, { upvotes: idea.upvotes });
    }

    async downVoteIdea(ideaId){
        if(!ideaId){
            throw new ErrorHelper(400, 'ideaId must be sent');
        }

        const idea = await _ideaRepository.get(ideaId);
        
        if(!idea){
            throw new ErrorHelper(404, 'idea does not exist');
        }

        idea.downvotes.push(true);

        return await _ideaRepository.update(ideaId, { downvotes: idea.downvotes });
    }
};

module.exports = IdeaService;