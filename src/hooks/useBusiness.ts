import { Business } from "@/@types/business";
import { createBusiness, getBusinesses } from "@/services/BusinessService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const businessKeys={
    all:["businesses"],
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

export const useGetBusinesses=()=>{
    return useQuery({
        queryKey: businessKeys.all,
        queryFn: getBusinesses,
    })
}