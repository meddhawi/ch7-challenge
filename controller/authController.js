const { User } = require('../models')
const sequelize = require('sequelize')


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
            .then(result => res.json("Registered!"))
            .catch(err => {
                res.json(err)
            })
    },

    userLogin: async(req, res) => {
        User.authenticate(req.body)
            .then(user => {
                res.json({
                    id: user.id, 
                    username: user.username, 
                    accessToken: user.generateToken()
                });
            }).catch(err => {
                res.json(err);
                console.log("ERROR: " + err)
            })
    },

    me: (req, res, next) => {
        res.json(req.user)
        console.log(req.user.role + typeof req.user.role)
    },

    playerUser: (req, res, next) => {
        // console.log(req.user)
        if (req.user.role === "PlayerUser") {
          next();
        } else {
          res.status(401).json({
            message: 'you are not authorize to access this endpoint',
          });
        }
      }
}