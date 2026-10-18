"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { signUpSchema, SignUpFormData } from "@/schemas/signupSchema";
import Image from "next/image";
import Lightlogo from "@/assets/lightLogo.png";
import DarkLogo from "@/assets/darkLogo.png";
import google_icon from "@/assets/google_icon.png";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { Check, Eye, EyeClosed, Loader2 } from "lucide-react";
import { useRedirectToGoogle, useSignUp } from "@/hooks/useAuth";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";


const SignUp=()=>{
    const router = useRouter();
    const [showPassowrd,setShowPassword]=useState<boolean>(false);
    const [showPassowrdConfirm,setShowPasswordConfirm]=useState<boolean>(false);

    const {mutateAsync:signup,isPending:isSigningUp}=useSignUp();
    const {mutateAsync:redirectToGoogle,isPending:isRedirecting}=useRedirectToGoogle();
    
    const {
        control,
        handleSubmit,
        formState:{isDirty,isValid},
        watch,
    }=useForm<SignUpFormData>({
        resolver:zodResolver(signUpSchema),
        defaultValues:{
            name:"",
            email:"",
            password:"",
            password_confirmation:""
        },
        mode:"onTouched"
    });

    const password =watch("password");

    const onSubmit=async(data:SignUpFormData)=>{
        try {
            const user=await signup(data);
            toast.add({
                type:'success',
                title:'Success',
                description:'Account created successfully!',
            });

            router.push("/onboarding");
            
        } catch (error:any) {
            toast.add({
                type:'error',
                title:'Error',
                description:error || "Something went wrong",
            });
        }
    }

    const handleGoogleRegister=async()=>{
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

    const passwordCriteria = useMemo(() => {
        return [
            { label: "At least 8 characters", met: Boolean(password && password.length >= 8) },
            { label: "One uppercase letter", met: Boolean(password && /[A-Z]/.test(password)) },
            { label: "One number", met: Boolean(password && /[0-9]/.test(password)) },
            { label: "One special character (!@#$%^&*)", met: Boolean(password && /[!@#$%^&*]/.test(password)) },
        ];
    }, [password]);

    const passwordStrength = useMemo(() => {
        if (!password) return 0;
        return passwordCriteria.filter((c) => c.met).length;
    }, [password, passwordCriteria]);

    const strengthConfig = useMemo(() => {
        switch (passwordStrength) {
            case 1:
                return {
                    label: "Weak",
                    colorClass: "bg-rose-500",
                    badgeClass: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
                };
            case 2:
                return {
                    label: "Fair",
                    colorClass: "bg-orange-500",
                    badgeClass: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
                };
            case 3:
                return {
                    label: "Good",
                    colorClass: "bg-amber-500",
                    badgeClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
                };
            case 4:
                return {
                    label: "Strong",
                    colorClass: "bg-emerald-500",
                    badgeClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
                };
            default:
                return {
                    label: "Too weak",
                    colorClass: "bg-rose-500",
                    badgeClass: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
                };
        }
    }, [passwordStrength]);

    return(
        <div className="flex flex-row h-full  m-10 rounded-md shadow-sm border border-border">
            {/* left form */}
            <div className="flex-1 w-full md:w-1/2  h-full">
                <div className="p-10 md:p-12 w-full">
                    {/* Header */}
                    <div className="space-y-6">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="cursor-pointer" onClick={()=>router.push("/")}>
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
                                Account & Business Creation
                            </span>
                        </div>

                        <div>
                            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                                Bring your business into one place
                            </h1>
                            <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed">
                                Create your merchant account and claim your custom storefront link in less than 2 minutes.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 space-y-4">
                        <Button
                            onClick={handleGoogleRegister}
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
                                name="name"
                                control={control}
                                render={({field,fieldState})=>{
                                    return(
                                        <Field
                                            orientation={"responsive"}
                                            data-invalid={fieldState.invalid}
                                            >
                                            <FieldContent>
                                                <FieldLabel>
                                                    Full Name
                                                </FieldLabel>
                                                <Input
                                                    className="h-12"
                                                    {...field}
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder="Enter your full name"
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
                                                {/* {fieldState.invalid && (
                                                    <FieldError>
                                                        {fieldState.error?.message}
                                                    </FieldError>
                                                )} */}
                                                {password && (
                                                    <div className="mt-2.5 p-3 rounded-lg border border-border/80 bg-muted/40 space-y-2.5 transition-all">
                                                        <div className="flex items-center justify-between text-xs">
                                                            <span className="text-muted-foreground font-medium">Password strength</span>
                                                            <span
                                                                className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border transition-all ${strengthConfig.badgeClass}`}
                                                            >
                                                                {strengthConfig.label}
                                                            </span>
                                                        </div>

                                                        {/* Segmented meter */}
                                                        <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
                                                            {[1, 2, 3, 4].map((step) => {
                                                                const isActive = passwordStrength >= step;
                                                                return (
                                                                    <div
                                                                        key={step}
                                                                        className={`h-full rounded-full transition-all duration-300 ${
                                                                            isActive ? strengthConfig.colorClass : "bg-muted-foreground/20"
                                                                        }`}
                                                                    />
                                                                );
                                                            })}
                                                        </div>

                                                        {/* Requirements checklist */}
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-0.5">
                                                            {passwordCriteria.map((criterion) => (
                                                                <div
                                                                    key={criterion.label}
                                                                    className={`flex items-center gap-1.5 text-xs transition-colors duration-200 ${
                                                                        criterion.met
                                                                            ? "text-emerald-600 dark:text-emerald-400 font-medium"
                                                                            : "text-muted-foreground"
                                                                    }`}
                                                                >
                                                                    <div
                                                                        className={`h-3.5 w-3.5 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 ${
                                                                            criterion.met
                                                                                ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                                                                                : "bg-muted-foreground/20 text-transparent"
                                                                        }`}
                                                                    >
                                                                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                                                                    </div>
                                                                    <span className="text-[11px] sm:text-xs leading-none">
                                                                        {criterion.label}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                
                                            </FieldContent>
                                        </Field>
                                    );
                                }}
                            />
                            <Controller
                                name="password_confirmation"
                                control={control}
                                render={({field,fieldState})=>{
                                    return(
                                        <Field
                                            orientation={"responsive"}
                                            data-invalid={fieldState.invalid}
                                            >
                                            <FieldContent>
                                                <FieldLabel>
                                                    Confirm Password
                                                </FieldLabel>
                                                <div className="relative">
                                                    <Input
                                                        className="h-12"
                                                        {...field}
                                                        aria-invalid={fieldState.invalid}
                                                        placeholder="********"
                                                        autoComplete="new-password"
                                                        type={showPassowrdConfirm ? "text" : "password"}
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        type="button"
                                                        onClick={()=>setShowPasswordConfirm(!showPassowrdConfirm)}
                                                        className="absolute top-0 bottom-0 my-auto right-3 h-6 w-6 cursor-pointer"
                                                        >
                                                        {showPassowrdConfirm ? <EyeClosed className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                    </div>

                    <Button 
                        onClick={handleSubmit(onSubmit)}
                        disabled={!isDirty || !isValid || isSigningUp}
                        className="w-full h-12 rounded-lg cursor-pointer mt-4 text-white font-medium"
                    >
                        {isSigningUp 
                            ?
                            <>
                                <Loader2 className="h-4 w-4 animate-spin"/>
                                Creating Account...
                            </>
                            : "Create Account"
                        }
                    </Button>
                    <div className="flex flex-row items-center justify-center mt-4">
                        <p className="text-sm text-muted-foreground">
                            Already Managing a Store on Ma7ale?
                            <a href="/login" className="ml-2 text-primary font-medium hover:text-primary/80 hover:underline transition-colors cursor-pointer">
                                Login
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            {/* right desktop only */}
            <div className="flex-1 w-full h-full md:w-1/2 hidden md:block bg-primary/20">
            </div>
        </div>
    );
}

export default SignUp;