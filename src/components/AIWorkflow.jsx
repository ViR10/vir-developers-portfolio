import React, { useState, useEffect } from "react";

const WORKFLOW_STEPS = [
  {
    id: 1,
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Ideation",
    description: "Understand your business needs and identify AI opportunities for automation and optimization.",
    details: [
      "Requirement analysis",
      "Use case identification",
      "Feasibility assessment",
      "Technology selection"
    ]
  },
  {
    id: 2,
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    title: "Planning",
    description: "Design a comprehensive AI strategy with clear timelines, milestones, and deliverables.",
    details: [
      "Project roadmap",
      "Resource allocation",
      "Timeline planning",
      "Risk assessment"
    ]
  },
  {
    id: 3,
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: "Development",
    description: "Build and train AI models tailored to your specific requirements using cutting-edge technologies.",
    details: [
      "Model development",
      "Data preparation",
      "Training & validation",
      "Integration setup"
    ]
  },
  {
    id: 4,
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Testing",
    description: "Rigorous testing to ensure accuracy, performance, and reliability of AI solutions.",
    details: [
      "Quality assurance",
      "Performance testing",
      "User acceptance",
      "Bug fixes"
    ]
  },
  {
    id: 5,
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: "Deployment",
    description: "Launch your AI solution into production with seamless integration and monitoring.",
    details: [
      "Production deployment",
      "System integration",
      "Performance monitoring",
      "Documentation"
    ]
  },
  {
    id: 6,
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: "Optimization",
    description: "Continuous improvement and refinement based on real-world performance and feedback.",
    details: [
      "Performance analysis",
      "Model refinement",
      "Ongoing support",
      "Feature updates"
    ]
  }
];

const AI_CAPABILITIES = [
  {
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    title: "Chatbots & Assistants",
    description: "Intelligent conversational AI for customer support and engagement"
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Workflow Automation",
    description: "Automate repetitive tasks and streamline business processes"
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Data Analytics",
    description: "Extract insights from data using machine learning algorithms"
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
    title: "Natural Language Processing",
    description: "Understand and generate human language for various applications"
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: "Computer Vision",
    description: "Image and video analysis for recognition and classification"
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Predictive Analytics",
    description: "Forecast trends and outcomes using advanced AI models"
  }
];

export default function AIWorkflow() {
  const [activeStep, setActiveStep] = useState(null);
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
              AI Integration Process
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fade-slide-up animation-delay-200">
            <span className="bg-gradient-to-r from-cyan-400 via-orange-400 to-cyan-400 text-transparent bg-clip-text animate-gradient-flow bg-[length:200%_auto]">
              Our AI Workflow
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto opacity-0 animate-fade-in animation-delay-400">
            A systematic approach to integrate AI into your business operations, from ideation to continuous optimization.
          </p>
        </div>
      </section>

      {/* Workflow Steps */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WORKFLOW_STEPS.map((step, index) => (
              <WorkflowCard 
                key={step.id} 
                step={step} 
                index={index}
                isActive={activeStep === step.id}
                onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                isVisible={visibleCards.includes(`step-${step.id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* AI Capabilities */}
      <section className="py-20 px-6 bg-gradient-to-b from-black via-slate-900 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-orange-400 text-transparent bg-clip-text">
                AI Capabilities We Offer
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Leverage cutting-edge AI technologies to transform your business operations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {AI_CAPABILITIES.map((capability, idx) => (
              <CapabilityCard 
                key={idx} 
                {...capability} 
                index={idx}
                isVisible={visibleCards.includes(`capability-${idx}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Technologies We Use
            </h2>
            <p className="text-gray-300 text-lg">
              Powered by the latest AI models and frameworks
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "OpenAI GPT-4", icon: (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              )},
              { name: "Claude AI", icon: (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )},
              { name: "Google Gemini", icon: (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              )},
              { name: "TensorFlow", icon: (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              )},
              { name: "PyTorch", icon: (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              )},
              { name: "Hugging Face", icon: (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )},
              { name: "LangChain", icon: (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              )},
              { name: "Pinecone", icon: (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              )}
            ].map((tech, idx) => (
              <TechBadge key={idx} name={tech.name} icon={tech.icon} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Integrate{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">
              AI Solutions?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Let's discuss how AI can transform your business operations and drive growth.
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
              href="/services"
              className="px-10 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 font-bold text-lg rounded-full hover:bg-cyan-400 hover:text-black transition-all duration-300"
            >
              View Services
            </a>
          </div>
        </div>
      </section>

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

// Workflow Card Component
function WorkflowCard({ step, index, isActive, onClick, isVisible }) {
  return (
    <div
      data-id={`step-${step.id}`}
      className={`bg-slate-900/50 border border-slate-700 rounded-2xl p-8 cursor-pointer transition-all duration-500 hover:border-cyan-400 hover:shadow-2xl ${
        isActive ? 'border-cyan-400 shadow-2xl shadow-cyan-500/20' : ''
      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onClick={onClick}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-orange-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
          {step.icon}
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold text-orange-400 mb-1">Step {step.id}</div>
          <h3 className="text-2xl font-bold text-white">{step.title}</h3>
        </div>
      </div>
      
      <p className="text-gray-400 mb-4">{step.description}</p>
      
      {isActive && (
        <ul className="space-y-2 animate-fade-in">
          {step.details.map((detail, idx) => (
            <li key={idx} className="flex items-center text-gray-300 text-sm">
              <svg className="w-4 h-4 text-cyan-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {detail}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Capability Card Component
function CapabilityCard({ icon, title, description, index, isVisible }) {
  return (
    <div
      data-id={`capability-${index}`}
      className={`bg-slate-900/50 border border-slate-700 rounded-2xl p-8 text-center group hover:border-orange-400 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="text-orange-400 mb-4 inline-block transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

// Tech Badge Component
function TechBadge({ name, icon, index }) {
  const isEven = index % 2 === 0;
  return (
    <div className={`bg-slate-900/50 border border-slate-700 rounded-xl p-6 text-center hover:border-${isEven ? 'cyan' : 'orange'}-400 hover:scale-110 transition-all duration-300 group`}>
      <div className={`${isEven ? 'text-cyan-400' : 'text-orange-400'} mb-3 inline-block transition-transform group-hover:scale-125`}>
        {icon}
      </div>
      <div className="text-white font-semibold text-sm">{name}</div>
    </div>
  );
}
