"use client";

import { getIconByName } from "@/components/AVAILABLE_ICONS";
import Navbar from "@/components/dashboard/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useLogout } from "@/hooks/useAuth";
import { useGetBusinesses } from "@/hooks/useBusiness";
import { useDebounce } from "@/hooks/useDebounce";
import {
    AlertCircle,
    ArrowRight,
    Link,
    LucideIcon,
    PlusCircle,
    RotateCcw,
    Search,
    SearchX,
    ShieldCheck,
    Store,
    User,
    X,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard(){
    const router = useRouter();
    const [selectedFilter,setSelectedFilter]=useState<string>("all");
    const [page,setPage]=useState<number>(1);
    const [search,setSearch]=useState<string>("");
    const debouncedSearch=useDebounce<string>(search,500);
    
    // reset page to 1 when debouncedSearch or filter changes
    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, selectedFilter]);
    
    const {
        data: businessesData,
        isLoading: isLoadingBusinesses,
        isError: isErrorBusinesses,
        refetch: refetchBusinesses,
    } = useGetBusinesses(page, debouncedSearch, selectedFilter);
    const businesses=businessesData?.businesses?.data;
    console.log(businesses);
    const paginationData={
        "current_page":businessesData?.businesses?.current_page,
        "last_page":businessesData?.businesses?.last_page,
        "per_page":businessesData?.businesses?.per_page,
        "total":businessesData?.businesses?.total,
    };

    const filters=["all","owner","member"];

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
                        <Input 
                            placeholder="Search your businesses..." 
                            value={search}
                            onChange={(e)=>{
                                setSearch(e.target.value);
                            }}
                            className="pl-10 w-full h-10"
                        />
                        {search && (
                            <X
                                onClick={()=>setSearch("")}
                                className="absolute right-2.5 w-5 h-5 text-muted-foreground cursor-pointer hover:text-destructive"
                            />
                        )}
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    {isLoadingBusinesses ? (
                        Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="bg-card p-4 rounded-lg border border-border/40 shadow-sm flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex flex-row items-start justify-between">
                                        <Skeleton className="w-12 h-12 rounded-lg" />
                                        <Skeleton className="w-20 h-7 rounded-lg" />
                                    </div>

                                    <div className="mt-4 flex flex-col gap-2">
                                        <Skeleton className="h-6 w-3/4 rounded-md" />
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <Skeleton className="w-4 h-4 rounded-full" />
                                            <Skeleton className="h-4 w-28 rounded-md" />
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Skeleton className="w-4 h-4 rounded-full" />
                                            <Skeleton className="h-4 w-36 rounded-md" />
                                        </div>
                                    </div>
                                </div>

                                <Skeleton className="h-10 w-full rounded-lg mt-4" />
                            </div>
                        ))
                    ) : isErrorBusinesses ? (
                        <div className="col-span-full flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-destructive/20 bg-destructive/5 my-4">
                            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center text-destructive mb-4">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground">Failed to load businesses</h3>
                            <p className="text-muted-foreground text-sm max-w-md mt-1 mb-6">
                                An error occurred while fetching your businesses. Please check your connection and try again.
                            </p>
                            <Button
                                onClick={() => refetchBusinesses()}
                                variant="outline"
                                className="flex items-center gap-2 border-destructive/30 hover:bg-destructive/10 text-destructive cursor-pointer"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Try Again
                            </Button>
                        </div>
                    ) : businesses?.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl border border-dashed border-border bg-card/40 my-4">
                            {search || selectedFilter !== "all" ? (
                                <>
                                    <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-4">
                                        <SearchX className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground">No matching businesses</h3>
                                    <p className="text-muted-foreground text-sm max-w-sm mt-1 mb-6">
                                        No businesses match your current search{search ? ` "${search}"` : ""} or filter criteria.
                                    </p>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setSearch("");
                                            setSelectedFilter("all");
                                        }}
                                        className="cursor-pointer"
                                    >
                                        Clear Filters
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                                        <Store className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground">No businesses yet</h3>
                                    <p className="text-muted-foreground text-sm max-w-sm mt-1 mb-6">
                                        You don't have any businesses created or linked to your account yet. Create your first business to get started.
                                    </p>
                                    <Button className="flex items-center gap-2 bg-primary text-white cursor-pointer">
                                        <PlusCircle className="w-4 h-4" />
                                        Add Business
                                    </Button>
                                </>
                            )}
                        </div>
                    ) : (
                        businesses?.map((business: any) => {
                        const role = business?.user_role;
                        const isOwner=role==="owner";
                        const category=business?.category?.name;
                        const CategoryIcon:LucideIcon=getIconByName(business?.category?.icon);
                        const storefrontLink=`ma7ale-lb.com/${business?.slug_store}`;
                        const fallbackLogo=business?.name?.slice(0,2).toUpperCase();

                        return(
                            <div key={business.id} className="bg-card p-4 rounded-lg hover:shadow-lg transition-shadow duration-200">
                                <div className="flex flex-row items-start justify-between">
                                    <div className="flex items-center justify-center bg-primary rounded-lg">
                                        {business?.logo ? (
                                            <Image 
                                                width={64}
                                                height={64}
                                                src={business?.logo_url} 
                                                alt="Business Logo" 
                                                className="w-12 h-12 rounded-lg" 
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-lg text-white flex items-center justify-center">
                                                <span className="text-lg font-medium">{fallbackLogo}</span>
                                            </div>
                                        )}
                                    </div>
                                    {isOwner
                                    ?
                                        <div className="flex flex-row items-center gap-1 p-2 bg-primary/10 text-xs rounded-lg">
                                            <ShieldCheck className="w-4 h-4 text-primary font-bold"/>
                                            <p className="text-primary font-bold capitalize">{role}</p>
                                        </div>
                                    :
                                        <div className="flex flex-row items-center gap-1 p-2 bg-primary/10 text-xs rounded-lg">
                                            <User className="w-4 h-4 text-muted-foreground"/>
                                            <p className="text-muted-foreground font-medium capitalize">{role}</p>
                                        </div>
                                    }
                                </div>

                                <div className="mt-4 flex flex-col gap-2">
                                    <h2 className="text-lg font-bold">{business?.name}</h2>
                                    <div className="flex  items-center gap-1">
                                        <CategoryIcon size={15} className="text-muted-foreground my-auto"/>
                                        <p className="text-muted-foreground text-sm capitalize">{category}</p>
                                    </div>
                                    <div    
                                        onClick={()=>window.open(storefrontLink, "_blank")}
                                        className="flex items-center gap-1 cursor-pointer w-fit group"
                                    >
                                        <Link size={15} className="text-muted-foreground my-auto group-hover:text-primary transition-all duration-200"/>
                                        <p className="text-muted-foreground text-sm group-hover:text-primary group-hover:underline transition-all duration-200">{storefrontLink}</p>
                                    </div>
                                </div>

                                <Button 
                                    className={"flex flex-row justify-between items-center h-10 w-full cursor-pointer mt-4 group/btn "}
                                    variant={"outline"}
                                    onClick={()=>router.push(`/dashboard/${business.id}`)}
                                >
                                    <p className="">Enter Workspace</p>
                                    <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-all duration-200"/>
                                </Button>
                            </div>
                        );
                    })
                )}
                </div>
            </div>
        </div>
    );
}