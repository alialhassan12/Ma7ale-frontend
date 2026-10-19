import { Business } from "@/@types/business";
import axiosInstance from "@/lib/axios";

export const createBusiness=async(data:Business)=>{
    try {
        const response=await axiosInstance.post("/business/create",data);
        return response.data;
    } catch (error:any) {
        throw error.response?.data?.message || "Failed to create business";
    }
}