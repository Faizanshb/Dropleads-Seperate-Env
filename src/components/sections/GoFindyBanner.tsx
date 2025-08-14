/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import type React from "react";

import { useEffect, useRef } from "react";

export default function GofindyBrandBanner() {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const currentTextRef = textRef.current;
    if (!currentTextRef) return;

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { offsetWidth, offsetHeight, offsetLeft, offsetTop } =
        currentTextRef;

      const x = clientX - offsetLeft - offsetWidth / 2;
      const y = clientY - offsetTop - offsetHeight / 2;

      const rotateX = (y / offsetHeight) * -15; // Max rotation 15deg
      const rotateY = (x / offsetWidth) * 15; // Max rotation 15deg

      currentTextRef.style.setProperty("--rotate-x", `${rotateX}deg`);
      currentTextRef.style.setProperty("--rotate-y", `${rotateY}deg`);

      // Update gradient for lighting effect based on mouse position
      const lightX = ((clientX - offsetLeft) / offsetWidth) * 100;
      const lightY = ((clientY - offsetTop) / offsetHeight) * 100;
      currentTextRef.style.setProperty("--light-x", `${lightX}%`);
      currentTextRef.style.setProperty("--light-y", `${lightY}%`);
    };

    const handleMouseLeave = () => {
      currentTextRef.style.setProperty("--rotate-x", `0deg`);
      currentTextRef.style.setProperty("--rotate-y", `0deg`);
      currentTextRef.style.setProperty("--light-x", `50%`); // Reset light to center
      currentTextRef.style.setProperty("--light-y", `0%`); // Reset light to top
    };

    // Add event listener to the parent container or window for a wider effect range
    const parentElement = currentTextRef.parentElement;
    if (parentElement) {
      parentElement.addEventListener("mousemove", handleMouseMove);
      parentElement.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        parentElement.removeEventListener("mousemove", handleMouseMove);
        parentElement.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <section className="bg-[#01519F] py-20 md:py-32 overflow-hidden relative">
      <div className="container mx-auto px-4 relative">
        <div
          className="flex justify-center items-center"
          style={{ perspective: "1000px" }}
        >
          <h2
            ref={textRef}
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[180px] xl:text-[220px] font-extrabold tracking-tighter text-transparent transition-transform duration-100 ease-out"
            style={
              {
                transform:
                  "rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                backgroundImage: `
              radial-gradient(circle at var(--light-x, 50%) var(--light-y, 0%), rgba(255,255,255,0.6), transparent 30%),
              linear-gradient(170deg, 
                rgba(255,255,255,0.15) 0%, 
                rgba(66,133,244,0.3) 20%, 
                rgba(66,133,244,0.7) 45%, 
                rgba(66,133,244,0.6) 55%, 
                rgba(1,81,159,0.8) 70%, /* Darker shade of brand blue */
                rgba(66,133,244,0.4) 90%, 
                rgba(255,255,255,0.1) 100%
              )
            `,
                textShadow: `
              0 1px 0px rgba(66,133,244,0.3), /* Subtle brand color outline */
              0px 2px 3px rgba(0,0,0,0.3),
              0px 5px 5px rgba(0,0,0,0.2),
              0px 10px 10px rgba(0,0,0,0.15),
              0px 15px 20px rgba(0,0,0,0.1)
            `,
                position: "relative",
                zIndex: 1,
                // Custom properties for JS interaction
                "--rotate-x": "0deg",
                "--rotate-y": "0deg",
                "--light-x": "50%",
                "--light-y": "0%",
              } as React.CSSProperties
            }
          >
            Dropleads
          </h2>
        </div>
      </div>
      {/* Subtle decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
    </section>
  );
}


