const express = require('express')
const router = express.Router()
const db = require('../models')
const isLoggedIn = require('../middleware/isLoggedIn')

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

module.exports = router