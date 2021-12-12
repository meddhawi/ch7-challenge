const { User } = require('../models')

//include passport
const passport = require('../lib/passport')

const bcrypt = require('bcrypt');


module.exports = {
    registerPost: (req, res, next) => {
        User.register(req.body)
            .then(() => {
                res.redirect('/login')
            })
            .catch(err => next(err));
    },
    formRegister: (req, res, next) => {
        res.render('users/register');
    },


    loginPost: passport.authenticate('local', {
        successRedirect: '/users',
        failureRedirect: '/login',
        failureFlash: true // untuk mengaktifkan express flash
    }),

    formLogin: (req, res, next) => {
        res.render('users/login')
    }
}