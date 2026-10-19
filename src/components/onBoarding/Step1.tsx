import { useGetBusinessCategories } from "@/hooks/useBusinessCategories";
import { CreateBusinessFormData } from "@/schemas/createBusinessSchema";
import { ArrowRight, BadgeCheck, LucideIcon } from "lucide-react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Field, FieldContent, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { BusinessCategory } from "@/@types/businessCategory";
import { getIconByName } from "../AVAILABLE_ICONS";
import { Button } from "../ui/button";
import { useEffect } from "react";

interface Step {
    id: number;
    title: string;
}

const Step1 = ({ steps, currentStep,nextStep }: { steps: Step[]; currentStep: number,nextStep:()=>void }) => {
    const {data:categoriesData,}=useGetBusinessCategories();
    const categories=categoriesData?.categories;
    const categoryItems:{
        label:string,
        value:string,
        icon?:LucideIcon
    }[]=categories?.map((category:BusinessCategory)=>{
        const Icon=getIconByName(category.icon);
        return{
            value:category.id,
            label:(
                <div className="flex flex-row gap-2 items-center">
                    <Icon size={20} />
                    <span>{category.name}</span>
                </div>
            ),
        }
    });

    const {
        control,
        setValue
    }=useFormContext<CreateBusinessFormData>();
    const watchCategoryId=useWatch({
        name:"business_category_id",
        control
    })

    // set the category name once the category id is selected
    useEffect(()=>{
        if(watchCategoryId){
            const category:BusinessCategory=categories?.find((category:BusinessCategory)=>category.id===watchCategoryId) as BusinessCategory;
            if(category){
                setValue("business_category_name",category.name);
            }
        }
    },[watchCategoryId])


    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row w-full items-center justify-between">
                <div className="flex flex-row items-center px-4 py-2 gap-2 bg-muted rounded-3xl">
                    <span className="w-3 h-3 rounded-full animate-pulse bg-primary"/>
                    <p className="text-muted-foreground text-sm font-bold">STEP&nbsp;&nbsp;{currentStep+1}&nbsp;&nbsp;OF&nbsp;&nbsp;{steps.length}</p>
                </div>
                <div className="flex flex-row items-center gap-1.5">
                    <p className="text-muted-foreground text-sm">
                        Business Identity
                    </p>
                    <BadgeCheck className="text-primary" size={18}/>
                </div>
            </div>

            <div className="flex flex-col w-full gap-1">
                <h1 className="text-3xl font-bold">Let's set up your business</h1>
                <p className="text-sm text-muted-foreground">
                    First, tell us a little about your business. You can update these details later.
                </p>
            </div>

            <div className="flex flex-col gap-4">
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
                                        Business Name
                                    </FieldLabel>
                                    <Input
                                        className="h-12"
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter the business name"   
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
                    name="business_category_id"
                    control={control}
                    render={({field,fieldState})=>{
                        return(
                            <Field
                                orientation={"responsive"}
                                data-invalid={fieldState.invalid}
                            >
                                <FieldContent>
                                    <FieldLabel>
                                        Business Category
                                    </FieldLabel>
                                    <Select items={categoryItems} value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger style={{height:"48px"}} className=" w-full cursor-pointer">
                                            <SelectValue placeholder="Select a category"/>
                                        </SelectTrigger>
                                        <SelectContent className="bg-card p-2 space-y-2">
                                            {categories?.map((category:BusinessCategory)=>{
                                                const Icon:LucideIcon=getIconByName(category.icon);
                                                return(
                                                    <SelectItem 
                                                        key={category.id} 
                                                        value={category.id} 
                                                        className="cursor-pointer hover:bg-muted  transition-colors"
                                                    >
                                                        <div className="flex flex-row gap-2 items-center">
                                                            <Icon size={20} className="text-primary"/>
                                                            <p className="text-sm">{category.name}</p>
                                                        </div>
                                                    </SelectItem>
                                                )
                                            })}
                                        </SelectContent>
                                    </Select>
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
            </div>

            <div className="flex w-full justify-end mt-2">
                <Button
                    variant={"default"}
                    size={"lg"}
                    onClick={nextStep}
                    className={"text-white cursor-pointer px-6 py-2 h-12"}
                >
                    Continue
                    <ArrowRight className=" text-white" size={18}/>
                </Button>
            </div>
        </div>
    );
}

export default Step1;