const express = require("express");

const {createUserValidator, updateUserValidator}  = require("../middleware/validators/users");
const userService  = require("../services/userService");
const authenticate = require("../middleware/auth");

const router = express.Router();

router.post("/", createUserValidator, (req, res) => {
    const body = req.body;
    if(req.query.login) {
        userService.createUserAndLogin(body)
            .then( userData => {
                return res.status(201).send({
                    data: {
                        user: userData.user.toJSON(),
                        token: userData.token
                    }
                });
            })
            .catch(err => {
                return res.status(500).send({
                    error: {
                        code: 'SERVER_ERROR',
                        message: 'Something went wrong!'
                    }
                });
            });
    }else {
        userService.createUser(body)
            .then( userData => {
                return res.status(201).send({
                    data: {
                        user: userData.toJSON(),
                        token: userData.token
                    }
                });
            })
            .catch(err => {
                return res.status(500).send({
                    error: {
                        code: 'SERVER_ERROR',
                        message: 'Something went wrong!'
                    }
                });
            });
    }
});

router.get("/", authenticate, (req, res) => {
    const user = req.user.toJSON();
    res.send({
        data: {user}
    });
});

router.put("/", authenticate, updateUserValidator, (req, res) => {
    userService.updateUser(req.user, req.body)
        .then(user => {
            res.send({
                data: {
                    user: user.toJSON()
                }
            }); 
        })
        .catch(e => {
            res.status(500).send({
                error: {
                    code: 'SERVER_ERROR',
                    message: 'Something went wrong!'
                }
            })
        })
});

router.delete("/me", authenticate, (req, res) => {
    const userObj = req.user.toJSON();
    userService.deleteUser(req.user)
        .then(result => {
            res.status(204).send();
        })
        .catch( e => {
            res.status(500).send({
                error: {
                    code: 'SERVER_ERROR',
                    message: 'Something went wrong!'
                }
            });
        })
});

module.exports = router;