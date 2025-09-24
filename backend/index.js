
const app = require('./app')

const dotenv = require('dotenv')
dotenv.config();
(async()=>{

    //    GracefulShutdown
   ['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach(signal => {
       process.on(signal, async () => {
           console.log(`Received ${signal}, shutting down gracefully...`);
   })});

   
   app.listen(process.env.PORT || 4000, () => {
       console.log(`Server is running on port ${process.env.PORT || 4000}`);
   })
})()
