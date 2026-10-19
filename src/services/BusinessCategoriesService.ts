import axiosInstance from "@/lib/axios"

export const getBusinessCategories = async()=>{
    try {
        const response=await axiosInstance.get("/business-categories");
        return response.data;
    } catch (error:any) {
        throw error.response?.data?.message || "Failed to fetch business categories"
    }
}