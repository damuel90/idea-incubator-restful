const BaseService = require('./base.service');
const { ErrorHelper } = require('../helpers');
let _commentRepository = null;
let _ideaRepository = null;

class CommentService extends BaseService{
    constructor({ CommentRepository, IdeaRepository }){
        super(CommentRepository);
        _commentRepository = CommentRepository;
        _ideaRepository = IdeaRepository;
    }

    async getIdeaComments(ideaId){
        if(!ideaId){
            throw new ErrorHelper(400, 'ideaId must be sent');
        }

        const idea = await _ideaRepository.get(ideaId);
        
        if(!idea){
            throw new ErrorHelper(404, 'idea does not exist');
        }

        const { comments } = idea;

        return comments;
    }

    async createComment(comment, ideaId){
        if(!ideaId){
            throw new ErrorHelper(400, 'ideaId must be sent');
        }

        const idea = await _ideaRepository.get(ideaId);
        
        if(!idea){
            throw new ErrorHelper(404, 'idea does not exist');
        }

        const createdComment = await _commentRepository.create(comment);

        idea.comments.push(createdComment);

        return await _ideaRepository.update(ideaId, { comments: idea.comments });
    }
};

module.exports = CommentService;