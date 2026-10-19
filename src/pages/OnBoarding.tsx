"use client";

import Image from "next/image";
import Lightlogo from "@/assets/lightLogo.png";
import DarkLogo from "@/assets/darkLogo.png";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Step1 from "@/components/onBoarding/Step1";
import Step2 from "@/components/onBoarding/Step2";
import Step3 from "@/components/onBoarding/Step3";
import { FormProvider, useForm } from "react-hook-form";
import { CreateBusinessFormData, createBusinessSchema } from "@/schemas/createBusinessSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBusiness } from "@/hooks/useBusiness";
import { toast } from "@/components/ui/toast";
import SuccessStep from "@/components/onBoarding/SuccessStep";

const OnBoarding = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        { id: 0, title: "Profile" },
        { id: 1, title: "Catalogue" },
        { id: 2, title: "Channels" },
        { id: 3, title: "Success" },
    ];


    const nextStep=async()=>{
        if(currentStep===0){
            const isValid=await form.trigger([
                "name",
                "business_category_id"
            ]);
            if(isValid){
                setCurrentStep(currentStep+1);
            }
        }else if(currentStep===1){
            const isValid=await form.trigger([
                "slug_store",
                "country_code",
                "phone_number",
                "order_method"
            ]);
            if(isValid){
                setCurrentStep(currentStep+1);
            }
        }
    }

    const prevStep=()=>{
        if(currentStep>0){
            setCurrentStep(currentStep-1);
        }
    }

    const {mutateAsync:createBusiness,isPending:isCreatingBusiness}=useCreateBusiness();

    const handleCreateBusiness=async()=>{
        if(isCreatingBusiness) return;

        try {
            const result=await createBusiness({
                name:form.getValues("name"),
                business_category_id:form.getValues("business_category_id"),
                slug_store:form.getValues("slug_store"),
                country_code:form.getValues("country_code"),
                phone_number:form.getValues("phone_number"),
                order_method:"whatsapp",
            });

            setCurrentStep(3);

            toast.add({
                title:"Success!",
                type:"success",
                description: result?.message || "Business created successfully",
            });

        } catch (error:any) {
            toast.add({
                title:"Error!",
                type:"error",
                description:error.message,
            });
        }
    }

    const stepContent=[
        <Step1 steps={steps} currentStep={currentStep} nextStep={nextStep}/>,
        <Step2 steps={steps} currentStep={currentStep} nextStep={nextStep} prevStep={prevStep}/>,
        <Step3 steps={steps} currentStep={currentStep} nextStep={handleCreateBusiness} prevStep={prevStep} isCreatingBusiness={isCreatingBusiness}/>,
        <SuccessStep/>,
    ];

    const form=useForm<CreateBusinessFormData>({
        resolver:zodResolver(createBusinessSchema),
        defaultValues:{
            business_category_id:"",
            country_code:"",
            name:"",
            phone_number:"",
            order_method:"whatsapp",
            slug_store:"",
        },
        mode:"onTouched"
    });

    return (
        <div className="flex flex-col h-screen w-full mx-auto items-center justify-start pt-10 gap-4">
            <Image
                src={Lightlogo}
                alt="Logo"
                width={280}
                height={88}
                priority
                className="block dark:hidden h-18 w-auto object-contain"
            />
            <Image
                src={DarkLogo}
                alt="Logo"
                width={280}
                height={88}
                priority
                className="hidden dark:block h-18 w-auto object-contain"
            />
            <div className="flex p-1 flex-row items-center rounded-lg bg-primary/20">
                {steps.map((step, index) => {
                    const isActive = currentStep === index;
                    return (
                        <div key={step.id} className="flex flex-row items-center">
                            <div
                                className={`relative px-4 py-1.5 text-sm font-medium rounded-md outline-none ${
                                    isActive ? "text-white" : "text-foreground/70"
                                }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeStepPill"
                                        className="absolute inset-0 bg-primary rounded-md -z-0"
                                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10 select-none">{step.title}</span>
                            </div>
                            {index !== steps.length - 1 && (
                                <span className="w-5 mx-1 h-0.5 rounded-full bg-foreground/30" />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* content */}
            <div className="max-w-2xl w-full flex flex-col p-6 border border-border rounded-lg ">
                <AnimatePresence mode="wait">
                    <FormProvider {...form}>
                        <motion.div
                            key={currentStep}
                            initial={{ x: 40, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -40, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            >
                            {stepContent[currentStep]}
                        </motion.div>
                    </FormProvider>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default OnBoarding;