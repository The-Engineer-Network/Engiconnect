
const router = require('express').Router()
const authRoutes = require('./authRoutes')


router.use('/auth',authRoutes)


module.exports = router