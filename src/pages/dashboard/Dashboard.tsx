"use client";

import Navbar from "@/components/dashboard/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogout } from "@/hooks/useAuth";
import { useGetBusinesses } from "@/hooks/useBusiness";
import { PlusCircle, Search } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Dashboard(){
    const router = useRouter();
    const [selectedFilter,setSelectedFilter]=useState<string>("all");
    
    const {data:businessesData,isLoading:isLoadingBusinesses,isError:isErrorBusinesses}=useGetBusinesses();
    const businesses=businessesData?.businesses?.data;
    const paginationData={
        "current_page":businessesData?.businesses?.current_page,
        "last_page":businessesData?.businesses?.last_page,
        "per_page":businessesData?.businesses?.per_page,
        "total":businessesData?.businesses?.total,
    };

    const filters=[
        "all","owner","member"
    ];

    return(
        <div>
            <Navbar/>
            <div className="px-8 mt-2">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col">
                        <h1 className="mt-6 text-4xl font-bold">Your Businesses</h1>
                        <p className="text-muted-foreground">
                            Choose a business to continue managing, or create a new one to get started.
                        </p>
                    </div>
                    <Button className="flex flex-row items-center gap-2 bg-primary text-white font-medium rounded-lg px-5 py-4 cursor-pointer">
                        <PlusCircle/>
                        Add Business
                    </Button>
                </div>

                <div className="flex flex-row items-center justify-between w-full bg-card p-2 rounded-lg mt-6">
                    {/* searchbar */}
                    <div className="relative flex flex-row items-center w-1/2 gap-2">
                        <Search className="absolute left-2.5 w-5 h-5 text-muted-foreground"/>
                        <Input placeholder="Search your businesses..." className="pl-10 w-full h-10"/>
                    </div>

                    {/* filter */}
                    <div className="flex p-1 flex-row items-center rounded-lg bg-primary/20">
                        {filters.map((filter,index)=>{
                            const isSelected=selectedFilter===filter;
                            return(
                                <div key={index} className="flex flex-row items-center">
                                    <div
                                        onClick={()=>setSelectedFilter(filter)}
                                        className={`relative px-4 py-1.5 text-sm font-medium rounded-md outline-none cursor-pointer ${
                                            isSelected ? "text-white" : "text-foreground/70"
                                        }`}
                                    >
                                        {isSelected && (
                                            <motion.div
                                                layoutId="activeStepPill"
                                                className="absolute inset-0 bg-primary rounded-md -z-0"
                                                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10 select-none capitalize">{filter}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}