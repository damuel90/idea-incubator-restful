const BaseRepository = require('./base.repository');
let _idea =  null;

class IdeaRepository extends BaseRepository{
    constructor({ Idea }){
        super(Idea);
        _idea = Idea;
    }

    async getUserIdeas(author){
        return await _idea.find({ author });
    }

    async updateIdea(ideaId, userId, entity){
        const updatedIdea = await _idea.updateOne({ _id: ideaId, author: userId }, entity);
        if(updatedIdea.n > 0 && updatedIdea.ok > 0) return true;
        return  false;
    }

    async remove(ideaId, userId){
        const deletedIdea = await _idea.remove({ _id: ideaId, author: userId });
        if(deletedIdea.n > 0 && deletedIdea.ok > 0) return true;
        return  false;
    }

    async vote(ideaId, vote){
        const updatedIdea = await _idea.updateOne({ "_id": ideaId, "votes.user": { $ne: vote.user } }, { $push: { "votes": vote } });
        if(updatedIdea.n > 0 && updatedIdea.ok > 0) return true;
        return  false;
    }

    async updateVote(ideaId, userId, vote){
        const updatedIdea = await _idea.updateOne({ "_id": ideaId, "votes.user": userId }, { $set: { "votes.$.vote": vote } });
        if(updatedIdea.n > 0 && updatedIdea.ok > 0) return true;
        return  false;
    }

    async deleteVote(ideaId, userId){
         await _idea.updateOne({ "_id": ideaId, "votes.user": userId }, {$pull: {votes: { user : userId }}});
        if(updatedIdea.n > 0 && updatedIdea.ok > 0) return true;
        return  false;
    }

    async comment(ideaId, comment){
        const updatedIdea = await _idea.findOneAndUpdate({ "_id": ideaId }, { $push: { "comments": comment } }, { new: true });
        const { comments = [] } = updatedIdea;
        return comments[comments.length-1];
    }

    async updateComment(ideaId, commentId, textComment){
        const updatedIdea = await _idea.updateOne({ "_id": ideaId, "comments._id": commentId }, { $set: { "comments.$.comment": textComment } });
        if(updatedIdea.n > 0 && updatedIdea.ok > 0) return true;
        return  false;
    }

    async deleteComment(ideaId, commentId){
        const updatedIdea = await _idea.updateOne({ "_id": ideaId, "comments._id": commentId }, {$pull: {comments: { _id : commentId }}});
        if(updatedIdea.n > 0 && updatedIdea.ok > 0) return true;
        return  false;
    }
};

module.exports = IdeaRepository;