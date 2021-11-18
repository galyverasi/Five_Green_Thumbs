const express = require('express')
const router = express.Router()
const db = require('../models')
const isLoggedIn = require('../middleware/isLoggedIn')


// router.get('/', isLoggedIn, (req, res) => {
//     db.userRestaurant.findAll({
//         where: {userId:req.session.userId}
//     })
//     .then(found => {
//         res.render('saved', {name:req.params.name, currentUser:req.session.user, results:found})
//     })
// })


module.exports = router