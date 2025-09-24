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

// User Management Endpoints
// GET /users/profile
// Get current user profile

// Response:
// {
//   "id": "uuid",
//   "username": "alice_dev",
//   "display_name": "Alice Johnson",
//   "wallet_address": "0x...",
//   "ens_domain": "alice.ens",
//   "avatar_url": "ipfs://...",
//   "bio": "Web3 Developer",
//   "is_verified": true,
//   "privacy_settings": { ... },
//   "stats": {
//     "communities_joined": 5,
//     "messages_sent": 1234,
//     "achievements_count": 8
//   }
// }
// PUT /users/profile
// Update user profile

// Request:
// {
//   "display_name": "Alice Johnson",
//   "bio": "Updated bio",
//   "privacy_settings": {
//     "profile_visibility": "public",
//     "show_online_status": true
//   }
// }
// GET /users/search
// Search users

// Query Params:
// - q: search query
// - limit: 20
// - offset: 0

// Response:
// {
//   "users": [ ... ],
//   "total": 150,
//   "has_more": true
// }