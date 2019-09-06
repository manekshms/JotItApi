const User = require("../models/user");
const authService = require("./authService");

const createUser = async (userData) => {
    const user = new User(userData);
    try{
        await user.save();
        return user;
    }catch(e) {
        throw new Error("Something went worng!");
    }
}

const createUserAndLogin = async (userData) => {
   const user = await createUser(userData); 
   const loginData = await authService.login(user);
   return loginData;
}

const updateUser = async (user, userData) => {
    Object.keys(userData).forEach(key => {
        user[key] = userData[key];
    })
    try {
        await user.save();
    }catch(e) {
        throw new Error("Something went wrong!");
    }
    return user;
}

const deleteUser = async (user) => {
    try{
        await user.delete();
    }catch(e) {
        throw new Error("Something went wrong!");
    }
}

module.exports = {
    createUser,
    createUserAndLogin,
    updateUser,
    deleteUser
}