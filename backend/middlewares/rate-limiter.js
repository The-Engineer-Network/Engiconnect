const  rateLimit = require ("express-rate-limit");


 const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, 
    standardHeaders: true, 
    legacyHeaders: false, 
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

module.exports = rateLimiter