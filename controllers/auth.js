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
        res.render('auth/login')
    }
})

router.post('/login', (req, res, next)=>{
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            return next(err)
        }
        if (!user) {
            return res.redirect('/login')
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
// {
//     failureRedirect: '/auth/login',
//     successRedirect: '/search', // !-> FLASH <-!
//     failureFlash: 'Invalid username and/or password.',
//     successFlash: 'You are now logged in.'
//     }
router.get('/logout', (req, res)=>{
    req.logout() // !-> FLASH <-!
    req.flash('Success! You\'re logged out.')
    res.redirect('/')
})

module.exports = router