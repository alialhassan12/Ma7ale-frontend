"use client";
import Image from "next/image";
import Lightlogo from "@/assets/lightLogo.png";
import DarkLogo from "@/assets/darkLogo.png";
import ThemeToggle from "../ThemeToggle";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const router=useRouter();

    return (
        <nav className="sticky top-0 flex flex-row justify-between items-center px-8 py-4 border-b border-border shadow-sm backdrop-blur-sm">
            {/* logo and links */}
            <div className="flex flex-row items-center gap-6">
                {/* logo */}
                <div>
                    <Image
                        src={Lightlogo}
                        alt="Logo"
                        width={150}
                        height={60}
                        priority
                        className="block dark:hidden w-auto h-10"
                    />
                    <Image
                        src={DarkLogo}
                        alt="Logo"
                        width={150}
                        height={60}
                        priority
                        className="hidden dark:block w-auto h-10"
                    />
                </div>
                {/* links */}
                <ul className="flex flex-row items-center gap-4 list-none">
                    <li>
                        <a href="" className="text-md font-medium hover:text-primary transition-colors">Features</a>
                    </li>
                    <li>
                        <a href="" className="text-md font-medium hover:text-primary transition-colors">How It Works</a>
                    </li>
                    <li>
                        <a href="" className="text-md font-medium hover:text-primary transition-colors">Storefront</a>
                    </li>
                </ul>
            </div>
            <div className="flex flex-row items-center gap-4">
                <ThemeToggle />
                <a href="" className="text-md font-medium hover:text-primary transition-colors">Login</a>
                <Button
                    onClick={()=>router.push('/signup')}
                    className="bg-primary text-white font-medium rounded-lg px-5 py-4 cursor-pointer"
                >
                    Get Started For Free
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;