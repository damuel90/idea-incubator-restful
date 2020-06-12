const { 
    createContainer, 
    asClass, 
    asValue, 
    asFunction 
} = require('awilix');
// config
const config = require('../config');
const app = require('.');
//services
const { 
    UserService, 
    AuthService,
    IdeaService, 
    FileService 
} = require('../services');
// controller
const { 
    UserController,
    AuthController, 
    IdeaController    
} = require('../controllers');
// routes
const Routes = require('../routes');
const { 
    UserRoutes, 
    AuthRoutes,
    IdeaRoutes    
} = require('../routes/index.routes');
// models
const { 
    User, 
    Idea
} = require('../models');
// repositories
const { 
    UserRepository, 
    IdeaRepository, 
    FileRepository 
} = require('../repositories');

const container = createContainer();

container
    .register({
        app: asClass(app).singleton(),
        router: asFunction(Routes).singleton(),
        config: asValue(config)
    })
    .register({
        UserRoutes: asFunction(UserRoutes).singleton(),
        AuthRoutes: asFunction(AuthRoutes).singleton(),
        IdeaRoutes: asFunction(IdeaRoutes).singleton()       
    })
    .register({
        UserController: asClass(UserController.bind(UserController)).singleton(),
        AuthController: asClass(AuthController.bind(AuthController)).singleton(),
        IdeaController: asClass(IdeaController.bind(IdeaController)).singleton()
    })
    .register({
        UserService: asClass(UserService).singleton(),
        AuthService: asClass(AuthService).singleton(),
        IdeaService: asClass(IdeaService).singleton(),
        FileService: asClass(FileService).singleton()
    })
    .register({
        UserRepository: asClass(UserRepository).singleton(),
        IdeaRepository: asClass(IdeaRepository).singleton(),
        FileRepository: asClass(FileRepository).singleton()
    })
    .register({
        User: asValue(User),
        Idea: asValue(Idea),
    })

module.exports = container;