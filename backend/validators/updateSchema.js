const {z} = require("zod");

const updateUserSchema = z.object({
	display_name: z.string().max(100, "Display name too long").optional(),
	bio: z.string().optional(),
	email: z.string().email().max(255, "Email too long").optional(),
    username:z.string().min(3, "Username must be at least 3 characters")
    .max(50, "Username too long").optional(),
    avatar_url:z.string().url('Invalid url').optional(),
    ens_domain:z.string().max(255).optional(),
    unstoppable_domain:z.string().max(255).optional(),
    is_verified:z.boolean().default(false).optional(),
	privacy_settings: z
		.object({
			profile_visibility: z
				.enum(["public", "private"])
				.refine((val) => ["public", "private"].includes(val), {message: "profile_visibility must be of public or private"})
				.optional(),
			show_online_status: z.boolean().optional(),
		}).strict()
		.optional(),

}).strict();
  
module.exports = {updateUserSchema};
