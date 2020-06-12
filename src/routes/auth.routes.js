const { Router } = require('express');
const { UploadMiddleware } = require('../middlewares');

module.exports = function({ AuthController }){
    const router = Router();

    router.post('/signup', UploadMiddleware.single('avatar'), AuthController.signUp);
    router.post('/signin', AuthController.signIn);

    return router;
};