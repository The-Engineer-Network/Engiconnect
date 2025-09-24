const {z} = require('zod')

const loginSchema = z.object({
wallet_address:z.string().min(1,{message:'wallet_address is required'}),
signature:z.string().min(1,{message:'signature is required'}),
message:z.string().min(1,{message:'message is required'})
})

const  refreshSchema= z.object({
    refresh_token:z.string().min(1,{message:'referesh_token is required'})
})

const verifyEnsSchema = z.object({
    domain:z.string().min(1,{message:'domain is required'}),
    
    signature:z.string().min(1,{message:'signature is required'})
})

module.exports = { loginSchema, refreshSchema, verifyEnsSchema}