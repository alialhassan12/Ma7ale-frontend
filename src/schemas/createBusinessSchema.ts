import { isValidPhoneNumber } from "libphonenumber-js/max";
import {z} from "zod";

export const createBusinessSchema = z.object({
    name:z.string().min(1, "Business name is required"),
    business_category_id:z.string().min(1, "Business category is required").uuid(),
    // category ui only will be displayed in step3
    business_category_name:z.string().min(1, "Business category name is required"),
    slug_store:z.string().min(1, "Slug store is required"),
    country_code:z.string().min(1, "Country code is required"),
    phone_number:z.string().min(1, "Phone number is required"),
    order_method:z.enum(["whatsapp","instagram"],{
        error:"Please enter valid order method"
    }),
})
.superRefine((data,ctx)=>{
    if(!data.country_code || !data.phone_number) return;

    const fullPhoneNumber=`${data.country_code}${data.phone_number}`;

    if(!isValidPhoneNumber(fullPhoneNumber)){
        ctx.addIssue({
            code:"custom",
            path:["phone_number"],
            message:"Please enter a valid phone number"
        });
    }
});

export type CreateBusinessFormData = z.infer<typeof createBusinessSchema>;