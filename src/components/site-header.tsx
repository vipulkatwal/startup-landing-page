"use client"

import Link from "next/link";
import SiteLogo from "@/assets/logo.svg"
import {CodeXml, Feather, MenuIcon, Newspaper, Wallet2} from "lucide-react";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import {useState} from "react";
import {ActionButton} from "@/components/action-button";

export default function SiteHeader() {
    const [isOpen, setIsOpen] = useState(false) // State to manage the mobile menu (Sheet) visibility

    return (
        <>
            <header className={"py-4 border-b max-md:backdrop-blur md:border-none sticky top-0 z-10"}>
                {/* Main container for header elements */}
                <div className={"container max-md:px-4"}>
                    {/* Centralized header layout */}
                    <div className={"flex items-center justify-between md:border md:p-2.5 md:rounded-xl max-w-2xl mx-auto md:backdrop-blur "}>
                        {/* Site logo linking to the homepage */}
                        <Link href={"/"}>
                            <div className={"border size-10 rounded-lg inline-flex items-center justify-center"}>
                                <SiteLogo className={"size-8 h-auto"} />
                            </div>
                        </Link>

                        {/* Navigation for larger screens */}
                        <section className={"max-md:hidden"}>
                            <nav className={"flex gap-8 items-center text-sm"}>
                                <Link href={"#"} className={"text-white/70 hover:text-white transition"}>Features</Link>
                                <Link href={"#"} className={"text-white/70 hover:text-white transition"}>Developers</Link>
                                <Link href={"#"} className={"text-white/70 hover:text-white transition"}>Pricing</Link>
                                <Link href={"#"} className={"text-white/70 hover:text-white transition"}>Changelog</Link>
                            </nav>
                        </section>

                        {/* Actions and mobile navigation */}
                        <section className={"flex max-md:gap-4 items-center"}>
                            {/* Call-to-action button */}
                            <ActionButton label={"Join Waitlist"} />

                            {/* Mobile menu trigger and content */}
                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger>
                                    {/* Hamburger menu icon for mobile */}
                                    <MenuIcon className={"size-9 md:hidden hover:text-white/70 transition"}/>
                                </SheetTrigger>

                                <SheetContent side={"top"} className={"p-8"}>
                                    {/* Mobile menu header with logo */}
                                    <div className={"inline-flex items-center center gap-3"}>
                                        <div className={"border size-8 rounded-lg inline-flex items-center justify-center"}>
                                            <SiteLogo className={"size-6 h-auto"}/>
                                        </div>
                                        <p className={"font-bold"}>AI Startup Landing Page</p>
                                    </div>

                                    {/* Mobile menu navigation links */}
                                    <div className={"mt-8 mb-4"}>
                                        <nav className={"grid gap-4 items-center text-lg"}>
                                            <Link href={"#"} className={"flex items-center gap-3 text-white/70 hover:text-white transition"}>
                                                <Feather className={"size-6"} />
                                                Features
                                            </Link>
                                            <Link href={"#"} className={"flex items-center gap-3 text-white/70 hover:text-white transition"}>
                                                <CodeXml className={"size-6"} />
                                                Developers
                                            </Link>
                                            <Link href={"#"} className={"flex items-center gap-3 text-white/70 hover:text-white transition"}>
                                                <Wallet2 className={"size-6"} />
                                                Pricing
                                            </Link>
                                            <Link href={"#"} className={"flex items-center gap-3 text-white/70 hover:text-white transition"}>
                                                <Newspaper className={"size-6"} />
                                                Changelog
                                            </Link>
                                        </nav>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </section>
                    </div>
                </div>
            </header>
        </>
    )
}
