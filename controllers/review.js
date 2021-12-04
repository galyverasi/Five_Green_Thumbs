const express = require('express')
const db = require('../models')
const router = express.Router()
const axios = require('axios')
const isLoggedIn = require('../middleware/isLoggedIn')

// POST route that will add a review to userRestaurant
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

// GET route that will render review page
router.get('/:id', isLoggedIn, (req, res) => {
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

// PUT route that will update a review
router.put('/:id', isLoggedIn, (req, res) => {
    db.userRestaurant.findOne({
        where: {id:req.params.id}
    })
    .then(result => {
        db.review.findOne({
            where: { restaurantId: req.params.id}
        })
        .then(review => {
            if(review) {
                // if a review exists, update it
                db.review.update( 
                    { comments: req.body.comment },
                    { where: {restaurantId: req.params.id} }
                )
                .then(() => {
                    console.log('updated review')
                })
                .catch(error => {
                    console.log(error)
                })
            } else {
                // if there is no review, create one
                db.review.create({ 
                    restaurantId: req.params.id,
                    userId: req.session.userId,
                    comments: req.body.comment
                })
                .then(() => {
                    console.log('added review')   
                })
                .catch(error => {
                    console.log(error)
                })
            } 
        })
        .catch(err => {
            console.log('error when updating review:', err)
        })
        .finally(() => {
            // console.log(`current review`, currentReview?.dataValues)
            res.redirect('/profile')
        })
    })
}) 

module.exports = router