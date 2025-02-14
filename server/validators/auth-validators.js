const { z } = require("zod");

const registerSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    gender: z.string().min(1, "Gender is required"),
    country: z.string().min(1, "Country is required"),
    dateOfBirth: z.string().min(1, "Date of Birth is required"),
});

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

module.exports = { registerSchema, loginSchema };
