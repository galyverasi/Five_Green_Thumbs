const express = require('express')
const db = require('../models')
const router = express.Router()
const axios = require('axios')
const isLoggedIn = require('../middleware/isLoggedIn')

// SHOW a list of restaurants
router.get('/results', isLoggedIn, (req, res) => {
    let useZip, useCuisine
    if(!req.query.zipCode) {            // if there is no query - we linked to /results
        console.log('no query for zipcode, using session')
        if(req.session.zipCode){        // if there is a session variable, use that
            console.log('found session value for zip')
            useZip = req.session.zipCode
        }else{
            console.log(`no session data?? - `, req.session)
        }
    }else{                              // if there is a query, use the query - we linked to /results?zipCode=12345
        useZip = req.query.zipCode
        req.session.zipCode = useZip
    }
    if(!req.query.radio) {
        console.log('no query for cuisine, using sessions')
        if(req.session.cuisine){
            console.log('found session value for cuisine')
            useCuisine = req.session.cuisine
        }
    }else{
        useCuisine = req.query.radio
        req.session.cuisine = useCuisine
    }
    req.session.save()
    console.log(`SEARCHING: zip:${useZip} - cuisine:${useCuisine}`)
    console.log(req.query)
    let searchRoute
    // option to choose between vegan, vegetarian or neither
    switch(useCuisine) {
        case "vegan": searchRoute = `https://api.documenu.com/v2/restaurants/zip_code/${useZip}?cuisine=vegan&key=${process.env.X_API_KEY}`;
        break;
        case "vegetarian": searchRoute = `https://api.documenu.com/v2/restaurants/zip_code/${useZip}?cuisine=vegetarian&key=${process.env.X_API_KEY}`;
        break;
        default: searchRoute = `https://api.documenu.com/v2/restaurants/zip_code/${useZip}?key=${process.env.X_API_KEY}`
    }
    axios.get(searchRoute)
    .then(apiRes => {
        // console.log("this is apiRes.data", apiRes.data)
        let name = apiRes.data.restaurant_name
        const results = apiRes.data
    res.render('results', {results:results, name:name})
    })
    .catch(error => {
        console.log(error)
    })
})

// POST route that will save found restaurants
router.post('/saved/:name', isLoggedIn, (req, res) => {
    db.restaurant.create({
        name: req.params.restaurant_name,
        priceRange: req.params.price_range,
        phoneNumber: req.params.restaurant_phone,
        hours: req.params.hours,
        address: req.params.address.formatted
    })
    .then(searchedRestaurant => {
        console.log('db instance created: \n', searchedRestaurant)
        res.redirect(`/profile/${req.params.name}`)
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
    res.render('profile', {results:save})
    })
})

module.exports = router