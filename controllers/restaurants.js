const express = require('express')
const db = require('../models')
const router = express.Router()
const axios = require('axios')

router.get('/', (req, res) => {
    // https://api.documenu.com/v2/restaurants/zip_code/80246/menuitems?cuisine=vegan,vegetarian
    let docuMenuTest = `https://api.documenu.com/v2/restaurants/zip_code/${zipCode}?cuisine=vegankey=${process.env.X_API_KEY}`
    axios.get(docuMenuTest)
    .then(apiRes => {
    console.log(apiRes.data)   
    })
})

module.exports = router