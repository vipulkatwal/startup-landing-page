"use client";

import {DotLottieCommonPlayer, DotLottiePlayer,} from "@dotlottie/react-player";
import ProductImage from "@/assets/product-image.png";
import {animate, motion, useMotionTemplate, useMotionValue, ValueAnimationTransition,} from "framer-motion";
import {ComponentPropsWithoutRef, useEffect, useRef, useState} from "react";

const tabs = [
    {
        icon: "/assets/lottie/vroom.lottie", // Lottie animation for the first tab.
        title: "User-friendly dashboard", // Title for the feature.
        isNew: false, // Indicates if the feature is new.
        backgroundPositionX: 0, // Background X-position for this tab.
        backgroundPositionY: 0, // Background Y-position for this tab.
        backgroundSizeX: 150, // Background size for this tab.
    },
    {
        icon: "/assets/lottie/click.lottie",
        title: "One-click optimization",
        isNew: false,
        backgroundPositionX: 98,
        backgroundPositionY: 100,
        backgroundSizeX: 135,
    },
    {
        icon: "/assets/lottie/stars.lottie",
        title: "Smart keyword generator",
        isNew: true, // New feature indicator.
        backgroundPositionX: 100,
        backgroundPositionY: 27,
        backgroundSizeX: 177,
    },
];

// Component to display individual feature tabs
const FeatureTab = (
    props: (typeof tabs)[number] & ComponentPropsWithoutRef<"div"> & { selected: boolean }
) => {
    const tabRef = useRef<HTMLDivElement>(null);
    const dotLottieRef = useRef<DotLottieCommonPlayer>(null);

    const xPercentage = useMotionValue(0); // Motion value for horizontal percentage.
    const yPercentage = useMotionValue(0); // Motion value for vertical percentage.

    const maskImage = useMotionTemplate`radial-gradient(80px 80px at ${xPercentage}% ${yPercentage}%, black, transparent)`; // Creates a radial gradient for the hover effect.

    useEffect(() => {
        // Runs the circular hover animation only if the tab is selected.
        if (!tabRef.current || !props.selected) return;

        xPercentage.set(0);
        yPercentage.set(0);

        // Calculates animation path based on the tab's dimensions.
        const {height, width} = tabRef.current?.getBoundingClientRect();
        const circumference = height * 2 + width * 2;
        const times = [
            0,
            width / circumference,
            (width + height) / circumference,
            (width * 2 + height) / circumference,
            1,
        ];

        const options: ValueAnimationTransition = {
            times, // Control points for animation.
            duration: 5, // Animation duration.
            repeat: Infinity, // Loops infinitely.
            repeatType: "loop",
            ease: "linear", // Linear easing for smooth animation.
        };

        // Animates hover effect around the tab.
        animate(xPercentage, [0, 100, 100, 0, 0], options);
        animate(yPercentage, [0, 0, 100, 100, 0], options);
    }, [props.selected]);

    const handleTabHover = () => {
        // Resets and plays the Lottie animation on hover.
        if (dotLottieRef.current === null) return;
        dotLottieRef.current.seek(0);
        dotLottieRef.current.play();
    };

    return (
        <div
            onMouseEnter={handleTabHover} // Triggers animation on hover.
            className={
                "border border-muted flex items-center p-2.5 gap-2.5 rounded-xl relative cursor-pointer hover:bg-muted/30"
            }
            ref={tabRef}
            onClick={props.onClick} // Handles tab selection on click.
        >
            {props.selected && (
                <motion.div
                    style={{maskImage}} // Applies the hover mask.
                    className={
                        "absolute inset-0 -m-px border border-[#A369FF] rounded-xl"
                    }
                />
            )}

            {/* Lottie player for the tab icon */}
            <div className={"size-12 border border-muted rounded-lg inline-flex items-center justify-center"}>
                <DotLottiePlayer
                    src={props.icon}
                    className={"size-5"}
                    autoplay
                    ref={dotLottieRef}
                />
            </div>
            <div className={"font-medium"}>{props.title}</div>
            {props.isNew && (
                <div className={"text-xs rounded-full text-white px-2 py-0.5 bg-[#8c44ff] font-semibold"}>
                    New
                </div>
            )}
        </div>
    );
};

export function Features() {
    const [selectedTab, setSelectedTab] = useState(0); // Tracks currently selected tab.

    const backgroundPositionX = useMotionValue(tabs[0].backgroundPositionX); // Initial X-position for the background.
    const backgroundPositionY = useMotionValue(tabs[0].backgroundPositionY); // Initial Y-position for the background.
    const backgroundSizeX = useMotionValue(tabs[0].backgroundSizeX); // Initial size for the background.

    const backgroundPosition = useMotionTemplate`${backgroundPositionX}% ${backgroundPositionY}%`; // Motion template for background position.
    const backgroundSize = useMotionTemplate`${backgroundSizeX}% auto`; // Motion template for background size.

    const handleSelectTab = (index: number) => {
        setSelectedTab(index); // Updates selected tab.

        // Smoothly animates the background properties on tab change.
        const animateOptions: ValueAnimationTransition = {
            duration: 2, // Transition duration.
            ease: "easeInOut", // Smooth easing.
        };
        animate(
            backgroundSizeX,
            [backgroundSizeX.get(), 100, tabs[index].backgroundSizeX],
            animateOptions
        );
        animate(
            backgroundPositionX,
            [backgroundPositionX.get(), tabs[index].backgroundPositionX],
            animateOptions
        );
        animate(
            backgroundPositionY,
            [backgroundPositionY.get(), tabs[index].backgroundPositionY],
            animateOptions
        );
    };

    return (
        <>
            <section className={"py-20 md:py-24"}>
                <div className={"container"}>
                    <h2 className={"text-5xl md:text-6xl font-medium text-center tracking-tighter"}>
                        Elevate your SEO efforts.
                    </h2>
                    <p className={"text-white/70 text-lg md:text-xl max-w-2xl mx-auto text-center tracking-tight mt-5"}>
                        From small startups to large enterprises, our AI-driven tool has
                        revolutionized the way businesses approach SEO.
                    </p>

                    {/* Tabs for feature selection */}
                    <div className={"mt-10 grid lg:grid-cols-3 gap-3"}>
                        {tabs.map((tab, index) => (
                            <FeatureTab
                                {...tab}
                                key={tab.title}
                                onClick={() => handleSelectTab(index)}
                                selected={selectedTab === index}
                            />
                        ))}
                    </div>
                    {/* Main product showcase */}
                    <motion.div className={"border border-muted rounded-xl p-2.5 mt-3"}>
                        <div
                            className={"aspect-video bg-cover border border-muted rounded-lg"}
                            style={{
                                backgroundPosition: backgroundPosition.get(),
                                backgroundSize: backgroundSize.get(),
                                backgroundImage: `url(${ProductImage.src})`, // Background product image.
                            }}
                        ></div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
