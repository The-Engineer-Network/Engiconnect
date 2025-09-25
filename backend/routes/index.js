
const router = require('express').Router()
const authRoutes = require('./authRoutes')
const userRoutes = require('./usersRoutes')

router.use('/auth',authRoutes)

router.use('/user',userRoutes)


module.exports = router