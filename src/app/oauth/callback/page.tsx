"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { authKeys } from "@/hooks/useAuth";
import { toast } from "@/components/ui/toast";
import axiosInstance from "@/lib/axios";
import Lightlogo from "@/assets/lightLogo.png";
import DarkLogo from "@/assets/darkLogo.png";
import google_icon from "@/assets/google_icon.png";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function OAuthCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();

    const [status, setStatus] = useState<"authenticating" | "success" | "error">("authenticating");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const isHandled = useRef<boolean>(false);

    useEffect(() => {
        if (isHandled.current) return;
        isHandled.current = true;

        const token = searchParams?.get("token");
        const errorParam = searchParams?.get("error") || searchParams?.get("oauth_error");

        if (errorParam || !token) {
            const message = errorParam || "Missing authentication token";
            setStatus("error");
            setErrorMessage(message);
            toast.add({
                type: "error",
                title: "Authentication Failed",
                description: "Google sign-in could not be completed. Please try again.",
            });
            return;
        }

        const processAuth = async () => {
            try {
                // 1. Store the token immediately in localStorage
                localStorage.setItem("auth_token", token);

                // 2. Fetch the user profile directly with an explicit Authorization header
                // (Avoids race condition with useAuth() running on mount before token was saved)
                const response = await axiosInstance.get("/auth/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const userData = response.data?.user;

                if (!userData) {
                    throw new Error("Unable to retrieve user profile from server");
                }

                // 3. Cache the user data in localStorage and React Query cache
                localStorage.setItem("user", JSON.stringify(userData));
                queryClient.setQueryData(authKeys.user, userData);

                setStatus("success");
                toast.add({
                    type: "success",
                    title: "Welcome back!",
                    description: "Signed in successfully with Google.",
                });

                // 4. Navigate based on onboarding status
                setTimeout(() => {
                    if (userData?.onboarding_completed) {
                        router.replace("/home");
                    } else {
                        router.replace("/onboarding");
                    }
                }, 600);

            } catch (err: any) {
                console.error("OAuth callback error:", err);
                localStorage.removeItem("auth_token");
                localStorage.removeItem("user");

                const message =
                    err?.response?.data?.message ||
                    err?.message ||
                    "Failed to load user profile. Please try logging in again.";

                setStatus("error");
                setErrorMessage(message);

                toast.add({
                    type: "error",
                    title: "Sign-in Error",
                    description: message,
                });
            }
        };

        processAuth();
    }, [searchParams, router, queryClient]);

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 bg-background overflow-hidden">
            {/* Background ambient emerald glow */}
            <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-primary/10 rounded-full blur-[120px] dark:bg-primary/20" />

            {/* Main card */}
            <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card/90 backdrop-blur-md p-8 sm:p-10 shadow-xl flex flex-col items-center text-center transition-all duration-300">
                {/* Brand Logo */}
                <div className="mb-8 flex items-center justify-center">
                <Image
                    src={Lightlogo}
                    alt="Logo"
                    width={140}
                    height={44}
                    priority
                    className="block dark:hidden h-9 w-auto object-contain"
                />
                <Image
                    src={DarkLogo}
                    alt="Logo"
                    width={140}
                    height={44}
                    priority
                    className="hidden dark:block h-9 w-auto object-contain"
                />
                </div>

                {/* State Content */}
                {status === "authenticating" && (
                <div className="flex flex-col items-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
                    {/* Animated Loading Badge */}
                    <div className="relative flex items-center justify-center w-20 h-20">
                        <div className="absolute inset-0 rounded-full border-3 border-primary/20 animate-ping opacity-30" />
                        <div className="absolute inset-0 rounded-full border-3 border-transparent border-t-primary animate-spin" />
                        <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-muted border border-border/80 shadow-inner">
                            <Image
                            src={google_icon}
                            alt="Google"
                            width={24}
                            height={24}
                            className="w-6 h-6 object-contain"
                            />
                        </div>
                    </div>

                    {/* Status Headings */}
                    <div className="space-y-1.5">
                        <h2 className="text-xl font-semibold text-foreground tracking-tight">
                            Authenticating with Google
                        </h2>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Verifying your credentials and preparing your dashboard...
                        </p>
                    </div>

                    {/* Shimmering Progress Bar */}
                    <div className="w-48 h-1.5 bg-muted rounded-full overflow-hidden mt-3">
                        <div className="h-full bg-primary rounded-full animate-pulse w-3/4" />
                    </div>
                </div>
                )}

                {status === "success" && (
                <div className="flex flex-col items-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-xl font-semibold text-foreground tracking-tight">
                            Authentication Successful
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Redirecting you to your store...
                        </p>
                    </div>
                </div>
                )}

                {status === "error" && (
                <div className="flex flex-col items-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 border border-destructive/20 text-destructive">
                        <AlertCircle className="w-8 h-8" />
                    </div>
                    <div className="space-y-1.5">
                        <h2 className="text-xl font-semibold text-foreground tracking-tight">
                            Authentication Failed
                        </h2>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            {errorMessage || "We were unable to sign you in with your Google account."}
                        </p>
                    </div>
                    <Button
                        onClick={() => router.replace("/login")}
                        className="mt-2 w-full h-11 font-medium bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
                    >
                        Back to Login
                    </Button>
                </div>
                )}
            </div>

            {/* Subtle footer label */}
            <p className="relative z-10 mt-6 text-xs text-muted-foreground/80">
                Secured by Ma7ale Auth
            </p>
        </div>
    );
}

export default function OauthCallbackPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen w-full flex items-center justify-center bg-background">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            }
        >
            <OAuthCallbackContent />
        </Suspense>
    );
}