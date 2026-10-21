import { Business } from "@/@types/business";
import { createBusiness, getBusinesses } from "@/services/BusinessService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const businessKeys={
    all:["businesses"],
    list:(page:number=1,search:string="",filter:string="")=>(["businesses","list",page,search,filter])
}

export const useCreateBusiness=()=>{
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn: (data: Business) => createBusiness(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: businessKeys.all });
        },
    });
}

export const useGetBusinesses=(page:number=1,search:string="",filter:string="")=>{
    return useQuery({
        queryKey: businessKeys.list(page,search,filter),
        queryFn: ()=>getBusinesses(page,search,filter),
    })
}