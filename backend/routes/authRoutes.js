const router = require('express').Router()
const validate = require('../middlewares/validate')
const {loginSchema, refreshShema, verifyEnsSchema} = require('../validators/authSchema')
const {loginController} = require('../controllers/authControllers')

router.post('/auth/login',validate(loginSchema),loginController)

// router.post('/auth/refresh',loginController,)

// router.post('/auth/verify-ens',loginController,)


module.exports = router

// OST /auth/login
// Wallet-based authentication

// Request:
// {
//   "wallet_address": "0x...",
//   "signature": "0x...",
//   "message": "Login to ENGIConnect"
// }

// Response:
// {
//   "access_token": "jwt_token",
//   "refresh_token": "jwt_token",
//   "user": { ... },
//   "expires_in": 3600
// }
// POST /auth/refresh
// Refresh access token

// Request:
// {
//   "refresh_token": "jwt_token"
// }

// Response:
// {
//   "access_token": "jwt_token",
//   "expires_in": 3600
// }
// POST /auth/verify-ens
// Verify ENS domain ownership

// Request:
// {
//   "domain": "alice.ens",
//   "signature": "0x..."
// }

// Response:
// {
//   "verified": true,
//   "address": "0x..."
// }
// // User Management Endpoint