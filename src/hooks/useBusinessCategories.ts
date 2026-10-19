
import { useQuery } from "@tanstack/react-query"
import { getBusinessCategories } from "../services/BusinessCategoriesService"

export const businessCategoriesKeys={
    all:["business-categories"]
}

export const useGetBusinessCategories=()=>{
    return useQuery({
        queryKey:businessCategoriesKeys.all,
        queryFn:()=>getBusinessCategories()
    })
}