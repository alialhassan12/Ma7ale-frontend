import User from "@/@types/user";
import { LoginFormData } from "@/schemas/loginSchema";
import { SignUpFormData } from "@/schemas/signupSchema";
import { checkAuth, login, redirectToGoogle, signUp } from "@/services/authService";
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
            queryClient.setQueryData<User>(authKeys.user,user);
        }
    })
}

export const useLogin=()=>{
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:(data:LoginFormData)=>login(data),
        onSuccess:(user)=>{
            queryClient.setQueryData<User>(authKeys.user,user);
        }
    })
}

export const useRedirectToGoogle=()=>{
    return useMutation({
        mutationFn:()=>redirectToGoogle(),
        onSuccess:(url)=>{
            if(url){
                window.location.href=url;
            }
        },
        onError:(error:any)=>{
            console.error(error);
        }
    })
}