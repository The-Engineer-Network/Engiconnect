const { getUserByWallet} = require("../models/userModel");
const jwt = require('jsonwebtoken')


const loginController = async(req,res,next)=>{
try {
  console.log(req.body)
  const {wallet_address} = req.body
    const {user} = getUserByWallet(wallet_address)

    console.log(user)

  if (error || !user) {
    return res.status(400).json({ error: "Invalid wallet address" });
  }

  // Compare password
  const match = await bcrypt.compare(password, users.password);
  if (!match) {
    return res.status(400).json({ error: "Invalid email or password" });
  }
  const expirty = '1h'
  const token = jwt.sign(
    { userWallet:user.wallet_address },
    process.env.JWT_SECRET,
    { expiresIn: expirty }
  );



  res.status(200).json({
     access_token: token,
  refresh_token: token,
  user,
  expires_in: 3600
  });

  } catch (err) {
    console.log(err)
    next(err);
  }
}


module.exports = {loginController}
