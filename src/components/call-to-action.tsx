"use client";

import {ActionButton} from "@/components/action-button";
import BackgroundStars from "@/assets/stars.png";
import BackgroundGrid from "@/assets/grid-lines.png";
import {motion, useMotionTemplate, useMotionValue, useScroll, useTransform} from "framer-motion";
import {RefObject, useEffect, useRef} from "react";

{/* Custom Hook for Relative Mouse Position */}
const useRelativeMousePosition = (to: RefObject<HTMLElement>) => {
    const mouseX = useMotionValue(0); // Tracks the x-coordinate of the mouse relative to the element
    const mouseY = useMotionValue(0); // Tracks the y-coordinate of the mouse relative to the element

    const updateMousePosition = (event: MouseEvent) => {
        if (!to.current) return; // Ensure the target element is available
        const { top, left } = to.current.getBoundingClientRect();
        mouseX.set(event.x - left); // Calculate mouse x-position relative to the element
        mouseY.set(event.y - top); // Calculate mouse y-position relative to the element
    };

    useEffect(() => {
        window.addEventListener('mousemove', updateMousePosition); // Attach the mousemove event listener
        return () => window.removeEventListener('mousemove', updateMousePosition); // Clean up on unmount
    });

    return [mouseX, mouseY];
};

export function CallToAction() {
    const sectionRef = useRef<HTMLElement>(null); // Reference for the section element
    const borderedDivRef = useRef<HTMLDivElement>(null); // Reference for the div with interactive background

    // Track scroll progress and map it to background position values for a parallax effect
    const { scrollYProgress } = useScroll({target: sectionRef, offset: [`start end`, 'end start']});
    const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300]);

    // Get relative mouse position values
    const [mouseX, mouseY] = useRelativeMousePosition(borderedDivRef);

    // Create a dynamic radial gradient mask centered at the mouse position
    const maskImage = useMotionTemplate`radial-gradient(50% 50% at ${mouseX}px ${mouseY}px, black, transparent)`;

    return (
        <>
            <section className={"py-20 md:py-24"} ref={sectionRef}>
                <div className={"container"}>
                    {/* Main interactive background with scrolling animation */}
                    <motion.div
                        animate={{backgroundPositionX: BackgroundStars.width,}} // Continuous horizontal animation for the stars
                        transition={{duration: 120, repeat: Infinity, ease: 'linear'}}
                        className={"border border-muted py-24 px-6 rounded-xl overflow-hidden relative group"}
                        style={{backgroundImage: `url(${BackgroundStars.src})`, backgroundPositionY}}>

                        {/* Overlay grid with radial mask animation */}
                        <div
                            className={
                                "absolute inset-0 bg-[rgb(74,32,138)] bg-blend-overlay [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)] group-hover:opacity-0 transition duration-700"
                            }
                            style={{backgroundImage: `url(${BackgroundGrid.src})`}}
                        />

                        {/* Dynamic radial mask applied on hover */}
                        <motion.div
                            className={"absolute inset-0 bg-[rgb(74,32,138)] bg-blend-overlay opacity-0 group-hover:opacity-100 transition duration-700"}
                            style={{backgroundImage: `url(${BackgroundGrid.src})`, maskImage: maskImage}}
                            ref={borderedDivRef}
                        />

                        {/* Content section */}
                        <div className={"relative"}>
                            {/* Main heading */}
                            <h2 className={"text-5xl tracking-tighter text-center font-medium"}>
                                AI-driven SEO for everyone
                            </h2>
                            {/* Subtext */}
                            <p className={"text-center text-lg md:text-xl text-white/70 tracking-tight px-4 mt-5"}>
                                Achieve clear, impactful results without the complexity.
                            </p>
                            {/* Action button */}
                            <div className={"flex justify-center mt-8"}>
                                <ActionButton label={"Join Waitlist for Early Access"}/>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
