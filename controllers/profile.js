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
        res.render('saved', {name:req.params.name, currentUser:req.session.user, results:found})
    })
})



// POST route that will save a restaurant to userRestaurant
router.post('/saveRestaurant/:name', isLoggedIn, (req, res) => {
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
            // res.redirect(`/profile/${req.params.name}`)
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

// POST route that will add a comment to userRestaurant
router.post('/', isLoggedIn, (req, res) => {
    db.review.create({
        name: req.params.name,
        userId: req.session.userId
    })
    .then(createdReview => {
        console.log('db instance created: \n', createdReview)
        res.redirect(`/profile/${req.params.name}`)
    })
    .catch(error => {
        console.log(error)
    }) 
})

// DELETE that will remove a saved restaurant
router.delete('/:id', isLoggedIn, (req, res) => {
    // console.log('this is the id\n', res.params.id)
    db.userRestaurant.destroy({ 
        where: { id: req.params.name }
    })
    .then(deletedRestaurant => {
        // destroy returns '1' if something was deleted and '0' if nothing happened
        console.log('you deleted: ', deletedRestaurant)
        res.redirect('/saved')
    })
    .catch(error => {
        console.log(error)
    })
})

module.exports = router