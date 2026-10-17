"use client";

import Image from "next/image";
import Lightlogo from "@/assets/lightLogo.png";
import DarkLogo from "@/assets/darkLogo.png";
import google_icon from "@/assets/google_icon.png";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useLogin, useRedirectToGoogle } from "@/hooks/useAuth";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed, Loader2 } from "lucide-react";

const Login =()=>{
    const router=useRouter();
    const [showPassowrd,setShowPassword]=useState<boolean>(false);

    const {mutateAsync:login,isPending:isLoggingIn}=useLogin();
    const {mutateAsync:redirectToGoogle,isPending:isRedirecting}=useRedirectToGoogle();

    const {
        control,
        handleSubmit,
        formState:{isDirty,isValid},
    }=useForm<LoginFormData>({
        resolver:zodResolver(loginSchema),
        defaultValues:{
            email:"",
            password:""
        },
        mode:"onTouched"
    });

    const onSubmit=async(data:LoginFormData)=>{
        try {
            await login(data);
            toast.add({
                type:"success",
                title:"Success",
                description:"Login successful"
            });

            router.push("/home");
        } catch (error:any) {
            toast.add({
                type:"error",
                title:"Error",
                description:error || "Something went wrong!"
            });
        }
    }

    const handleGoogleLogin=async()=>{
        try {
            await redirectToGoogle();
        } catch (error:any) {
            toast.add({
                type:"error",
                title:"Error",
                description:error || "Something went wrong!"
            });
        }
    }

    return(
        <div className="flex flex-row h-full  m-10 rounded-md shadow-sm border border-border">
            {/* left form */}
            <div className="flex-1 w-full md:w-1/2  h-full">
                <div className="p-10 md:p-12 w-full">
                    {/* Header */}
                    <div className="space-y-6">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <Image
                                    src={Lightlogo}
                                    alt="Logo"
                                    width={120}
                                    height={36}
                                    className="block dark:hidden h-8 w-auto object-contain"
                                    priority
                                />
                                <Image
                                    src={DarkLogo}
                                    alt="Logo"
                                    width={120}
                                    height={36}
                                    className="hidden dark:block h-8 w-auto object-contain"
                                    priority
                                />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-md border border-border/50">
                                Merchant Login
                            </span>
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                                Welcome back
                            </h1>
                            <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed">
                                Sign in to manage your storefront, track orders, and update inventory.
                            </p>
                        </div>
                    </div>

                    {/* sign up options */}
                    <div className="space-y-6 mt-6">
                        <Button
                            onClick={handleGoogleLogin}
                            disabled={isRedirecting}
                            className="flex flex-row items-center gap-2 w-full justify-center h-12 cursor-pointer"
                            variant="outline"
                        >
                            {isRedirecting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <Image
                                        src={google_icon}
                                        alt="Google"
                                        width={20}
                                        height={20}
                                        className="w-5 h-5"
                                        />
                                    <p className="font-medium text-foreground">
                                        Continue with Google
                                    </p>
                                </>
                            )}
                        </Button>

                        {/* or */}
                        <div className="flex flex-row items-center gap-2">
                            <div className="flex-1 border border-border"></div>
                            <p className="text-muted-foreground text-xs">OR</p>
                            <div className="flex-1 border border-border"></div>
                        </div>

                        <form className="mt-6 space-y-4">
                            <Controller
                                name="email"
                                control={control}
                                render={({field,fieldState})=>{
                                    return(
                                        <Field
                                            orientation={"responsive"}
                                            data-invalid={fieldState.invalid}
                                            >
                                            <FieldContent>
                                                <FieldLabel>
                                                    Email
                                                </FieldLabel>
                                                <Input
                                                    className="h-12"
                                                    {...field}
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder="example@gmail.com"
                                                    autoComplete="off"
                                                    />
                                                {fieldState.invalid && (
                                                    <FieldError>
                                                        {fieldState.error?.message}
                                                    </FieldError>
                                                )}
                                            </FieldContent>
                                        </Field>
                                    );
                                }}
                            />
                            <Controller
                                name="password"
                                control={control}
                                render={({field,fieldState})=>{
                                    return(
                                        <Field
                                            orientation={"responsive"}
                                            data-invalid={fieldState.invalid}
                                            >
                                            <FieldContent>
                                                <FieldLabel>
                                                    Password
                                                </FieldLabel>
                                                <div className="relative">
                                                    <Input
                                                        className="h-12"
                                                        {...field}
                                                        aria-invalid={fieldState.invalid}
                                                        placeholder="********"
                                                        autoComplete="new-password"
                                                        type={showPassowrd ? "text" : "password"}
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        type="button"
                                                        onClick={()=>setShowPassword(!showPassowrd)}
                                                        className="absolute top-0 bottom-0 my-auto right-3 h-6 w-6 cursor-pointer "
                                                    >
                                                        {showPassowrd ? <EyeClosed className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                    </Button>
                                                </div>
                                                {fieldState.invalid && (
                                                    <FieldError>
                                                        {fieldState.error?.message}
                                                    </FieldError>
                                                )}
                                            </FieldContent>
                                        </Field>
                                    );
                                }}
                            />
                        </form>
                        <Button 
                            onClick={handleSubmit(onSubmit)}
                            disabled={!isDirty || !isValid || isLoggingIn}
                            className="w-full h-12 rounded-lg cursor-pointer text-white font-medium"
                        >
                            {isLoggingIn 
                                ?
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin"/>
                                    Logging In...
                                </>
                                : "Login"
                            }
                        </Button>
                        <div className="flex flex-row items-center justify-center">
                            <p className="text-sm text-muted-foreground">
                                Don't have an account yet?
                                <a href="/signup" className="ml-2 text-primary font-medium hover:text-primary/80 hover:underline transition-colors cursor-pointer">
                                    Create Account
                                </a>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
            
            {/* right desktop only */}
            <div className="flex-1 w-full h-full md:w-1/2 hidden md:block bg-primary/20">
            </div>
        </div>
    );
}

export default Login;