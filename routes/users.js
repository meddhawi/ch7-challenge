var router = require('express').Router();

//Middlewares
const restrict = require('../middlewares/restrict')

// Controllers
const auth = require('../controllers/authController');

router.get('/', restrict ,(req, res) => {
    res.status(200).json({'message': "HALLO"})
})

router.get('/register', (req, res) => res.render('users/register'))
router.post('/register', auth.registerPost)


module.exports = router;
