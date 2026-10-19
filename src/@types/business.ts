export interface Business{
    id?:string;
    owner_id?:string;
    name:string;
    business_category_id:string;
    country_code:string;
    phone_number:string;
    order_method:string;
    slug_store:string;
    description?:string;
    logo?:string;
    logo_url?:string;
    created_at?:string;
    updated_at?:string;
}