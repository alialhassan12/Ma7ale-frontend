import { CreateBusinessFormData } from "@/schemas/createBusinessSchema";
import { ArrowLeft, IdCard, Link, Loader2, MessageCircleText, Rocket, Shield, ShieldCheck } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { useCreateBusiness } from "@/hooks/useBusiness";
import { toast } from "../ui/toast";

interface Step {
    id: number;
    title: string;
}

const Step3=({ steps, currentStep,prevStep,nextStep,isCreatingBusiness }: { steps: Step[]; currentStep: number; prevStep: () => void; nextStep: () => void; isCreatingBusiness:boolean }) =>{
    const {getValues}=useFormContext<CreateBusinessFormData>();
    
    return(
        <div className="flex flex-col gap-4">
            <div className="flex flex-row w-full items-center justify-between">
                <div className="flex flex-row items-center px-4 py-2 gap-2 bg-muted rounded-3xl">
                    <span className="w-3 h-3 rounded-full animate-pulse bg-primary"/>
                    <p className="text-muted-foreground text-sm font-bold">STEP&nbsp;&nbsp;{currentStep+1}&nbsp;&nbsp;OF&nbsp;&nbsp;{steps.length}</p>
                </div>
                <div className="flex flex-row items-center gap-1.5">
                    <p className="text-muted-foreground text-sm">
                        Final Verification
                    </p>
                    <ShieldCheck className="text-primary" size={18}/>
                </div>
            </div>
            <div className="flex flex-col w-full gap-1">
                <h1 className="text-3xl font-bold">Your Business is almost ready!</h1>
                <p className="text-sm text-muted-foreground">
                    Review your details before creating your business. Everything is configured for seamless catalog browsing and instant WhatsApp checkout.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                {/* identity card */}
                <div className="flex flex-row items-center justify-between bg-card rounded-lg">
                    <div className="flex flex-row items-center p-4 gap-3 ">
                        {/* icon */}
                        <div className="p-2 bg-muted rounded-lg flex items-center">
                            <IdCard/>
                        </div>
                        {/* info */}
                        <div className="flex flex-col w-full">
                            <p className="font-medium text-sm text-muted-foreground">Business Identity</p>
                            <div className="flex flex-row items-center gap-1">
                                <p className="text-md font-semibold text-foreground">
                                    {getValues("name")}
                                </p>
                                <span className="flex flex-row w-fit items-center gap-1 bg-primary/10 px-2.5 py-1 rounded-full">
                                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse"/>
                                    <p className="text-md font-semibold text-sm text-primary">
                                        {getValues("business_category_name")}
                                    </p>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Storefront card */}
                <div className="flex flex-row items-center justify-between bg-card rounded-lg">
                    <div className="flex flex-row items-center p-4 gap-3 ">
                        {/* icon */}
                        <div className="p-2 bg-muted rounded-lg flex items-center">
                            <Link/>
                        </div>
                        {/* info */}
                        <div className="flex flex-col w-full">
                            <p className="font-medium text-sm text-muted-foreground">Storefront Link</p>
                            <div className="flex flex-row items-center gap-1">
                                <p className="text-md font-semibold text-foreground">
                                    https://ma7ale-lb.com/{getValues("slug_store")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Whatsapp phone card */}
                <div className="flex flex-row items-center justify-between bg-card rounded-lg">
                    <div className="flex flex-row items-center p-4 gap-3 ">
                        {/* icon */}
                        <div className="p-2 bg-muted rounded-lg flex items-center">
                            <MessageCircleText/>
                        </div>
                        {/* info */}
                        <div className="flex flex-col w-full">
                            <p className="font-medium text-sm text-muted-foreground">
                                Whatsapp Phone
                            </p>
                            <div className="flex flex-row items-center gap-1">
                                <p className="text-md font-semibold text-foreground">
                                    {getValues("country_code")}
                                    &nbsp;
                                    {getValues("phone_number")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-row items-center justify-center bg-secondary/30 rounded-lg p-4 gap-2">
                {/* icon */}
                <div className="flex items-center p-2 bg-primary rounded-full">
                    <Shield className="text-white"/>
                </div>
                {/* info */}
                <div className="flex flex-col w-full gap-1">
                    <p className="font-semibold text-foreground">Full control guaranteed</p>
                    <p className="text-sm text-muted-foreground">
                        You can update your business details, modify branding, and adjust order routing anytime from your merchant dashboard.
                    </p>
                </div>
            </div>
            <div className="flex w-full justify-between items-center mt-2">
                <Button
                    variant={"outline"}
                    size={"lg"}
                    onClick={prevStep}
                    disabled={isCreatingBusiness}
                    className={"cursor-pointer px-6 py-2 h-12"}
                >
                    <ArrowLeft size={18} />
                    Back
                </Button>

                <Button
                    variant={"default"}
                    size={"lg"}
                    onClick={nextStep}
                    disabled={isCreatingBusiness}
                    className={"text-white cursor-pointer px-6 py-2 h-12"}
                >
                    {isCreatingBusiness?
                    <>
                        <Loader2 className="animate-spin text-white" size={18}/>
                        <span>Creating...</span>
                    </>:
                    <>
                        Create my business
                        <Rocket className="text-white" size={18}/>
                    </>}
                </Button>
            </div>
        </div>
    )
}
export default Step3;
