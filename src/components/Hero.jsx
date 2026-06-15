import React, { useState, useEffect } from "react";
import NightSkyCanvas from "./NightSkyCanvas";

const TYPED_TEXTS = [
  "Enterprise AI Solutions",
  "Custom AI Chatbots",
  "Workflow Automation",
  "AI Voice Agents"
];

export default function Hero() {
  console.log('Hero component rendered')
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = TYPED_TEXTS[textIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % TYPED_TEXTS.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedText(currentText.slice(0, charIndex));
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);



  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Night Sky Background */}
      <div className="absolute inset-0">
        <NightSkyCanvas />
      </div>


      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-6 md:space-y-10">

          {/* Main Heading */}
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              <span className="inline-block bg-gradient-to-r from-cyan-400 to-cyan-500 text-transparent bg-clip-text">
                ViR{" "}
              </span>
              <span className="inline-block bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 text-transparent bg-clip-text">
                Developers
              </span>
            </h1>

            {/* Typing Animation */}
            <div className="min-h-[50px] md:min-h-[60px] flex items-center justify-center px-2">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-light tracking-wide">
                {displayedText}
                <span className="inline-block w-0.5 h-5 sm:h-6 md:h-7 lg:h-9 bg-orange-500 ml-1 md:ml-2 animate-pulse"></span>
              </h2>
            </div>
          </div>

          {/* Description */}
          <p className="max-w-3xl mx-auto text-base md:text-lg text-gray-100 leading-relaxed px-4">
            Transforming businesses with custom LLMs, RAG-based AI chatbots, conversational voice agents, and intelligent workflow automation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center pt-6">
            <a
              href="/contact"
              className="px-8 sm:px-10 py-3 sm:py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 font-bold text-sm sm:text-base rounded-full hover:bg-cyan-400 hover:text-black shadow-xl hover:shadow-cyan-400/50 transition-all duration-300"
            >
              Book a Free AI Audit
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-orange-500 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 md:h-3 bg-orange-500 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
