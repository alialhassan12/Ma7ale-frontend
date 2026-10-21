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

export const getBusinesses=async(page:number=1,search:string="",filter?:string)=>{
    try{
        const response=await axiosInstance.get(`/businesses?page=${page}&search=${search}&filter=${filter}`);
        return response.data;
    }catch(error:any){
        console.log(error.response);
        throw error.response?.data?.message || "Failed to fetch businesses";
        
    }
}