import { Business } from "@/@types/business";
import { createBusiness } from "@/services/BusinessService";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const businessKeys={
    all:["business"]
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