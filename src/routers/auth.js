const express = require("express");

const authService = require("../services/authService");
const authenticate = require("../middleware/auth");

const router = express.Router();

router.post("/login", (req, res)=>{
    const body = req.body;
    authService.checkLogin(body.username, body.password)
        .then( authData => {
            return res.status(200).send({
                data: {
                    user: authData.user.toJSON(),
                    token: authData.token
                }
            });
        })
        .catch(e => {
            res.status(400).send({
                error: {
                    code: 'AUTH_FAIL',
                    message: e.message
                }
            });
        })
});

router.get("/logout", authenticate, (req, res) => {
    authService.logout(req.user, req.token);
    res.status(204).send();
});

router.get("/logout-all", authenticate, (req, res) => {
    authService.logoutAll(req.user);
    res.status(204).send();
});

module.exports = router;