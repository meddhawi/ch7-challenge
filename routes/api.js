var router = require('express').Router();

//Middlewares
const restrict = require('../middlewares/restrict')
const superAdmin = require('../middlewares/SuperAdmin')

// Controllers
const auth = require('../controller/authController');
const room = require('../controller/room')

router.post('/register', auth.registerPost)
router.post('/login', auth.userLogin);

// Get user details
router.get('/me', restrict, auth.me);
router.get('/you', restrict, superAdmin, auth.me)



//game 
router.post('/create', restrict, room.createRoom)
router.post('/fight/:id', restrict, room.fight)
router.get('/result/:id', room.getResult)







module.exports = router;
