import { CreateBusinessFormData } from "@/schemas/createBusinessSchema";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { PhoneInput } from "../ui/phone-input";
import { parsePhoneNumber } from "react-phone-number-input";
import { Button } from "../ui/button";

interface Step {
    id: number;
    title: string;
}

const Step2=({ steps, currentStep,nextStep,prevStep }: { steps: Step[]; currentStep: number; nextStep:()=>void;prevStep:()=>void }) =>{
    const {
        control,
        setValue
    }=useFormContext<CreateBusinessFormData>();

    const existingCountryCode = useWatch({ name: "country_code", control });
    const existingPhoneNumber = useWatch({ name: "phone_number", control });

    const [phone, setPhone] = useState<string | undefined>(
        existingCountryCode && existingPhoneNumber
            ? `${existingCountryCode}${existingPhoneNumber}`
            : ""
    );

    const handlePhoneChange = (val?: string) => {
        setPhone(val);
        if (val) {
            try {
                const parsed = parsePhoneNumber(val);
                if (parsed) {
                    setValue("country_code", `+${parsed.countryCallingCode}`, { shouldValidate: true, shouldDirty: true });
                    setValue("phone_number", parsed.nationalNumber, { shouldValidate: true, shouldDirty: true });
                    return;
                }
            } catch {
                // partial number during typing
            }
        }
        setValue("country_code", "", { shouldValidate: true });
        setValue("phone_number", "", { shouldValidate: true });
    };
    
    const name=useWatch({
        name:"name",
        control
    });

    const slug_store=useWatch({
        name:"slug_store",
        control
    });

    const generateSlugFrom=(name:string|null|undefined)=>{
        if(!name){
            return "";
        }
        // Lowercase and remove non-alphanumeric characters (except hyphens)
        const slug = name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
            .trim();
        
        return slug;
    }

    useEffect(()=>{
        if(!slug_store && name){
            const suggested=generateSlugFrom(name);
            setValue("slug_store",suggested,{shouldDirty:true});
        }
    },[name,setValue]);

    return(
        <div className="flex flex-col gap-4">
            <div className="flex flex-row w-full items-center justify-between">
                <div className="flex flex-row items-center px-4 py-2 gap-2 bg-muted rounded-3xl">
                    <span className="w-3 h-3 rounded-full animate-pulse bg-primary"/>
                    <p className="text-muted-foreground text-sm font-bold">STEP&nbsp;&nbsp;{currentStep+1}&nbsp;&nbsp;OF&nbsp;&nbsp;{steps.length}</p>
                </div>
                <div className="flex flex-row items-center gap-1.5">
                    <p className="text-muted-foreground text-sm">
                        Store Details
                    </p>
                    <Info className="text-primary" size={18}/>
                </div>
            </div>

            <div className="flex flex-col w-full gap-1">
                <h1 className="text-3xl font-bold">Make it easy for customers to order</h1>
                <p className="text-sm text-muted-foreground">
                    Set up your store link and choose how customers will place their orders.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <Controller
                    name="slug_store"
                    control={control}
                    render={({field,fieldState})=>{
                        return(
                            <Field
                                orientation={"responsive"}
                                data-invalid={fieldState.invalid}
                                >
                                <FieldContent>
                                    <FieldLabel>
                                        Your store link
                                    </FieldLabel>
                                    <div className="flex flex-row items-center gap-1 w-full">
                                        <div className="bg-muted rounded-l-md border border-border border-r-0 w-fit p-4 h-12 flex flex-row items-center gap-1 shrink-0">
                                            <p className="text-foreground font-medium text-sm">https://ma7ale-lb.com/</p>
                                        </div>
                                        <Input
                                            className="h-12 rounded-r-md rounded-l-none border border-border"
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="your-shop-name"   
                                            autoComplete="off"
                                        >
                                        </Input>
                                    </div>
                                    {fieldState.invalid && (
                                        <FieldError>
                                            {fieldState.error?.message}
                                        </FieldError>
                                    )}
                                    <FieldDescription
                                        className="flex flex-row items-center gap-1 text-xs"
                                    >
                                        <Info size={14}/>
                                        The slug must be unique and can contain lowercase letters, numbers, and hyphens. Automatically suggested from your business name.
                                    </FieldDescription>
                                </FieldContent>
                            </Field>
                        );
                    }}
                />

                <Controller
                    name="phone_number"
                    control={control}
                    render={({ fieldState }) => {
                        return (
                            <Field
                                orientation={"responsive"}
                                data-invalid={fieldState.invalid}
                            >
                                <FieldContent>
                                    <FieldLabel>
                                        Phone number
                                    </FieldLabel>
                                    <PhoneInput
                                        international
                                        defaultCountry="LB"
                                        value={phone}
                                        onChange={handlePhoneChange}
                                        placeholder="Enter phone number"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError>
                                            {fieldState.error?.message}
                                        </FieldError>
                                    )}
                                    <FieldDescription
                                        className="flex flex-row items-center gap-1 text-xs"
                                    >
                                        <Info size={14}/>
                                        Used for Whatsapp customer orders and communications.
                                    </FieldDescription>
                                </FieldContent>
                            </Field>
                        );
                    }}
                />
            </div>

            <div className="flex w-full justify-between items-center mt-2">
                <Button
                    variant={"outline"}
                    size={"lg"}
                    onClick={prevStep}
                    className={"cursor-pointer px-6 py-2 h-12"}
                >
                    <ArrowLeft size={18} />
                    Back
                </Button>

                <Button
                    variant={"default"}
                    size={"lg"}
                    onClick={nextStep}
                    className={"text-white cursor-pointer px-6 py-2 h-12"}
                >
                    Continue
                    <ArrowRight className="text-white" size={18}/>
                </Button>
            </div>
        </div>
    )
}
export default Step2;
