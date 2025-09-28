const router = require('express').Router()
const validate = require('../middlewares/validate')
const {loginSchema, refreshShema, verifyEnsSchema} = require('../validators/authSchema')
const {loginController,refreshController,verifyEnsController} = require('../controllers/authControllers')

router.post('/login',validate(loginSchema),loginController)

router.post('/refresh',refreshController)

router.post('/verify-ens',verifyEnsController)


module.exports = router

