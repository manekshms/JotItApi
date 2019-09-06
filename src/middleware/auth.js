const authService = require("../services/authService");

const authenticate = async (req, res, next) => {
    let token = null;
    let user = null;
    try{
        token = req.header("Authorization").replace("Bearer ", "")
        user = await authService.authenticate(token);
    }catch(e) {
        return res.status(500).send({error: "Something went wrong!"});
    }
    if(!user){
        return res.status(401).send({error: "Unauthorized request"});
    }
    req.user = user;
    req.token = token;
    next();
}

module.exports = authenticate;