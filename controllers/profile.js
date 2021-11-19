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

// POST route that will add a comment to userRestaurant
router.post('/', isLoggedIn, (req, res) => {
    db.review.create({
        name: req.params.name,
        comment: req.body.comment,
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

// GET render comment page
router.get('/comment/:id', isLoggedIn, (req, res) => {
    db.userRestaurant.findOne({
        where: {id:req.params.id}
    })
    .then(result => {
        db.review.findOne({
            where: {restaurantId: req.params.id}
        })
        .then(review => {
            console.log(`current review`, review?.dataValues)
            res.render("comment", {id:req.params.id, result:result, review:review?.dataValues?.comments || ""})
        })
    })
})

// POST leave a comment
// router.post('/comment/:id', isLoggedIn, (req, res) => {
//     db.userRestaurant.findOne({

// DELETE that will remove a saved restaurant
router.post('/delete/:name', isLoggedIn, (req, res) => {
    // console.log('this is the id\n', res.params.id)
    db.userRestaurant.destroy({ 
        where: { name: req.params.name }
    })
    .then(deletedRestaurant => {
        console.log('you deleted: ', deletedRestaurant)
        res.redirect('/profile')
    })
    .catch(error => {
        console.log(error)
    })
})

// POST route that will save a restaurant to userRestaurant
router.post('/:name', isLoggedIn, (req, res) => {
    console.log(`currentUser: ${req.session.userId}`)
    console.log(`savedRestaurant: ${req.params.name}`)
    db.userRestaurant.findOne({
        where: { name: req.params.name }

    })
    .then((result)=>{
        if(!result) {
        db.userRestaurant.create({
            name: req.params.name, 
            userId: req.session.userId,
            restaurantId: req.body.restaurant_id
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
    console.log(error)
    })
})

module.exports = router