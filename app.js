const express = require('express')
const app = express()
const port = process.env.port || 8000;

// Setting template engine EJS
app.set('view engine', 'ejs')

//set support body 
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

//important to link css and other static file that in public folder
app.use(express.static('public'));

var path = require ('path');
app.use(express.static(path.join(__dirname + '../public')));

// include session & flash
// const session = require('express-session')
const flash = require('express-flash')

//routes
var usersRouter = require('./routes/users')

// setting session handler
// app.use(session({
//     secret: 'cY@05#lP^nX1%MzLx$n3RwUBqQ1UQCWSs6DptBMumJI4kuRjFL',
//     resave: false,
//     saveUninitialized: false
// }));
  
  
//Setting session passport
const passport = require('./lib/passport')
app.use(passport.initialize())
app.use(passport.session())
  
// setting flash
app.use(flash());

//routes



 
app.listen(port, () => {
  console.log(`Go to http://localhost:${port}`)
})

