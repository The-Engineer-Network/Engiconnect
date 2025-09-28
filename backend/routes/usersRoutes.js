const router = require('express').Router()
const {getProfileController, updateUserController, searchUsersController} = require('../controllers/usersControllers')
const authMiddleware = require('../middlewares/authGuard')
const validate = require('../middlewares/validate')
const { updateUserSchema } = require('../validators/updateSchema')


router.get('/profile',authMiddleware,getProfileController)

router.put('/profile',authMiddleware,validate(updateUserSchema),updateUserController)

router.get('/search',authMiddleware,searchUsersController)


module.exports = router

