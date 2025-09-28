const {getUserByWallet, createUser} = require("../models/userModel");
const jwt = require("jsonwebtoken");
const ethers = require("ethers");

const loginController = async (req, res, next) => {
	try {
		const {wallet_address, signature, message} = req.body;

		if (!wallet_address || !signature) return res.status(400).json({error: "Wallet and signature required"});

		let user;
		const {user: fetchedUser, error} = await getUserByWallet(wallet_address);
		user = fetchedUser;

		if (!user) {
			const {data: createdUser, error} = await createUser(wallet_address);
			createUser ? (user = createdUser) : null;
			error ? res.status(404).json({error: "Error creating user"}) : null;
		}

		let recovered;
		try {
			recovered = ethers.verifyMessage(message, signature);
		} catch (err) {
			return res.status(400).json({error: "Invalid signature format"});
		}

		if (recovered.toLowerCase() !== wallet_address.toLowerCase()) {
			return res.status(401).json({error: "Signature does not match wallet"});
		}

		const access_token = jwt.sign({wallet_address, sub: user.id, permissions: ["read", "write", "admin"]}, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		const refresh_token = jwt.sign({wallet_address, sub: user.id, permissions: ["read", "write", "admin"]}, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});
		{
		}

		return res.status(200).json({
			message: "Login successful",
			data: {
				access_token,
				refresh_token,
				user: {id: user.id, wallet_address: user.wallet_address, created_at: user.created_at},
				expires_in: 3600,
			},
		});
	} catch (err) {
		console.log(err);
		next(err);
	}
};

const refreshController = async (req, res, next) => {
	const {refresh_token} = req.body;

	if (!refresh_token) {
		return res.status(400).json({error: "refresh_token required"});
	}

	try {
		// Verify refresh token
		const decoded = jwt.verify(refresh_token, process.env.JWT_SECRET);

		const {user, error} = await getUserByWallet(decoded.wallet_address);

		if (error) {
			return res.status(400).json({NOT_FOUND: "user does not exist"});
		}
		// Issue a new access token
		const newAccessToken = jwt.sign({wallet: decoded.wallet_address, sub: user.id, permissions: ["read", "write", "admin"]}, process.env.JWT_SECRET, {expiresIn: "1h"});

		return res.status(200).json({
			access_token: newAccessToken,
			expires_in: 3600,
		});
	} catch (err) {
		console.log(err);
		return res.status(401).json({error: "Invalid or expired refresh token"});
	}
};

const verifyEnsController = async (req, res, next) => {
	const {domain, signature, message} = req.body;
	if (!message) return res.status(400).json({error: "message is  required"});

	if (!domain || !signature) {
		return res.status(400).json({error: "domain and signature required"});
	}
	try {
		// 1. Resolve ENS domain to address
		const provider = new ethers.InfuraProvider("mainnet", process.env.INFURA_API_KEY);
		const resolvedAddress = await provider.resolveName(domain);

		if (!resolvedAddress) {
			return res.status(404).json({error: "ENS domain not found"});
		}

		// 2. Recover address from signature
		const recovered = ethers.verifyMessage(message, signature);

		if (recovered.toLowerCase() !== resolvedAddress.toLowerCase()) {
			return res.status(401).json({error: "Signature does not match ENS owner"});
		}

		return res.status(200).json({
			message: "ENS verified successfully",
			data: {
				verified: true,
				address: resolvedAddress,
			},
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({error: "Verification failed"});
	}
};

module.exports = {loginController, refreshController, verifyEnsController};
