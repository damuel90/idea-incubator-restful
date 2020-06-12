let _authService = null;
let _fileService = null;

class AuthController{
    constructor({ AuthService, FileService }){
        _authService = AuthService;
        _fileService = FileService;
    }

    async signUp(req, res){
        let { body, file } = req;
        if(file){
            const avatar = await _fileService.createFile(file);
            body = {...body, avatar};
        }    
        const createdUser = await _authService.signUp(body);
        return res.status(201).send({
            status: 201,
            user: createdUser
        }); 
    }

    async signIn(req, res){
        const { body } = req;
        const creds = await _authService.signIn(body);
        return res.status(201).send({
            status: 201,
            user: creds
        }); 
    }
};

module.exports = AuthController;