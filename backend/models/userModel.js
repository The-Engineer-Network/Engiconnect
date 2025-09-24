const supabase = require('../config/db')

const getAllUsers = async () => {
  return await supabase.from("users").select("*");
};

const createUser = async (wallet) => {

   const { data, error } = await supabase
    .from("users")
    .insert([{ wallet_address: wallet}])
    .select()
    .single();
  return {data, error}
};
const getUserByWallet = async(wallet)=>{
     const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("wallet_address", wallet)
    .single(); // gets a single row
    return {user, error}
}
 
module.exports =  { createUser, getAllUsers,getUserByWallet}