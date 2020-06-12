const mongoose = require('mongoose');
const { Schema } = mongoose;
const { compareSync, genSaltSync, hashSync } = require('bcryptjs');

const UserSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            lowercase: true,
            required: [true, '{PATH} is required.']
        },
        username: {
            type: String,
            unique: true,
            lowercase: true,
            required: [true, '{PATH} is required.']
        },
        password:{
            type:String,
            required: [true, '{PATH} is required.']
        },
        avatar:{
            type:String
        }
    },
    { 
        timestamps: {
            createdAt: true, 
            updatedAt: true
        }
    }
);

UserSchema.methods.toJSON = function(){
    let user = this.toObject();
    delete user.password;
    return user;
};

UserSchema.methods.comparePassword = function(password){
    return compareSync(password, this.password);
};

UserSchema.pre('save', async function(next){
    const user = this;

    if(!user.isModified('password')){
        return next();
    }

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(user.password, salt);

    user.password = hashedPassword
    next();
});

module.exports = mongoose.model('user', UserSchema);