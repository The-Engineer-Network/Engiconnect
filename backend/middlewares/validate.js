const validate = (Schema) => async (req, res, next) => {
	try {
		const result = Schema.safeParse(req.body);
		if (!result.success) {
			const issue = result.error.issues[0];

			let errorMessage;
			if (issue.code === "unrecognized_keys") {
				errorMessage = `${issue.keys[0]} is not allowed`;
			} else {
				errorMessage = issue.message;
			}
			return res.status(422).json({
				message: "Validation failed",
				error: errorMessage,
			});
		}

		req.validated = result.data;
		next();
	} catch (error) {
		console.log(error);
		return res.status(400).json({message: "Invalid request", error});
	}
};

module.exports = validate;
