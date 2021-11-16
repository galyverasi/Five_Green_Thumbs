const express = require('express')
const db = require('../models')
const router = express.Router()
const axios = require('axios')
const isLoggedIn = require('../middleware/isLoggedIn')

router.get('/results', isLoggedIn, (req, res) => {
    let zipCode = req.query.zipCode
    let vegSearch = `https://api.documenu.com/v2/restaurants/zip_code/${zipCode}?cuisine=vegetarian&key=${process.env.X_API_KEY}`
    let veganSearch = `https://api.documenu.com/v2/restaurants/zip_code/${zipCode}?cuisine=vegan&key=${process.env.X_API_KEY}`
    axios.get(vegSearch)
    .then(apiRes => {
        console.log("this is apiRes.data", apiRes.data)
        let name = apiRes.data.restaurant_name
        const results = apiRes.data
    res.render('results', {results:results})
    })
    .catch(error => {
        console.log(error)
    })
})

router.get('/', isLoggedIn, (req, res) => {
    res.render('search')
})

module.exports = router