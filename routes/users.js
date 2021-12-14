var router = require('express').Router();

//Middlewares
const restrict = require('../middlewares/restrict')

// Controllers
const auth = require('../controller/authController');

router.get('/' ,(req, res) => {
    // res.status(200).json({'message': "HALLO"})
})

router.get('/register', (req, res) => res.render('register'))
router.post('/register', auth.registerPost)

router.get('/login', (req, res) => res.render('login'))
router.post('/login', auth.userLogin)

router.get('/me', auth.me)


module.exports = router;
