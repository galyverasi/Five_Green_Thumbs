const express = require('express')
const db = require('../models')
const router = express.Router()
const axios = require('axios')
const isLoggedIn = require('../middleware/isLoggedIn')

// SHOW a list of restaurants
router.get('/results', isLoggedIn, (req, res) => {
    let zipCode = req.query.zipCode
    console.log(req.query)
    let searchRoute
    switch(req.query.inlineRadioOptions) {
        case "vegan": searchRoute = `https://api.documenu.com/v2/restaurants/zip_code/${zipCode}?cuisine=vegan&key=${process.env.X_API_KEY}`;
        break;
        case "vegetarian": searchRoute = `https://api.documenu.com/v2/restaurants/zip_code/${zipCode}?cuisine=vegetarian&key=${process.env.X_API_KEY}`;
        break;
        default: searchRoute = `https://api.documenu.com/v2/restaurants/zip_code/${zipCode}?key=${process.env.X_API_KEY}`
    }
    axios.get(searchRoute)
    .then(apiRes => {
        console.log("this is apiRes.data", apiRes.data)
        let name = apiRes.data.restaurant_name
        const results = apiRes.data
    res.render('results', {results:results, name:name})
    })
    .catch(error => {
        console.log(error)
    })
})

// POST route that will save found restaurants to database
router.post('/saveRestaurant/:name', isLoggedIn, (req, res) => {
    db.restaurant.create({
        name: req.params.restaurant_name,
        priceRange: req.params.price_range,
        phoneNumber: req.params.restaurant_phone,
        hours: req.params.hours,
        address: req.params.address.formatted
    })
    .then(searchedRestaurant => {
        console.log('db instance created: \n', searchedRestaurant)
        res.redirect(`/search/${req.params.name}`)
    })
    .catch(error => {
        console.log(error)
    })
})

router.get('/', isLoggedIn, (req, res) => {
    res.render('search')
})

// GET saved restaurants in profile
router.get('/', isLoggedIn, (req, res) => {
    db.restaurant.findAll()
    .then(save => {
    // display saved restaurants in profile.ejs
    res.render('profile.ejs', {results:save})
    })
})

// POST save a restaurant and add it to the database
// router.post('/', isLoggedIn, (req, res) => {
//     const data = JSON.parse(JSON.stringify(req.body))
//     console.log('this is data', data)
// })
module.exports = router