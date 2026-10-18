'use client';

import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const DashboardLayout = ({
    children
}:{
    children:ReactNode
}) =>{
    const {
        data:user,
        isPending,
        isError,
        error,
        refetch
    }=useAuth();

    if(isPending){
        return <div>Loading...</div>
    }

    if(isError){
        return redirect("/");
    }

    if(!user){
        return redirect("/");
    }

    if(!user.onboarding_completed){
        return redirect("/onboarding");
    }

    return children;
}

export default DashboardLayout;