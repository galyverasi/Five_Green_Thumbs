const express = require('express')
const db = require('../models')
const router = express.Router()
const axios = require('axios')
const isLoggedIn = require('../middleware/isLoggedIn')

router.get('/results', isLoggedIn, (req, res) => {
    let zipCode = req.query.zipCode
    let docuMenu = `https://api.documenu.com/v2/restaurants/zip_code/${zipCode}?cuisine=vegan,vegetarian&key=${process.env.X_API_KEY}`
    axios.get(docuMenu)
    .then(apiRes => {
        console.log(apiRes.data)
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