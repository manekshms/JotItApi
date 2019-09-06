const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../../config");

const login = async (user) => {
    const token = generateAuthToken(user);
    user.tokens.push({token});
    try{
        await user.save()
    }catch(e) {
        throw new Error("Something went wrong!");
    }
    return {user, token};
}

const checkLogin = async (username, password) => {
    let user = null;
    try{
        user = await User.findUserByUsernameAndPassword(username, password);
    }catch(e) {
        throw new Error("Somthing went wrong!");
    }
    if(!user) {
        throw new Error("Invalid Credentials");
    }
    return await login(user);
}

const logout = async (user, token) => {
    user.tokens = user.tokens.filter(item => {
       item.token != token 
    });
    try{
        await user.save();
    }catch(e) {
        throw new Error("Something went wrong!");
    }
};

const logoutAll = async (user) => {
    user.tokens = [];
    try {
        await user.save();
    }catch(e) {
        throw new Error("Something went wrong!");
    }
}

const authenticate = async (token) => {
    let decodedToken = null;
    try{
        decodedToken = jwt.verify(token, config.jwtSecret);
    }catch(e) {
        return false;
    }
    const user = User.findOne({_id: decodedToken.id, 'tokens.token' : token});
    return user;
}

const generateAuthToken = (user) => {
    const token = jwt.sign({id: user._id}, config.jwtSecret);
    return token;
}

module.exports = {
    login,
    checkLogin,
    authenticate,
    logout,
    logoutAll
}