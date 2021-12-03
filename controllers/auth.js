const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/ppConfig.js')
const isLoggedIn = require('../middleware/isLoggedIn.js')
const bcrypt = require('bcrypt')

router.get('/signup', (req, res)=>{
    res.render('auth/signup')
})

router.post('/signup', (req, res)=>{
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            // Store hash in your password DB.
       
    db.user.findOrCreate({
        where: {email: req.body.email},
        defaults: {
            name: req.body.name,
            password: hash
        }
    })
    .then(([createdUser, wasCreated])=>{
        if(wasCreated){
            console.log(`just created the following user:`, createdUser)
            // res.send('POST form data from signup.ejs, then redirect')
            passport.authenticate('local', {
                successRedirect: '/', // !-> FLASH <-!
                successFlash: 'Account created and logged in!'
            })(req, res) // why does this need to be an IIFE???
        } else { // !-> FLASH <-!
            req.flash('error', 'email already exists, try logging in') 
            // console.log('An account associated with that email address already exists! Did you mean to login?')
            res.redirect('/auth/login')
        }
    })
    .catch(err =>{ // !-> FLASH <-!
        req.flash('error', err.message) 
        res.redirect('/auth/signup')
            })
        });
    });
})

router.get('/login', (req, res)=>{
    if (req.user) {
        res.render('/search')
    } else {
        res.render('auth/login', {error: req.session.error})
    }
})

router.post('/login', (req, res, next)=>{
    passport.authenticate('local', (err, user, info) => {
        req.session.error = null
        if(err) {
            return next(err)
        }
        if (!user) {
            req.session.error = 'Invalid username or password!'
            return res.redirect('/auth/login')
        }
        req.logIn(user, (err) => {
            if(err) {
                return next(err)
            }
            req.session.user= user.name 
            req.session.userId= user.id
            res.redirect('/search')
        })
    }) (req, res, next)
    }
)

router.get('/logout', (req, res)=>{
    req.logout() // !-> FLASH <-!
    req.flash('Success! You\'re logged out.')
    res.redirect('/')
})

module.exports = router