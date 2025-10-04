import React, { useState, useEffect } from "react";
import NightSkyCanvas from "./NightSkyCanvas";

const TYPED_TEXTS = [
  "Web Development Excellence",
  "AI-Powered Solutions",
  "Full-Stack Innovation"
];

export default function Hero() {
  console.log('Hero component rendered')
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

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

  // Show notification after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Auto-hide notification after 10 seconds
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Night Sky Background */}
      <div className="absolute inset-0">
        <NightSkyCanvas />
      </div>

      {/* Toast Notification - Bottom Right */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${
        showNotification ? 'translate-x-0 opacity-100' : 'translate-x-[500px] opacity-0'
      }`}>
        <div className="bg-slate-900/95 backdrop-blur-md border border-purple-500/50 rounded-2xl shadow-2xl shadow-purple-500/20 max-w-sm overflow-hidden">
          {/* Close Button */}
          <button
            onClick={() => setShowNotification(false)}
            className="absolute top-3 right-3 w-7 h-7 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300 z-10"
            aria-label="Close notification"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="p-5 pr-10">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-bold text-base mb-1">
                  Students Get Perplexity Pro Free! 🎓
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  1 month free access to GPT-5, Grok-4, Gemini 2.5 Pro & Claude Sonnet 4.5
                </p>
              </div>
            </div>

            <a
              href="https://plex.it/referrals/GT0SYID9"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold text-sm text-center rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300"
            >
              Claim Free Month →
            </a>
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-[10000ms] ease-linear"
              style={{ width: showNotification ? '0%' : '100%' }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <div className="text-center space-y-10">
          
          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              <span className="inline-block bg-gradient-to-r from-cyan-400 to-cyan-500 text-transparent bg-clip-text">
                ViR{" "}
              </span>
              <span className="inline-block bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 text-transparent bg-clip-text">
                Developers
              </span>
            </h1>
            
            {/* Typing Animation */}
            <div className="min-h-[60px] flex items-center justify-center">
              <h2 className="text-xl md:text-2xl lg:text-3xl text-white font-light tracking-wide">
                {displayedText}
                <span className="inline-block w-0.5 h-7 md:h-9 bg-orange-500 ml-2 animate-pulse"></span>
              </h2>
            </div>
          </div>

          {/* Description */}
          <p className="max-w-3xl mx-auto text-base md:text-lg text-gray-100 leading-relaxed px-4">
            Crafting exceptional digital experiences with{" "}
            <span className="text-cyan-400 font-semibold">React, Next.js, Node.js</span>
            {" "}and{" "}
            <span className="text-orange-400 font-semibold">cutting-edge AI</span>. 
            Transforming ideas into scalable, high-performance web applications.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center pt-6">
            <a
              href="/projects"
              className="px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-base rounded-full shadow-2xl hover:shadow-orange-500/50 hover:scale-105 transform transition-all duration-300"
            >
              View Projects
            </a>
            <a
              href="/contact"
              className="px-10 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 font-bold text-base rounded-full hover:bg-cyan-400 hover:text-black shadow-xl hover:shadow-cyan-400/50 transition-all duration-300"
            >
              Let's Talk
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-orange-500 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-orange-500 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
