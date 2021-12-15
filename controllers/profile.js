const express = require('express')
const router = express.Router()
const db = require('../models')
const isLoggedIn = require('../middleware/isLoggedIn')

// GET route that will display saved restaurants
router.get('/', isLoggedIn, (req, res) => {
    let tempResults = []
    function render() {
        console.log(tempResults)
        res.render('profile', { name: req.params.name, currentUser: req.session.user, results: tempResults })
    }
    db.userRestaurant.findAll({
        where: { userId: req.session.userId }
    })
        .then(userRes => {
            let i = 0
            userRes.forEach(uRes => {
                let tempReview = 'click the pen to leave a review'
                db.review.findOne({
                    where: { restaurantId: uRes.dataValues.id }
                })
                    .then(review => {
                        i++
                        if (review) { tempReview = `"${review.dataValues.review}"` }
                        tempResults.push({
                            ...uRes.dataValues,
                            review: tempReview
                        })
                        if (i == userRes.length) { render() }
                    })
            })
        })
})

// DELETE that will remove a saved restaurant
router.delete('/:name', isLoggedIn, (req, res) => {
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
    // console.log(`currentUser: ${req.session.userId}`)
    // console.log(`savedRestaurant: ${req.params.name}`)
    db.userRestaurant.findOne({
        where: { name: req.params.name }
    })
        .then((result) => {
            if (!result) {
                db.userRestaurant.create({
                    name: req.params.name,
                    userId: req.session.userId,
                    restaurantId: req.body.restaurant_id
                })
                    .then(createdSave => {
                        // console.log('db instance created: \n', createdSave)
                        res.redirect(`/profile`)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            } else {
                // req.flash('error', 'already saved')
                console.log('this restaurant was already saved')
            }
        })
        .catch((err) => {
            console.log(error)
        })
})

module.exports = router