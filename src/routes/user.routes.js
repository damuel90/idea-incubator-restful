const { Router } = require('express');
const { AuthMiddleware } = require('../middlewares');

module.exports = function({ UserController }){
    const router = Router();

    router.get('/:userId', [AuthMiddleware], UserController.get);
    router.get('/', UserController.getAll);
    router.patch('/:userId', UserController.update);
    router.delete('/:userId', UserController.delete);

    return router;
};