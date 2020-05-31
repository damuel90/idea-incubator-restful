const { JwtHelper } = require('../helpers');
const { ErrorHelper } = require('../helpers');
let _userService =  null;

class AuthService{
    constructor({ UserService }){
        _userService = UserService;
    }

    async signUp(user){
        const { username } = user;
        const userExist = await _userService.getUserByUsername(username);
        if(userExist){
            throw new ErrorHelper(401, 'User already exists');
        }

        return await _userService.create(user);
    }

    async signIn(user){
        const { username, password } = user;
        const userExist = await _userService.getUserByUsername(username);
        if(!userExist){
            throw new ErrorHelper(401, 'User does not exists');
        }

        const validPassword = userExist.comparePassword(password)
        if(!validPassword){
            throw new ErrorHelper(401, 'Invalid password');
        }
        
        const userToEncode = {
            username: userExist.username,
            id: userExist._id
        }
        
        const token = JwtHelper.generateToken(userToEncode);

        return { user: userExist, token };
    }
};

module.exports = AuthService;