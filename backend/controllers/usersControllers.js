const {getUserByWallet, updateUser,  searchUsers} = require("../models/userModel");

const getProfileController = async (req, res, next) => {
	try {
		const {wallet_address} = req.user;
		if (!wallet_address) return res.status(400).json({message: "Wallet address missing in request"});

		const {user, error} = await getUserByWallet(wallet_address);

		if (error) {
			return res.status(500).json({message: "Database error", error});
		}

		user
			? res.status(200).json({
					message: "User Data",
					data: {
						...user,
					},
			  })
			: res.status(404).json({message: "User not found"});
	} catch (err) {
		console.log(err);
		next(err);
	}
};

const searchUsersController = async (req, res, next) => {
	const limit = +req.query.limit || 10;
	const q = req.query.q;
	if (!q) return res.status(400).json({message: "Search term is required"});

	try {
		const {wallet_address} = req.user;
		if (!wallet_address) return res.status(400).json({message: "Wallet address missing in request"});

		const {data, error} = await searchUsers(q, limit);

		if (error) {
			return res.status(500).json({message: "Database error", error});
		}
		const hasMore = data.length > limit;

		// Trim the extra item if it existed
		const users = hasMore ? data.slice(0, limit) : data;
		data
			? res.status(200).json({
					message: "User Data",
					data: {
						data: users,
						total: users.length,
						has_more: hasMore,
					},
			  })
			: res.status(404).json({message: "User not found"});
	} catch (err) {
		console.log(err);
		next(err);
	}
};

const updateUserController = async (req, res, next) => {
	try {
		const {wallet_address} = req.user;
		if (!wallet_address) return res.status(400).json({message: "Wallet address missing in request"});

		const {data, error} = await updateUser(wallet_address, req.body);

		if (error) {
			return res.status(500).json({message: "Database error", error: error.message});
		}

		data
			? res.status(201).json({
					message: "User Data",
					data,
			  })
			: res.status(404).json({message: "User not found"});
	} catch (err) {
		console.log(err);
		next(err);
	}
};

module.exports = {getProfileController, updateUserController, searchUsersController};
