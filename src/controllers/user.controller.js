let _userService = null;
let _fileService = null;
class UserController{
    constructor({ UserService, FileService }){
        _userService = UserService;
        _fileService = FileService;
    }

    async updateAvatar(req, res){
        const { userId } = req.user;
        const { file } = req;
        let avatar = await _fileService.createFile(file); 
        const updatedUser = await _userService.update(userId, { avatar });
        if(!updatedUser) return res.status(500).send({
            status: 500,
            message: 'server error'
        })
        return res.status(201).send({
            status: 201,
            avatar
        });
    }

    async updateUsername(req, res){
        const { userId } = req.user;
        const { username } = req.query;
        const updatedUser = await _userService.update(userId, { username });
        if(!updatedUser) return res.status(500).send({
            status: 500,
            message: 'Server error'
        })
        return res.status(200).send({
            status: 200,
            message: 'Username successfully updated'
        });
    }

    async delete(req, res){
        const { userId } = req.user;
        const deletedUser = await _userService.delete(userId);
        if(!deletedUser) return res.status(200).send({
            status: 200,
            message: 'User does not exist or does not have the correct credentials'
        })
        return res.status(200).send({
            status: 200,
            message: 'User successfully deleted'
        });
    }
};

module.exports = UserController;