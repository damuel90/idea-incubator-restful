const { JwtHelper } = require('../helpers');
const { ErrorHelper, IsEmailHelper } = require('../helpers');
let _userService =  null;

class AuthService{
    constructor({ UserService }){
        _userService = UserService;   
    }

    async signUp(user){
        let { username, email } = user;
        username = username.toLocaleLowerCase();
        email = email.toLocaleLowerCase();
        const emailExist = await _userService.getUserByEmail(email);
        if(emailExist){
            throw new ErrorHelper(401, 'Email already exists');
        }

        const userExist = await _userService.getUserByUsername(username);
        if(userExist){
            throw new ErrorHelper(401, 'Username already exists');
        }
        
        const createdUser = await _userService.create({ ...user, email, username });
      
        const userToEncode = {
            email: createdUser.email,
            username: createdUser.username,
            avatar: createdUser.avatar,
            userId: createdUser._id
        }
        const token = JwtHelper.generateToken(userToEncode);

        return { ...userToEncode, token };
    }

    async signIn(user){
        const { username, password } = user;
        const isEmail = IsEmailHelper(username);

        let userExist = null;
        if(isEmail){
            userExist = await _userService.getUserByEmail(username);
        } else {
            userExist = await _userService.getUserByUsername(username);
        }
       
        if(!userExist){
            throw new ErrorHelper(401, 'User does not exists');
        }

        const validPassword = userExist.comparePassword(password)
        if(!validPassword){
            throw new ErrorHelper(401, 'Invalid password');
        }
        
        const userToEncode = {
            email: userExist.email,
            username: userExist.username,
            avatar: userExist.avatar,
            userId: userExist._id
        }
        const token = JwtHelper.generateToken(userToEncode);

        return { ...userToEncode, token };
    }
};

module.exports = AuthService;