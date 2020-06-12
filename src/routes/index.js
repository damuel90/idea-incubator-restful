const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
require('express-async-errors');
const { NotFoundMiddleware, ErrorMiddleware } = require('../middlewares');

module.exports = function({ UserRoutes, AuthRoutes, IdeaRoutes }){
    const router = express.Router();
    const apiRoutes = express.Router();

    apiRoutes
        .use(logger('dev'))
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: false }))
        .use(cors())
        .use(helmet())
        .use(compression())
        .use('/uploads', express.static(__dirname +'/uploads'));

        apiRoutes.use('/user', UserRoutes);
        apiRoutes.use('/auth', AuthRoutes);
        apiRoutes.use('/idea', IdeaRoutes);

        router.use('/v1/api', apiRoutes);

        router.use(NotFoundMiddleware);
        router.use(ErrorMiddleware);

        return router;
}