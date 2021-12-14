const { User } = require('../models')


module.exports = {
    registerPost: (req, res, next) => {
        User.register(req.body)
            .then(() => {
                res.redirect('/login')
            })
            .catch(err => next(err));
    },

    userRegister: (req, res, next) => {
        User.register(req.body)
    },

    userLogin: async(req, res) => {
        User.authenticate(req.body)
            .then(user => {
                res.json({
                    id: user.id, 
                    username: user.username, 
                    accessToken: user.generateToken()
                })
                console.log("login: " + req.user)
            }).catch(err => {
                res.json(err);
                console.log("ERRORR: " + err)
            })
    },

    me: (req, res) => {
        res.json(req.user)
        console.log(req.user)
    }
}