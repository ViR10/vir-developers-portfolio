import React, { useState, useEffect } from "react";

const SERVICES = [
  {
    id: 1,
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Web Development",
    shortDesc: "Full-stack web applications with modern technologies",
    description: "Custom web applications built with React, Next.js, and Node.js. From concept to deployment, we deliver scalable, performant solutions tailored to your business needs.",
    features: [
      "React & Next.js Development",
      "RESTful API Design",
      "Database Architecture",
      "Responsive UI/UX",
      "Performance Optimization"
    ],
    color: "cyan"
  },
  {
    id: 2,
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "AI Integration",
    shortDesc: "Intelligent automation and AI-powered features",
    description: "Integrate cutting-edge AI models into your applications. Leverage GPT-4, Claude, and Gemini for intelligent automation and enhanced user experiences.",
    features: [
      "AI Chatbot Development",
      "Workflow Automation",
      "Natural Language Processing",
      "ML Model Integration",
      "Intelligent Data Analysis"
    ],
    color: "orange"
  },
  {
    id: 3,
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: "UI/UX Design",
    shortDesc: "Beautiful, intuitive interfaces that users love",
    description: "Modern, user-centered design that combines aesthetics with functionality. Wireframes, prototypes, and pixel-perfect implementations that delight users.",
    features: [
      "User Research & Testing",
      "Wireframing & Prototyping",
      "Responsive Design",
      "Design Systems",
      "Brand Identity"
    ],
    color: "cyan"
  },
  {
    id: 4,
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Performance Optimization",
    shortDesc: "Lightning-fast applications that scale",
    description: "Optimize your application for speed, efficiency, and scalability. Code splitting, caching strategies, and performance monitoring for the best user experience.",
    features: [
      "Code Optimization",
      "Load Time Reduction",
      "SEO Enhancement",
      "Caching Strategies",
      "Performance Monitoring"
    ],
    color: "orange"
  },
  {
    id: 5,
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    title: "Custom Tools Development",
    shortDesc: "Specialized tools for productivity and automation",
    description: "Build custom tools tailored to your specific needs. From calculators to generators, we create efficient utilities that streamline your workflows.",
    features: [
      "Web-based Utilities",
      "Automation Scripts",
      "Data Converters",
      "Calculator Tools",
      "Custom Generators"
    ],
    color: "cyan"
  },
  {
    id: 6,
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
    title: "Educational Systems",
    shortDesc: "Management systems for educational institutions",
    description: "Complete educational management solutions including attendance tracking, grade management, and student information systems for modern institutions.",
    features: [
      "Attendance Management",
      "Grade Calculators",
      "Student Portals",
      "Teacher Dashboards",
      "Report Generation"
    ],
    color: "orange"
  }
];

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            setVisibleCards((prev) => [...new Set([...prev, id])]);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('[data-id]').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black pt-24 overflow-hidden">
      
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-black">
        <div className="max-w-6xl mx-auto text-center">
          <div className="opacity-0 animate-fade-slide-down">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-orange-500/20 border border-cyan-400 rounded-full text-cyan-400 text-sm font-semibold mb-6">
              What We Offer
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fade-slide-up animation-delay-200">
            <span className="bg-gradient-to-r from-cyan-400 via-orange-400 to-cyan-400 text-transparent bg-clip-text animate-gradient-flow bg-[length:200%_auto]">
              Our Services
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto opacity-0 animate-fade-in animation-delay-400">
            Comprehensive web development solutions powered by modern technologies and AI innovation.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                index={index}
                isVisible={visibleCards.includes(`service-${service.id}`)}
                onClick={() => setSelectedService(service)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-gradient-to-b from-black via-slate-900 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-orange-400 text-transparent bg-clip-text">
                Why Choose ViR Developers
              </span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: (
                  <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ), 
                title: "Fast Delivery", 
                desc: "Quick turnaround without compromising quality" 
              },
              { 
                icon: (
                  <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ), 
                title: "Premium Quality", 
                desc: "Clean code, best practices, and attention to detail" 
              },
              { 
                icon: (
                  <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                ), 
                title: "Dedicated Support", 
                desc: "Ongoing support and maintenance after launch" 
              },
              { 
                icon: (
                  <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ), 
                title: "Client-Focused", 
                desc: "Your success is our priority" 
              },
              { 
                icon: (
                  <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ), 
                title: "Secure & Reliable", 
                desc: "Industry-standard security practices" 
              },
              { 
                icon: (
                  <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ), 
                title: "Scalable Solutions", 
                desc: "Built to grow with your business" 
              }
            ].map((feature, idx) => (
              <FeatureCard 
                key={idx} 
                {...feature} 
                index={idx}
                isVisible={visibleCards.includes(`feature-${idx}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">
              Project?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Let's discuss your requirements and build something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="group px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-full hover:shadow-2xl hover:shadow-orange-500/40 hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              Get Started
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="/projects"
              className="px-10 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 font-bold text-lg rounded-full hover:bg-cyan-400 hover:text-black transition-all duration-300"
            >
              View Projects
            </a>
          </div>
        </div>
      </section>

      {/* Service Modal */}
      {selectedService && (
        <ServiceModal 
          service={selectedService} 
          onClose={() => setSelectedService(null)} 
        />
      )}

      <style jsx>{`
        @keyframes fadeSlideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes gradientFlow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fade-slide-down {
          animation: fadeSlideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-fade-slide-up {
          animation: fadeSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-gradient-flow {
          animation: gradientFlow 4s ease infinite;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}

// Service Card Component
function ServiceCard({ service, index, isVisible, onClick }) {
  const borderColor = service.color === "cyan" ? "hover:border-cyan-400" : "hover:border-orange-500";
  const iconBg = service.color === "cyan" ? "bg-cyan-500/20" : "bg-orange-500/20";
  const iconColor = service.color === "cyan" ? "text-cyan-400" : "text-orange-400";
  const textColor = service.color === "cyan" ? "text-cyan-400" : "text-orange-400";

  return (
    <div
      data-id={`service-${service.id}`}
      className={`group bg-slate-900/50 border border-slate-700 rounded-2xl p-8 ${borderColor} cursor-pointer transition-all duration-500 hover:shadow-2xl ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onClick={onClick}
    >
      <div className={`w-20 h-20 ${iconBg} rounded-2xl flex items-center justify-center ${iconColor} mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
        {service.icon}
      </div>
      
      <h3 className={`text-2xl font-bold text-white mb-3 transition-colors duration-300 group-hover:${textColor}`}>
        {service.title}
      </h3>
      
      <p className="text-gray-400 mb-6 leading-relaxed text-sm">
        {service.shortDesc}
      </p>
      
      <div className={`flex items-center ${textColor} font-semibold text-sm group-hover:gap-2 transition-all duration-300`}>
        Learn More
        <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ icon, title, desc, index, isVisible }) {
  return (
    <div
      data-id={`feature-${index}`}
      className={`bg-slate-900/50 border border-slate-700 rounded-2xl p-8 text-center group hover:border-cyan-400 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="text-cyan-400 mb-4 inline-block transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

// Service Modal Component
function ServiceModal({ service, onClose }) {
  const dotColor = service.color === 'cyan' ? 'bg-cyan-400' : 'bg-orange-500';
  const gradientColor = service.color === 'cyan' ? 'from-cyan-500 to-cyan-600' : 'from-orange-500 to-orange-600';
  const iconBg = service.color === 'cyan' ? 'bg-cyan-500/20' : 'bg-orange-500/20';
  const iconColor = service.color === 'cyan' ? 'text-cyan-400' : 'text-orange-400';
  
  return (
    <div 
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-fade-in" 
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto shadow-2xl"
        style={{ animation: 'scaleIn 0.3s ease-out' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-20 h-20 ${iconBg} rounded-2xl flex items-center justify-center ${iconColor}`}>
              {service.icon}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">{service.title}</h2>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white text-3xl font-bold transition-all duration-300 hover:rotate-90"
          >
            ×
          </button>
        </div>
        
        <p className="text-gray-300 mb-6 leading-relaxed text-lg">{service.description}</p>
        
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          What's Included:
        </h3>
        <ul className="space-y-3 mb-8">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-start text-gray-300">
              <span className={`w-2 h-2 ${dotColor} rounded-full mr-3 mt-2 flex-shrink-0`}></span>
              {feature}
            </li>
          ))}
        </ul>
        
        <div className="flex gap-4">
          <a
            href="/contact"
            className={`flex-1 px-6 py-4 bg-gradient-to-r ${gradientColor} text-white font-bold text-lg rounded-full text-center hover:scale-105 transition-all duration-300 shadow-xl`}
          >
            Get Started
          </a>
          <button
            onClick={onClose}
            className="px-8 py-4 bg-slate-800 text-white font-semibold rounded-full hover:bg-slate-700 transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
