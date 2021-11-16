const express = require('express')
const router = express.Router()
const db = require('../models')

// POST route that will save a restaurant to userRestaurant
router.post('/saveRestaurant/:name', (req, res) => {
    console.log(`currentUser: ${req.session.userId}`)
    console.log(`savedRestaurant: ${req.params.name}`)
    db.userRestaurant.create({
        name: req.params.name, 
        userId: req.session.userId
    })
    .then(createdSave => {
        console.log('db instance created: \n', createdSave)
        res.redirect(`/profile/${req.params.name}`)
    })
    .catch(error => {
        console.log(error)
    })
})
router.get('/:name', (req, res) => {
    console.log(`visiting page profile/${req.params.name}`)
    console.log(`current user/${req.session.user}`)
    res.render('saved', {name:req.params.name, currentUser:req.session.userId})
})

// POST route that will add a comment to userRestaurant
router.post('/', (req, res) => {
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
router.delete('/:id', (req, res) => {
    // console.log('this is the id\n', res.params.id)
    db.userRestaurant.destroy({
        where: { id: req.params.id }
    })
    .then(deletedRestaurant => {
        // destroy returns '1' if something was deleted and '0' if nothing happened
        // console.log('you deleted: ', deletedRestaurant)
        res.redirect('/')
    })
    .catch(error => {
        console.log(error)
    })
})

module.exports = router