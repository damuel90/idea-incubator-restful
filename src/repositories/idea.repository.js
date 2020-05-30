const BaseRepository = require('./base.repository');
const _idea =  null;

class IdeaRepository extends BaseRepository{
    constructor({ Idea }){
        super(Idea);
        _idea = Idea;
    }

    async getUserIdeas(author){
        return await _idea.find({ author });
    }
};

module.exports = IdeaRepository;