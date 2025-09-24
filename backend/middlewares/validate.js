const validate = (Schema)=>async(req,res,next)=>{

     try {
        const result = Schema.safeParse(req.body);
        if (!result.success) {
            
            return res.status(400).json({
                message:'Validation failed',
                errors: result.error.flatten().fieldErrors,
            })
        }

    req.validated = result.data
    next()
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:'Invalid request', error})
    }
}

module.exports = validate