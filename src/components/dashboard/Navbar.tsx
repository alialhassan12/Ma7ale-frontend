"use client";

import Image from "next/image";
import logo from "@/assets/ma7ale_icon.png";
import ThemeToggle from "../ThemeToggle";
import { useAuth, useLogout } from "@/hooks/useAuth";
import { ChevronDown, LogOut, User, User2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Navbar=()=>{
    const router=useRouter();
    const {data:user}=useAuth();
    const {mutateAsync:logout}=useLogout();

        const handleLogout=async()=>{
        try {
            await logout();
            router.push("/");
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <nav className="sticky top-0 flex flex-row justify-between items-center px-8 py-4 border-b border-border shadow-sm backdrop-blur-sm">
            {/* logo and links */}
            <div 
                className="flex flex-row items-center gap-2 cursor-pointer"
                onClick={()=>{
                    router.push("/");
                }}
            >
                {/* logo */}
                <Image
                    src={logo}
                    alt="Logo"
                    width={150}
                    height={60}
                    priority
                    className="w-auto h-10"
                />
                <div className="flex flex-col">
                    <p className="font-semibold text-lg">Ma7ale</p>
                    <p className="text-xs text-muted-foreground">Merchant Dashboard</p>
                </div>
            </div>
            <div className="flex flex-row items-center">
                <ThemeToggle/>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <Button
                                className="cursor-pointer"
                                variant={"ghost"}
                            >
                                <div className="flex flex-row items-center justify-start gap-2">
                                    <div className="flex p-2 items-center justify-center bg-primary rounded-xl">
                                        <User2 className="w-6 h-6 text-white"/>
                                    </div>
                                    <div className="flex flex-col text-start">
                                        <p className="font-semibold text-sm">{user?.name}</p>
                                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                                    </div>
                                    <ChevronDown className="w-4 h-4"/>
                                </div>
                            </Button>
                        }
                    />
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Account Settings</DropdownMenuItem>
                        </DropdownMenuGroup>
                        <div className="w-full h-px border border-border mt-2 mb-2"/>
                        <DropdownMenuItem 
                            className="flex flex-row items-center gap-2 text-destructive"
                            onClick={handleLogout}
                        >
                            <LogOut/>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
}

export default Navbar;