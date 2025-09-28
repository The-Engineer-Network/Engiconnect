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

const updateUser = async(wallet,updates)=>{
      const { data, error } = await supabase
    .from("users")
    .update(updates) 
    .eq("wallet_address", wallet)
    .select()
    .single(); // return one row

  return { data, error };
}

const getUsersByPagination = async(page,pagesize = 10)=>{
     const { data, error } = await supabase
  .from("users")
  .select("*")
  .range((page - 1) * pageSize, page * pageSize - 1);
  return { data, error };
}
 

const searchUsers = async(search,limit)=>{
   const { data, error } = await supabase
  .from("users")
  .select("*")
  .or(`username.ilike.%${search}%,display_name.ilike.%${search}%`).limit(limit + 1);
  return { data, error };
}
 
module.exports =  { createUser, getAllUsers,getUserByWallet,updateUser,getUsersByPagination,searchUsers}



