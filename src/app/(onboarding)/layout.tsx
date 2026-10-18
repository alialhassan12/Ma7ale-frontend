"use client";

import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const OnboardingLayout=({children}:{
    children:ReactNode
})=>{
    const {data:user,isPending,isError}=useAuth();
    
    if(isPending){
        return <div>Loading...</div>
    }
    
    if(isError || !user){
        return redirect("/");
    }
    
    if(user.onboarding_completed){
        return redirect("/home");
    }
    
    return children;
}

export default OnboardingLayout;