const express = require('express')
const db = require('../models')
const router = express.Router()
const axios = require('axios')
const isLoggedIn = require('../middleware/isLoggedIn')

// GET display a list of restaurants from API
router.get('/results', (req, res) => {
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
    // console.log(req.query)
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
        const name = apiRes.data.restaurant_name
        const results = apiRes.data
        //console.log("this is apiRes.data", results)
        results.data.forEach((data) => {
        console.log("this is the next", data)
            db.restaurant.findOrCreate({
                where: { name: data.restaurant_name},
                defaults: {
                    name: data.restaurant_name,
                    priceRange: data.price_range,
                    phoneNumber: data.restaurant_phone,
                    hours: data.hours,
                    address: data.address.formatted,
                    userId: req.session.userId,
            }
        })
    })
    res.render('results', {results:results, name:name})
    })
    .catch(error => {
        console.log(error)
    })
})

router.get('/', (req, res) => {
    res.render('search')
})

// GET save a restaurant in profile
router.get('/', (req, res) => {
    db.restaurant.findAll()
    .then(saved => {
    // display saved restaurants in profile.ejs
    res.render('profile', {results:saved})
    })
})

module.exports = router