import axiosInstance from "@/lib/axios";
import { LoginFormData } from "@/schemas/loginSchema";
import { SignUpFormData } from "@/schemas/signupSchema";

export const checkAuth=async()=>{
    try {
        const token=localStorage.getItem("auth_token");
        if(!token){
            return null;
        }

        const response=await axiosInstance.get("/auth/me");
        return response?.data?.user;
    } catch (error:any) {
        throw error?.response?.data?.message || "Something went wrong";
    }
}

export const signUp= async(data:SignUpFormData)=>{
    try {
        const response=await axiosInstance.post("/auth/register",data);
        if(response?.data?.token){
            localStorage.setItem("auth_token",response.data.token);
            localStorage.setItem("user",JSON.stringify(response.data.user))
        }
        return response?.data?.user;
    } catch (error:any) {
        throw error?.response?.data?.message || "Something went wrong";
    }
}

export const login=async(data:LoginFormData)=>{
    try {
        const response=await axiosInstance.post('/auth/login',data);
        if(response?.data?.token){
            localStorage.setItem("auth_token",response.data.token);
            localStorage.setItem("user",JSON.stringify(response.data.user))
        }
        return response?.data?.user;
    } catch (error:any) {
        throw error?.response?.data?.message || "Something went wrong";
    }
}

export const redirectToGoogle=async()=>{
    try {
        const response=await axiosInstance.get('/auth/google/redirect');
        return response?.data?.url;
    } catch (error:any) {
        throw error?.response?.data?.message || "Something went wrong";
    }
}