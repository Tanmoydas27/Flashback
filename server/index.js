const express = require('express');
const dotenv = require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

require('./DB/databaseConn.js');

const User = require('./Schema/UserSchema.js');
const userRoute = require('./routes/user.js');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(
    cors({
        origin: process.env.REACT_APP_PORT,
        methods: "GET, POST, PUT, DELETE",
        credentials: true,

    })
);

app.use('/home',userRoute);

app.use(express.json());
app.use(
    session({
        secret:"enteryoursession1234567890",
        resave: false,
        saveUninitialized: true
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.SECRET_ID,
    callbackURL: "http://localhost:3002/auth/google/callback",
    userProfileURL : "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleid: profile.id },{name: profile.displayName, emailid: profile.emails[0].value , profile_image: profile.photos[0].value}, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(user, done){
    done(null, user)
    
});

app.get('/auth/google',passport.authenticate("google", {scope: ['profile', 'email']}));

app.get('/auth/google/callback',
  passport.authenticate("google", {
        successRedirect: '/home',
        failureRedirect: process.env.REACT_APP_PORT+'/login'
    }),
);


app.get('/login/success', async (req, res)=>{
    if(req.user){
        res.status(200).json({message:"User Authorized", user: req.user})
    }else{
        res.status(400).json({message:"Not Authorized"})

    }
});

app.get('/logout', function(req, res, next){
    req.logout(function(err){
        if(err){
            return next(err);
        }
        res.redirect(process.env.REACT_APP_PORT);
    });
});

const port = process.env.PORT || 3002 ;

app.listen(port, ()=>{
    console.log(`SERVER Running on Port ${port}`);
})
