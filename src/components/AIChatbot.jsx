import React, { useState, useEffect, useRef } from "react";

// Expanded Knowledge Base containing 50+ detailed Q&As covering all aspects of the agency
const KNOWLEDGE_BASE = [
  // === CATEGORY 1: COMPANY & BRAND ===
  {
    keywords: ["who are you", "what is this", "what is vir developers", "introduce your company"],
    question: "What is ViR Developers?",
    response: "ViR Developers is a premium Enterprise AI Automation Agency. We build custom artificial intelligence solutions—including RAG-based chatbots, natural-sounding voice agents, automated workflows, and custom AI SaaS applications—to scale operations and maximize ROI for global businesses."
  },
  {
    keywords: ["where are you", "location", "located", "country", "office", "pakistan"],
    question: "Where is ViR Developers located?",
    response: "ViR Developers is headquartered in Pakistan, serving an elite global clientele remotely. Our infrastructure and communication pipelines are optimized for seamless international collaboration across all major time zones."
  },
  {
    keywords: ["why choose you", "benefits", "advantage", "why hire"],
    question: "Why should I choose ViR Developers?",
    response: "Unlike generalist agencies, we focus strictly on business metrics and concrete ROI. We combine high-end software development with state-of-the-art AI systems to cut operational overheads, automate routine work, and build scalable systems designed to grow with your business."
  },

  // === CATEGORY 2: CEO & FOUNDER (ADEEL SHAHID) ===
  {
    keywords: ["ceo", "founder", "adeel", "shahid", "who is adeel", "who is the owner"],
    question: "Who is the CEO of ViR Developers?",
    response: "Adeel Shahid is the Founder, CEO, and Lead AI Solutions Architect at ViR Developers. He is a visionary technologist specializing in custom LLMs, RAG frameworks, conversational voice systems, and enterprise automation pipelines. He personally oversees every project architecture."
  },
  {
    keywords: ["talk to adeel", "contact ceo", "schedule with ceo", "speak to adeel"],
    question: "Can I speak directly with CEO Adeel Shahid?",
    response: "Yes! Adeel Shahid conducts consultations for enterprise integrations. You can book an executive consultation by asking for an 'Audit' in this chat, or by submitting a request on our Contact page."
  },

  // === CATEGORY 3: CUSTOM AI CHATBOTS & RAG ===
  {
    keywords: ["chatbot", "chat bots", "custom bots", "customer support bot", "web bot"],
    question: "What are your Custom AI Chatbots?",
    response: "Our Custom AI Chatbots are conversational agents designed specifically for your brand. They operate 24/7 on your website, handling customer service, answering detailed inquiries, pre-qualifying leads, and integrating directly with your CRMs."
  },
  {
    keywords: ["what is rag", "retrieval augmented generation", "vector search"],
    question: "What is RAG (Retrieval-Augmented Generation)?",
    response: "RAG is a technique that connects LLMs to your private data. Instead of hallucinating, the chatbot searches a secure database containing your company's documents, spreadsheets, policies, and files to retrieve accurate, context-rich answers."
  },
  {
    keywords: ["whatsapp bot", "whatsapp integration", "whatsapp chat"],
    question: "Can you build a chatbot for WhatsApp?",
    response: "Absolutely. We build and deploy custom AI agents directly onto WhatsApp Business API, allowing you to automate customer interactions, send order notifications, and capture leads inside the world's most popular messaging app."
  },
  {
    keywords: ["telegram bot", "discord bot", "slack bot"],
    question: "Do you support Telegram, Discord, or Slack?",
    response: "Yes, we build custom bots for Telegram, Discord, and Slack. Whether for internal team operations, customer support channels, or community management, our bots connect seamlessly to your chosen platform."
  },
  {
    keywords: ["knowledge base", "private data", "train on my data", "upload documents"],
    question: "How does the chatbot learn my business information?",
    response: "We structure your documents, PDFs, FAQs, websites, and database tables into a vector database. The chatbot references this secure knowledge base instantly during conversations to answer questions with precision."
  },
  {
    keywords: ["hallucination", "make mistakes", "wrong information"],
    question: "How do you prevent the chatbot from making up answers?",
    response: "We implement strict prompt engineering, system constraints, and temperature controls. If the chatbot cannot find the answer within your provided knowledge base, it is programmed to politely decline and offer to escalate to a human representative."
  },
  {
    keywords: ["human handoff", "live agent", "transfer to human"],
    question: "Does the chatbot support transferring to a live human agent?",
    response: "Yes. We configure triggers that detect complex questions or high-value leads. The system can immediately notify your support team via email, Slack, or CRM, transferring the conversation chat log to a human agent seamlessly."
  },

  // === CATEGORY 4: AI VOICE AGENTS ===
  {
    keywords: ["voice agent", "phone agent", "calling bot", "ai voice", "voice call"],
    question: "What are AI Voice Agents?",
    response: "AI Voice Agents are conversational phone bots powered by advanced text-to-speech and LLM engines. They sound completely human, understand intent, answer questions instantly, and can handle inbound customer support or outbound lead follow-ups."
  },
  {
    keywords: ["outbound call", "cold call", "telemarketing", "sales call"],
    question: "Can voice agents make outbound calls?",
    response: "Yes, they can make automated outbound calls for appointment reminders, lead nurturing, cold outreach follow-ups, and survey collection, immediately updating your CRM based on the call outcome."
  },
  {
    keywords: ["inbound call", "customer support call", "ivr replacement"],
    question: "Can voice agents handle inbound support calls?",
    response: "Yes. They act as a modern replacement for frustrating IVR menu systems. Clients speak naturally, and the voice agent answers questions, troubleshoots issues, or routes the call to the appropriate team member."
  },
  {
    keywords: ["vapi", "elevenlabs", "twilio", "voice stack"],
    question: "What technologies do you use for AI Voice Agents?",
    response: "We utilize industry-leading telephony and voice synthesizers, primarily Twilio, Vapi.ai, and ElevenLabs. This stack ensures ultra-low latency, crystal-clear audio quality, and natural human-like speech patterns."
  },
  {
    keywords: ["book appointment", "calendar sync", "schedule voice"],
    question: "Can an AI voice agent schedule appointments directly?",
    response: "Yes. We integrate our voice agents with scheduling platforms like Cal.com, Calendly, or custom CRM calendars. The bot can check availability in real-time, offer slots to the caller, and book the meeting during the call."
  },

  // === CATEGORY 5: WORKFLOW AUTOMATION ===
  {
    keywords: ["workflow automation", "automation", "automate tasks", "make.com", "zapier"],
    question: "What is Workflow Automation?",
    response: "Workflow Automation connects your software systems (such as CRMs, email servers, Slack, and cloud storage) to automate repetitive business tasks. We design these paths using Make.com, Zapier, and custom Node.js/Python scripts."
  },
  {
    keywords: ["make vs zapier", "which tool", "n8n"],
    question: "Do you use Make.com or Zapier?",
    response: "We use both, depending on your needs. Zapier is excellent for quick, standard integrations. Make.com is our preferred platform for complex, multi-route workflows with advanced logical branching. We also build custom code scripts for specialized requirements."
  },
  {
    keywords: ["what can I automate", "automation examples", "manual task", "use case"],
    question: "What are some examples of workflows you can automate?",
    response: "Examples include: \n1. Automatically parsing incoming emails for invoice details and uploading them to Quickbooks.\n2. Instantly sending new web leads to your CRM, assigning a sales rep, and drafting a custom follow-up email.\n3. Syncing customer purchase history across Shopify, Stripe, and HubSpot automatically."
  },
  {
    keywords: ["crm integration", "hubspot", "salesforce", "gohighlevel"],
    question: "Can you connect my specific CRM?",
    response: "Yes. We integrate with all major CRMs—including HubSpot, Salesforce, GoHighLevel, Zoho, ActiveCampaign, and Pipedrive—to ensure lead and customer data flow seamlessly without manual entry."
  },

  // === CATEGORY 6: AI SAAS DEVELOPMENT ===
  {
    keywords: ["ai saas", "saas development", "custom web app", "generative app"],
    question: "What is AI SaaS Development?",
    response: "AI SaaS (Software as a Service) Development is the process of building proprietary, web-based applications powered by AI APIs (like GPT-4 or Claude). We build these apps from scratch, complete with user authentication, databases, and billing integrations."
  },
  {
    keywords: ["stripe", "payment gateway", "subscription", "billing"],
    question: "Do you integrate payment gateways like Stripe?",
    response: "Yes. We set up complete Stripe payment gateways for SaaS products, handling one-off payments, recurring monthly/annual subscription plans, coupon codes, and customer billing portals."
  },

  // === CATEGORY 7: PREDICTIVE ANALYTICS ===
  {
    keywords: ["predictive analytics", "machine learning forecast", "churn prediction"],
    question: "What is Predictive Analytics?",
    response: "Predictive Analytics uses historical data and machine learning models to forecast future trends. We build models to predict customer churn, identify sales opportunities, forecast inventory requirements, and display these metrics on custom dashboards."
  },

  // === CATEGORY 8: AI CONSULTATION & FREE AUDIT ===
  {
    keywords: ["free audit", "ai audit", "consultation", "what is audit", "audit overview"],
    question: "What is a Free AI Audit?",
    response: "Our Free AI Audit is a 30-minute consultation call where we analyze your company's current bottlenecks and manual tasks. We then provide a customized automation blueprint detailing exactly where AI can save you hours and reduce costs."
  },
  {
    keywords: ["is it free", "cost of audit", "free consult"],
    question: "Is the AI Audit really free?",
    response: "Yes, the initial 30-minute audit is 100% free with no obligation. It is designed to evaluate feasibility and present you with high-impact automation opportunities."
  },

  // === CATEGORY 9: PRICING & CUSTOM QUOTES ===
  {
    keywords: ["how much", "cost of", "prices", "rates", "pricing structure"],
    question: "What is your pricing structure?",
    response: "Our solutions are priced based on project scope:\n- **Workflow Automations**: Start at $800\n- **Custom AI Chatbots**: Start at $1,500\n- **AI Voice Agents**: Start at $2,500\n- **AI SaaS Development**: Custom Quote\n\nAll pricing is transparently scoped and agreed upon before work begins."
  },
  {
    keywords: ["monthly fee", "retainer", "recurring cost", "api cost"],
    question: "Are there any monthly recurring fees?",
    response: "ViR Developers does not charge hidden monthly fees. You pay for the development and implementation. You will pay the software vendors (e.g. OpenAI, Make.com, Twilio) directly for actual usage, which we optimize to be as low as possible. We also offer optional monthly support retainers for continuous system updates."
  },
  {
    keywords: ["discount", "cheap", "lower price"],
    question: "Do you offer any discounts?",
    response: "We price our services competitively based on the high level of technical architecting required. However, we offer custom package rates if you bundle multiple services (e.g., building a chatbot and automating your CRM workflows together)."
  },

  // === CATEGORY 10: TIMELINES & WORKFLOW ===
  {
    keywords: ["how long", "project timeline", "timeline", "turnaround time"],
    question: "How long does a project take to complete?",
    response: "Typical timelines are:\n- **Workflow Automation**: 1 - 2 weeks\n- **Custom AI Chatbots**: 2 - 4 weeks\n- **AI Voice Agents**: 3 - 5 weeks\n- **AI SaaS applications**: 6 - 12 weeks\n\nWe provide detailed milestone tracking throughout the process."
  },
  {
    keywords: ["onboarding", "how to start", "next steps", "getting started"],
    question: "What is the onboarding process?",
    response: "Our onboarding is straightforward:\n1. **Free AI Audit**: We discuss and plan the integration.\n2. **Proposal**: We send a detailed scope, timeline, and quote.\n3. **Kickoff**: Upon agreement, we gather system access and begin development.\n4. **Testing & Handoff**: We deploy, test, train your team, and launch."
  },
  {
    keywords: ["deliverables", "what do I get"],
    question: "What deliverables do I receive?",
    response: "You receive the fully deployed AI systems integrated with your tools, comprehensive video walkthroughs of how they work, the source code repository (if applicable), and 30 days of post-launch maintenance."
  },

  // === CATEGORY 11: SECURITY, PRIVACY & GDPR ===
  {
    keywords: ["security", "safe data", "privacy", "secure", "gdpr", "data privacy"],
    question: "How secure is my data?",
    response: "We prioritize security. We construct all AI systems using enterprise-grade API endpoints that guarantee your input data is not used to train public models. We implement SSL encryption, secure API key vaults, and adhere to industry standard data-privacy protocols."
  },
  {
    keywords: ["where data stored", "hosting", "database secure"],
    question: "Where is my data hosted and stored?",
    response: "We store data in secure, encrypted cloud databases (e.g., PostgreSQL, Pinecone, MongoDB) hosted on AWS or Google Cloud. We configure strict access control lists (ACLs) to ensure only authorized nodes can access client records."
  },

  // === CATEGORY 12: POST-LAUNCH & SUPPORT ===
  {
    keywords: ["support", "maintenance", "post launch", "bug", "broken", "retainer support"],
    question: "What support do you offer after launch?",
    response: "Every project includes 30 days of complimentary support to monitor performance, fix bugs, and ensure stability. After that, we offer monthly support retainers for ongoing optimizations, model upgrades, and new integrations."
  },
  {
    keywords: ["training", "how to use", "dashboard training"],
    question: "Do you train our team on how to use the systems?",
    response: "Yes. Upon project handoff, we provide detailed, recorded Loom video walkthroughs and a clean dashboard overview. If required, we also host live training calls with your operations team."
  },
  {
    keywords: ["updates", "change bot", "modify chatbot"],
    question: "Can I update the chatbot's knowledge base myself later?",
    response: "Yes. We construct our chatbots to pull information from easily manageable sources (like Google Docs or Notion). You can edit those files, and the chatbot will automatically update its knowledge base instantly."
  },

  // === CATEGORY 13: GENERAL TECH & INTEGRATIONS ===
  {
    keywords: ["llm choice", "which model", "openai vs claude"],
    question: "Which AI models do you use?",
    response: "We select the best model for the task. We work with OpenAI (GPT-4o), Anthropic (Claude 3.5 Sonnet), and Google (Gemini 1.5 Pro). For complex logic and coding, Claude is our go-to; for speed and general support, GPT-4o excels."
  },
  {
    keywords: ["vector database", "pinecone", "chroma", "weaviate"],
    question: "Which vector databases do you use?",
    response: "We primarily utilize Pinecone and Supabase pgvector due to their high query speeds, reliable scaling, and solid metadata filtering capabilities. This ensures instant, accurate retrieval for RAG setups."
  },

  // === CATEGORY 14: CONTACT & REACH ===
  {
    keywords: ["email address", "send email", "write email"],
    question: "What is your email address?",
    response: "You can reach our engineering and sales team at **virdevelopers10@gmail.com**."
  },
  {
    keywords: ["phone", "call you", "whatsapp number", "text"],
    question: "What is your WhatsApp / Phone number?",
    response: "Our official WhatsApp and phone contact number is **+92 323 5331206**."
  },
  {
    keywords: ["website search", "portfolio url"],
    question: "What is your website URL?",
    response: "Our agency portfolio is hosted at **https://virdevelopers.netlify.app/**."
  }
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello! 👋 I am the ViR Developers AI assistant. How can I help you automate your business or scale operations today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  // Lead capture state inside chat
  const [isLeadCapture, setIsLeadCapture] = useState(false);
  const [leadStep, setLeadStep] = useState(0); // 0: Name, 1: Email, 2: Phone, 3: Goals
  const [leadData, setLeadData] = useState({ name: "", email: "", phone: "", goals: "" });

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setShowNotification(false);
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: text,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputValue("");

    // Handle Lead Capture Conversation Flow
    if (isLeadCapture) {
      processLeadFlow(text);
      return;
    }

    // Standard Q&A matching
    setIsTyping(true);
    setTimeout(() => {
      const botResponse = generateBotResponse(text);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "bot",
          text: botResponse.text,
          timestamp: new Date()
        }
      ]);
      setIsTyping(false);

      if (botResponse.triggerLead) {
        setIsLeadCapture(true);
        setLeadStep(0);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: prev.length + 1,
              sender: "bot",
              text: "To request your free AI Audit or Quote, let's gather your contact details. What is your full name?",
              timestamp: new Date()
            }
          ]);
        }, 500);
      }
    }, 800);
  };

  const processLeadFlow = (userInput) => {
    let nextStepMessage = "";
    const updatedData = { ...leadData };

    if (leadStep === 0) {
      updatedData.name = userInput;
      setLeadData(updatedData);
      setLeadStep(1);
      nextStepMessage = `Thank you, ${userInput}! What is your email address?`;
    } else if (leadStep === 1) {
      updatedData.email = userInput;
      setLeadData(updatedData);
      setLeadStep(2);
      nextStepMessage = "Great. What is your phone number (including country code)?";
    } else if (leadStep === 2) {
      updatedData.phone = userInput;
      setLeadData(updatedData);
      setLeadStep(3);
      nextStepMessage = "Perfect. Briefly describe the tasks or tools you'd like to automate using AI.";
    } else if (leadStep === 3) {
      updatedData.goals = userInput;
      setLeadData(updatedData);
      setIsTyping(true);
      
      // Submit lead data to email in background
      fetch("https://formsubmit.co/ajax/virdevelopers10@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            "Source": "AI Chatbot Retrained Lead Capture",
            "Name": updatedData.name,
            "Email": updatedData.email,
            "Phone": updatedData.phone,
            "AI Goals / Message": userInput,
            "_subject": `New AI Lead (Chatbot) - ${updatedData.name}`
        })
      })
      .then(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            sender: "bot",
            text: `🎉 Request logged successfully! We have transmitted your details to CEO Adeel Shahid at virdevelopers10@gmail.com. Our team will contact you within 24 hours to schedule your free AI Audit.`,
            timestamp: new Date()
          }
        ]);
        setIsLeadCapture(false);
        setIsTyping(false);
      })
      .catch((err) => {
        console.error(err);
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            sender: "bot",
            text: "We encountered a small transmission error, but your request is important to us. Please email us directly at virdevelopers10@gmail.com or message us via WhatsApp at +92 323 5331206.",
            timestamp: new Date()
          }
        ]);
        setIsLeadCapture(false);
        setIsTyping(false);
      });
      return;
    }

    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "bot",
          text: nextStepMessage,
          timestamp: new Date()
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  const generateBotResponse = (input) => {
    const cleanInput = input.toLowerCase();
    
    // Check if user wants to start lead capture explicitly
    if (cleanInput.includes("quote") || cleanInput.includes("audit") || cleanInput.includes("book") || cleanInput.includes("hire") || cleanInput.includes("yes")) {
      if (!isLeadCapture) {
        return { text: "I can help you initiate a custom quote or free AI Audit request right now.", triggerLead: true };
      }
    }

    // Split user input into words to check matching frequencies
    const words = cleanInput.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").split(/\s+/);
    let bestMatch = null;
    let maxMatches = 0;

    for (const entry of KNOWLEDGE_BASE) {
      let matchCount = 0;
      
      // Match keywords in input words
      for (const keyword of entry.keywords) {
        // If keyword consists of multiple words (e.g. "phone number") check cleanInput directly
        if (keyword.includes(" ")) {
          if (cleanInput.includes(keyword)) {
            matchCount += 2; // Extra weight for multi-word matches
          }
        } else {
          if (words.includes(keyword)) {
            matchCount++;
          }
        }
      }
      
      if (matchCount > maxMatches) {
        maxMatches = matchCount;
        bestMatch = entry;
      }
    }

    if (bestMatch && maxMatches > 0) {
      return { text: bestMatch.response, triggerLead: false };
    }

    // Fallback response
    return {
      text: "I want to make sure you get the exact details you need. Would you like to request a custom quote or schedule a free AI Audit with CEO Adeel Shahid directly?",
      triggerLead: false
    };
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Welcome Notification Bubble */}
      {showNotification && !isOpen && (
        <div className="bg-slate-900 border border-slate-800 text-white p-4 rounded-2xl shadow-2xl mb-3 max-w-[250px] animate-bounce relative">
          <button 
            onClick={(e) => { e.stopPropagation(); setShowNotification(false); }}
            className="absolute top-1.5 right-2 text-gray-500 hover:text-white text-xs font-bold"
          >
            ×
          </button>
          <p className="text-xs font-semibold text-cyan-400 mb-1">ViR AI Assistant</p>
          <p className="text-xs text-gray-300">👋 Need to automate tasks or integrate AI? Ask me a question!</p>
        </div>
      )}

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 via-cyan-600 to-orange-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 relative group"
        aria-label="Chat with AI"
      >
        <span className="absolute inset-0 rounded-full bg-cyan-400/20 group-hover:animate-ping"></span>
        {isOpen ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div 
          className="fixed sm:absolute bottom-24 sm:bottom-20 right-4 left-4 sm:right-0 sm:left-auto bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-3xl w-auto sm:w-[400px] h-[75vh] sm:h-[500px] shadow-2xl overflow-hidden flex flex-col transition-all duration-300"
          style={{ animation: "scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
        >
          {/* Header */}
          <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-950 rounded-full"></span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">ViR AI Assistant</h3>
                <p className="text-xs text-gray-400">Online | Enterprise Ready</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white text-2xl font-semibold"
            >
              ×
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-md whitespace-pre-line leading-relaxed ${
                    msg.sender === "user" 
                      ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-tr-none" 
                      : "bg-slate-900 border border-slate-800 text-gray-200 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-900 border border-slate-800 text-gray-400 rounded-2xl rounded-tl-none px-4 py-3 text-sm shadow-md flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          {!isLeadCapture && (
            <div className="px-6 py-2 flex flex-wrap gap-2 overflow-x-auto bg-slate-950 border-t border-slate-900">
              {[
                "What services do you offer?",
                "Who is the CEO?",
                "Book a free AI Audit",
                "How much does a chatbot cost?"
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(suggestion)}
                  className="text-xs bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-400 hover:text-white px-3 py-1.5 rounded-full transition-all duration-300 whitespace-nowrap"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-4 bg-slate-900 border-t border-slate-800 flex gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isLeadCapture ? "Type your response here..." : "Ask us anything about AI integrations..."}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <button
              type="submit"
              className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white shadow-md hover:from-orange-600 hover:to-orange-700 transition-colors"
            >
              <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
