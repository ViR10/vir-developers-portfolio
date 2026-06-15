import React, { useState, useEffect } from "react";

const SERVICES = [
  {
    id: 1,
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    title: "Custom AI Chatbots",
    shortDesc: "RAG-based support agents trained on your custom business data",
    description: "Build conversational AI chatbots that understand your custom knowledge base, documentation, and APIs. We leverage advanced Retrieval-Augmented Generation (RAG) and LLMs to provide context-aware, 24/7 client support and lead generation.",
    features: [
      "RAG (Retrieval-Augmented Generation)",
      "Custom Knowledge Base Integration",
      "Multi-Platform (Web, WhatsApp, Telegram, Discord)",
      "Conversation Analytics & Feedback Loops",
      "Seamless Human Handoff Triggers"
    ],
    color: "cyan"
  },
  {
    id: 2,
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    title: "AI Voice Agents",
    shortDesc: "Intelligent conversational phone agents for booking and sales calls",
    description: "Develop conversational phone agents capable of handling inbound support and outbound scheduling. Highly responsive, natural-sounding voice systems that integrate directly with your CRM and scheduling tools to automate bookings.",
    features: [
      "Inbound & Outbound Calling Bots",
      "Real-time CRM Data Integration",
      "Custom Voice Clones & Emotion Controls",
      "Appointment Scheduling & Booking Automation",
      "Call Transcription & Sentiment Analysis"
    ],
    color: "orange"
  },
  {
    id: 3,
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a2 2 0 002 2h3a1 1 0 011 1v3a2 2 0 002 2 2 2 0 110 4 2 2 0 00-2 2v3a1 1 0 01-1 1h-3a2 2 0 00-2 2v1a2 2 0 11-4 0v-1a2 2 0 00-2-2H8a1 1 0 01-1-1v-3a2 2 0 00-2-2 2 2 0 110-4 2 2 0 002-2V8a1 1 0 011-1h3a2 2 0 002-2V4z" />
      </svg>
    ),
    title: "Workflow Automation",
    shortDesc: "Connecting CRMs, tools, and processes via Make & Zapier",
    description: "Connect your enterprise applications and automate repetitive daily work. We design smart, AI-enhanced pipelines using Make.com, Zapier, and custom integrations to eliminate manual data entry and human error.",
    features: [
      "Make.com & Zapier Integration",
      "Automated Lead Sorting & Nurturing",
      "AI-Driven Document Extraction",
      "E-commerce & CRM Syncing",
      "Custom Webhook & API Solutions"
    ],
    color: "cyan"
  },
  {
    id: 4,
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "AI SaaS Development",
    shortDesc: "Custom web applications powered by generative AI models",
    description: "Design and build state-of-the-art AI-powered software solutions. From generative writing tools to image processors, we handle everything from frontend UI/UX to serverless backend architectures and custom fine-tuning.",
    features: [
      "LLM API Integration (OpenAI, Claude, Gemini)",
      "Custom Vector Database Setup",
      "Scalable Serverless Infrastructure",
      "Stripe Subscriptions & SaaS Authentication",
      "Premium, Responsive UI/UX Design"
    ],
    color: "orange"
  },
  {
    id: 5,
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Predictive Analytics",
    shortDesc: "Forecasting business trends and data-driven insights",
    description: "Harness the power of machine learning algorithms to predict customer churn, sales trends, and inventory requirements. Translate raw enterprise data into actionable visual dashboards and intelligent decisions.",
    features: [
      "Machine Learning Forecasting Models",
      "Customer Churn & LTV Analysis",
      "Interactive Data Visualization",
      "Database & Data Lake Integrations",
      "Automated Business Intelligence Reporting"
    ],
    color: "cyan"
  },
  {
    id: 6,
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    title: "AI Consultation & Audits",
    shortDesc: "Discovering automation bottlenecks and planning roadmaps",
    description: "Let us review your current company operations and identify the highest ROI opportunities for AI automation. We provide a step-by-step implementation blueprint to scale your operations and cut overhead costs.",
    features: [
      "Operational Bottleneck Analysis",
      "ROI & Feasibility Assessments",
      "Custom Automation Blueprints",
      "AI Tool Stack Recommendations",
      "Team Training & Onboarding Guidelines"
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
              Enterprise AI Solutions
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fade-slide-up animation-delay-200">
            <span className="bg-gradient-to-r from-cyan-400 via-orange-400 to-cyan-400 text-transparent bg-clip-text animate-gradient-flow bg-[length:200%_auto]">
              AI Solutions
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto opacity-0 animate-fade-in animation-delay-400">
            Transforming business operations with state-of-the-art AI systems, automated workflows, and custom LLMs.
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ), 
                title: "Tangible Business ROI", 
                desc: "We focus on saving operational hours and cutting overheads via automation" 
              },
              { 
                icon: (
                  <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ), 
                title: "Cutting-Edge Models", 
                desc: "Integration with GPT-4o, Claude 3.5 Sonnet, and Gemini 1.5 Pro" 
              },
              { 
                icon: (
                  <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                ), 
                title: "Seamless API Syncing", 
                desc: "Connecting CRMs, databases, and third-party tools into single flows" 
              },
              { 
                icon: (
                  <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ), 
                title: "Client-Focused Results", 
                desc: "Tailored integrations built for your specific team workflow" 
              },
              { 
                icon: (
                  <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ), 
                title: "Secure & Compliant", 
                desc: "Industry-standard data handling and privacy protocols" 
              },
              { 
                icon: (
                  <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ), 
                title: "Scalable Infrastructure", 
                desc: "AI pipelines that adapt as your database and team size expand" 
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
            Ready to Automate Your{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">
              Business?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Book your free 30-minute AI Audit today and identify automation bottlenecks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="group px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-full hover:shadow-2xl hover:shadow-orange-500/40 hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              Book Free AI Audit
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
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
            Book Free AI Audit
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
