const express = require('express')
const router = express.Router()
const db = require('../models')
const isLoggedIn = require('../middleware/isLoggedIn')

// GET route that will display saved restaurants
router.get('/', isLoggedIn, (req, res) => {
    db.userRestaurant.findAll({
        where: {userId:req.session.userId}
    })
    .then(found => {
        res.render('profile', {name:req.params.name, currentUser:req.session.user, results:found})
    })
})

// POST route that will save a restaurant to userRestaurant
router.post('/:name', isLoggedIn, (req, res) => {
    console.log(`currentUser: ${req.session.userId}`)
    console.log(`savedRestaurant: ${req.params.name}`)
    db.userRestaurant.findOne({
        where: {name:req.params.name}
    })
    .then((result)=>{
        if(!result) {
        db.userRestaurant.create({
            name: req.params.name, 
            userId: req.session.userId
        })
        .then(createdSave => {
            console.log('db instance created: \n', createdSave)
            res.redirect(`/profile`)
        })
        .catch(error => {
            console.log(error)
        })
    } else {
        console.log('this restaurant was already saved')

    }
    })
    .catch((err)=>{
        console.log(err)
    })
})
module.exports = router