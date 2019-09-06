const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxLength: 20
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: 5,
        maxLength: 20
    },
    age: {
        type: Number,
        required: true,
        trim: true,
        min: 10,
        max: 100
    },
    gender: {
        type: String,
        match: /male|female/,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        match: /^[a-zA-Z0-9]*[a-zA-Z0-9]$/,
        minLength: 5,
        maxLength: 20,
        required: true,
        trim: true
    },
    password: {
        type: String,
        maxLength: 400,
        required: true,
        trim: true
    },
    photo: {
        type: Buffer
    },
    tokens: [
        {
            token: {
                type: String,
                require: true
            }
        }
    ]
},
{
    timestamps: true
});

userSchema.statics.findUserByUsernameAndPassword = async (username, password) => {
    const user = await User.findOne({username});
    if(!user) {
        return false;
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if(isValidPassword){
        return user;
    }
    return false;
}

userSchema.methods.toJSON = function(){
    const user = this;
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.tokens;
    userObj.id = userObj._id
    delete userObj._id;
    delete userObj.__v;
    return userObj;
}

userSchema.pre("save", async function(next){
    const user = this;
    if(user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;