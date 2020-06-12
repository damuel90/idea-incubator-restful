const { Router } = require('express');
const { AuthMiddleware, UploadMiddleware } = require('../middlewares');

module.exports = function({ UserController }){
    const router = Router();
    router.patch('/username', [AuthMiddleware], UserController.updateUsername);
    router.patch('/avatar', [AuthMiddleware, UploadMiddleware.single('avatar')], UserController.updateAvatar);
    router.delete('/delete', [AuthMiddleware], UserController.delete);

    return router;
};