const notFound=(req,res,next)=>{

    return res.status(404).json({message:'Invalid url',url:req.originalUrl})
}

const errorLogging =(err,req,res,next)=>{

    console.log(err.stack)
    return res.status(500).json({message:'Server error'})
}

module.exports = { errorLogging, notFound}