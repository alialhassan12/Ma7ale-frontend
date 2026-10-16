import {z} from "zod";

export const signUpSchema=z.object({
    name:z.string()
        .trim()
        .min(3,"Name must be at least 3 characters")
        .max(100,"Name must be at most 100 characters"),
    email:z.string()
        .trim()
        .min(1,"Email is required")
        .email("Invalid email"),
    password:z.string()
        .trim()
        .min(8,"Password must be at least 8 characters")
        .refine(value => /[A-Z]/.test(value), {
            message: "Password must contain at least one uppercase letter",
        }).refine(value => /[0-9]/.test(value), {
            message: "Password must contain at least one number",
        }).refine(value => /[!@#$%^&*]/.test(value), {
            message: "Password must contain at least one special character",
        }),
    password_confirmation:z.string()
        .trim()
        .min(8,"Password confirmation must be at least 8 characters")
        .refine(value => /[A-Z]/.test(value), {
            message: "Password confirmation must contain at least one uppercase letter",
        }).refine(value => /[0-9]/.test(value), {
            message: "Password confirmation must contain at least one number",
        }).refine(value => /[!@#$%^&*]/.test(value), {
            message: "Password confirmation must contain at least one special character",
        }),
}).refine(data => data.password === data.password_confirmation,{        
    message: "Passwords don't match",
    path: ["password_confirmation"],
});

export type SignUpFormData = z.infer<typeof signUpSchema>;