'use client';

import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const AuthLayout = ({
    children
}:{
    children:ReactNode
}) =>{
    const {
        data:user,
        isError,
    }=useAuth();

    if(!isError && user){
        return redirect(user.onboarding_completed ? "/home" : "/onboarding");
    }

    return children;
}

export default AuthLayout;