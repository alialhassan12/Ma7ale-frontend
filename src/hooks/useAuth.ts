import { SignUpFormData } from "@/schemas/signupSchema";
import { checkAuth, signUp } from "@/services/authService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const authKeys={
    all:["auth"] as const,
    user:["auth","user"] as const
}

export const useAuth=()=>{
    return useQuery({
        queryKey:authKeys.user,
        queryFn:()=>checkAuth(),
        retry:false,
        staleTime:5*60*1000
    })
}

export const useSignUp=()=>{
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:(data:SignUpFormData)=>signUp(data),
        onSuccess:(user)=>{
            queryClient.setQueryData(authKeys.user,user);
        }
    })
}