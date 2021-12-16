var router = require('express').Router();

//Middlewares
const restrict = require('../middlewares/restrict')

// Controllers
const auth = require('../controller/authController');
const room = require('../controller/room')

router.post('/register', auth.userRegister)
router.post('/login', auth.userLogin);

// Get user details
router.get('/me', restrict, auth.me);


//game 
router.post('/create', restrict, room.createRoom)
router.post('/fight/:id', restrict, room.fight)




module.exports = router;
