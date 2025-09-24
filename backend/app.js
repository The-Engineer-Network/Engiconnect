const express = require('express')
const rateLimiter = require('./middlewares/rate-limiter')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes')
const {errorLogging, notFound} = require('./middlewares/errorHandler')

const app = express()
app.use(morgan('dev'))
app.use(cors({
    origin:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api', rateLimiter)
app.use('/api', routes)

app.get('/', (req,res)=>{
        res.status(200).json({
        message: 'Welcome to Engiconnect',
        health: 'ok'
    });
})
app.use(notFound)
app.use(errorLogging)




module.exports = app