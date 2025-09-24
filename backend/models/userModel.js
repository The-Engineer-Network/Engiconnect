const supabase = require('../config/db')

const getAllUsers = async () => {
  return await supabase.from("users").select("*");
};

const createUser = async (userWalledData) => {
  return await supabase.from("users").insert([userWalledData]);
};
const getUserByWallet = async(email)=>{
     const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single(); // gets a single row
    return {user, error}
}
 
module.exports =  { createUser, getAllUsers,getUserByWallet}