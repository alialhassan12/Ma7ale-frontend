"use client";
import Navbar from "@/components/public/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const Landing = () => {
    const router = useRouter();

    
    return (
        <div>
            <Navbar />
            <div className="px-8 mt-2">
                {/* hero section */}
                <section className="w-full flex flex-col gap-4 text-center px-12 pt-12 " >
                    <span className="bg-primary/10 rounded-full px-4 py-2 w-fit mx-auto font-medium text-primary text-sm">
                        Designed For Whatsapp and Instagram Sellers
                    </span>
                    <h1 className="text-4xl font-bold leading-tight">
                        Your business,<span className="text-primary">all in one place.</span>
                    </h1>
                    <p className="text-md text-muted-foreground w-1/2 mx-auto">
                        Manage your products, orders, and inventory. Share your storefront link and make it effortless for customers to order via WhatsApp without upfront platform fees.
                    </p>
                    <div className="flex flex-row items-center gap-4 justify-center mt-2">
                        <Button
                            onClick={()=>router.push('/signup')}
                            className="bg-primary text-white  font-medium rounded-lg px-5 py-6 cursor-pointer"
                        >
                            Get Started For Free <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button className="bg-card text-foreground rounded-lg px-5 py-6 cursor-pointer hover:bg-foreground/10">
                            <PlayCircle className="h-4 w-4" /> See How It Works
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Landing;