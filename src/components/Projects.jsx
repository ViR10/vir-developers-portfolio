import React, { useState } from "react";
import netflixImg from '../assets/netflix.png';
import tolImg from '../assets/tol.png';
import invoiceImg from '../assets/invoice.png';
import ezyImg from '../assets/ezy.png';
import nmsImg from '../assets/nms.png';
import apnaImg from '../assets/apna.png';
import gpaImg from '../assets/gpa.png';
import shopsyImg from '../assets/shopsy.png';
import beadsImg from '../assets/beads.png';

const PROJECTS = [
  {
    id: 1,
    title: "Netflix Clone",
    description: "Full UI clone of Netflix with responsive design, browse movies, TV shows interface. Complete streaming platform replica.",
    image: netflixImg,
    link: "https://clonenetlfiex.netlify.app/",
    tags: ["React", "UI Clone", "Responsive"],
    color: "cyan"
  },
  {
    id: 2,
    title: "ToolBox Pro",
    description: "15+ free online tools for developers and creators. Text converters, formatters, generators, and productivity utilities.",
    image: tolImg,
    link: "https://tolboxpro.netlify.app",
    tags: ["Tools", "Productivity", "Web App"],
    color: "orange"
  },
  {
    id: 3,
    title: "Invoice Generator",
    description: "Full bakery management system with invoice generation, inventory tracking, and customer management features.",
    image: invoiceImg,
    link: "https://yellow-dotti-3.tiiny.site",
    tags: ["Management", "Invoice", "Business"],
    color: "cyan"
  },
  {
    id: 4,
    title: "EzyChat - Secret Messaging",
    description: "Revolutionary secure chatting platform where messages are hidden inside images and audio files using steganography.",
    image: ezyImg,
    link: "https://chatgin.netlify.app",
    tags: ["Security", "Chat", "Encryption"],
    color: "orange"
  },
  {
    id: 5,
    title: "NMS Attendance System",
    description: "Complete UET attendance management system. Helps teachers track, manage student attendance. Perfect for class CRs.",
    image: nmsImg,
    link: "https://nmsattendance.netlify.app",
    tags: ["Education", "Management", "System"],
    color: "cyan"
  },
  {
    id: 6,
    title: "Apna Card Generator",
    description: "Digital student card generator. Create, customize, and download professional student ID cards instantly.",
    image: apnaImg,
    link: "https://apnacard.netlify.app",
    tags: ["Generator", "Student", "Tool"],
    color: "orange"
  },
  {
    id: 7,
    title: "UET GPA Calculator",
    description: "Complete GPA and CGPA calculation system for students. Track grades, calculate semester GPA, and overall CGPA.",
    image: gpaImg,
    link: "https://uetgpa.netlify.app",
    tags: ["Education", "Calculator", "Student"],
    color: "cyan"
  },
  {
    id: 8,
    title: "Shopsy - E-commerce",
    description: "Full-featured e-commerce platform with product listings, shopping cart, checkout, and order management.",
    image: shopsyImg,
    link: "#",
    tags: ["E-commerce", "Shopping", "Full-Stack"],
    color: "orange"
  },
  {
    id: 9,
    title: "3 Beads Game",
    description: "Interactive two-player game with automatic victory music. Fun, engaging gameplay with sound effects and animations.",
    image: beadsImg,
    link: "#",
    tags: ["Game", "Multiplayer", "Entertainment"],
    color: "cyan"
  }
];

const CATEGORIES = ["All", "Web App", "Tools", "Education", "E-commerce", "Game"];

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = filter === "All" 
    ? PROJECTS 
    : PROJECTS.filter(project => 
        project.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
      );

  return (
    <div className="min-h-screen bg-black pt-24">
      
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-black">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-orange-500/20 border border-cyan-400 rounded-full text-cyan-400 text-sm font-semibold mb-6">
            Portfolio Showcase
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-orange-400 to-cyan-400 text-transparent bg-clip-text mb-6">
            Featured Projects
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A collection of cutting-edge web applications, tools, and systems built with modern technologies.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 px-6 sticky top-20 bg-black/95 backdrop-blur-sm z-40 border-b border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  filter === category
                    ? "bg-gradient-to-r from-cyan-500 to-orange-500 text-white shadow-lg"
                    : "bg-slate-900 text-gray-400 border border-slate-700 hover:border-cyan-400 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-black to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Have a Project <span className="text-orange-500">in Mind?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Let's collaborate and build something amazing together.
          </p>
          <a
            href="/contact"
            className="inline-block px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300"
          >
            Start a Project
          </a>
        </div>
      </section>
    </div>
  );
}

// Project Card Component
function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const borderColor = project.color === "cyan" ? "hover:border-cyan-400" : "hover:border-orange-500";
  const buttonColor = project.color === "cyan" 
    ? "from-cyan-500 to-cyan-600 hover:shadow-cyan-500/50" 
    : "from-orange-500 to-orange-600 hover:shadow-orange-500/50";

  return (
    <div
      className={`group bg-slate-900/50 border border-slate-700 rounded-2xl overflow-hidden ${borderColor} transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-slate-800">
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}></div>
        
        {/* Overlay Button */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-6 py-3 bg-gradient-to-r ${buttonColor} text-white font-bold rounded-full shadow-xl hover:scale-110 transition-all duration-300`}
          >
            View Live →
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-400 leading-relaxed">
          {project.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className={`px-3 py-1 text-sm font-semibold rounded-full ${
                project.color === "cyan"
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Link */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-cyan-400 font-semibold hover:text-orange-400 transition-colors duration-300 pt-2"
        >
          Visit Project
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}
