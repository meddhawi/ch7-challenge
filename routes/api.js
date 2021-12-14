var router = require('express').Router();

//Middlewares
const restrict = require('../middlewares/restrict')

// Controllers
const auth = require('../controller/authController');


router.post('/register', auth.userRegister)
router.post('/login', auth.userLogin);

// Get user details
router.get('/me', restrict, auth.me);

// router.get('/register', (req, res) => res.render('users/register'))



module.exports = router;
