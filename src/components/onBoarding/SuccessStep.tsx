"use client";

import { Check, LayoutDashboard, PlusCircle, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

const SuccessStep =()=>{
    const router=useRouter();

    return(
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 mx-auto">
                {/* check animation */}
                <div className="relative flex h-64 w-64 items-center justify-center">
                    {/* Expanding waves */}
                    {[0, 1].map((wave) => (
                        <motion.div
                        key={wave}
                        className="absolute h-40 w-40 rounded-[2rem] bg-primary/40"
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: [0, 0.6, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: wave,
                        }}
                        />
                    ))}

                    {/* Main tile */}
                    <motion.div
                        className="relative z-10 flex h-40 w-40 items-center justify-center
                                rounded-[2rem] bg-primary
                                shadow-[0_0_35px_rgba(16,185,129,0.3)]"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: [0.98, 1, 0.98] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Check
                        className="h-14 w-14 text-emerald-200"
                        strokeWidth={3}
                        />
                    </motion.div>
                </div>
            </div>
            <span className="px-3 py-1 mx-auto text-sm bg-muted text-primary font-bold rounded-full">
                Store setup complete
            </span>
            <div className="flex flex-col items-center text-center gap-2">
                <h1 className="text-2xl font-bold">Your Business is ready!</h1>
                <p className="text-sm text-muted-foreground">
                    Your Ma7ale workspace is set up. Now add your first product to start building your storefront and taking orders immediately.
                </p>
            </div>

            {/* buttons */}
            <div className="flex flex-col gap-2">
                <Button
                    className={"flex flex-row items-center w-full h-12 cursor-pointer text-white"}
                >
                    <PlusCircle/>
                    Add your first product
                </Button>

                <Button
                    variant="outline"
                    onClick={()=>router.replace("/home")}
                    className={"flex flex-row items-center w-full h-12 cursor-pointer"}
                >
                    <LayoutDashboard/>
                    Go to merchant dashboard
                </Button>
            </div>
        </div>
    )
}

export default SuccessStep;