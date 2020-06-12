const { Router } = require('express');
const { ParseIntMiddleware, AuthMiddleware, UploadMiddleware } = require('../middlewares');

module.exports = function({ IdeaController }){
    const router = Router();

    router.post('/', [AuthMiddleware, UploadMiddleware.array('sketches')], IdeaController.create);
    router.get('/',  [ParseIntMiddleware], IdeaController.getAll);    
    router.get('/:userId',  [ParseIntMiddleware], IdeaController.getUserIdeas);    
    router.put('/', [AuthMiddleware, UploadMiddleware.array('sketches')], IdeaController.update);
    router.delete('/:ideaId', [AuthMiddleware], IdeaController.delete);
    // votes
    router.post('/vote', AuthMiddleware, IdeaController.vote);
    router.patch('/vote', AuthMiddleware, IdeaController.updateVote);
    router.delete('/:ideaId/vote', AuthMiddleware, IdeaController.deleteVote);
    // comments
    router.post('/comment', AuthMiddleware, IdeaController.comment);
    router.patch('/comment', AuthMiddleware, IdeaController.updateComment);
    router.delete('/:ideaId/:commentId', AuthMiddleware, IdeaController.deleteComment);

    return router;
};