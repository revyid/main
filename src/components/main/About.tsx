"use client";
import Image from "next/image";
import "@/styles/components/main/About.css";
import { useEffect, useRef, useState } from "react";
import { FaReact, FaLightbulb, FaBolt, FaMobileAlt, FaCode, FaDownload, FaCertificate } from "react-icons/fa";
import { SiTypescript, SiNextdotjs } from "react-icons/si";
const About = () => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const imageRef = useRef<HTMLDivElement | null>(null);
    const [isInView, setIsInView] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                }
            });
        }, { threshold: 0.1 });
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
        return () => observer.disconnect();
    }, []);
    useEffect(() => {
        if (!imageRef.current)
            return;
        const handleImageMouseMove = (e: MouseEvent) => {
            if (!imageRef.current)
                return;
            const rect = imageRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
            imageRef.current.style.transform = `
        perspective(1000px) 
        rotateY(${x * 8}deg) 
        rotateX(${-y * 8}deg) 
        translateZ(10px)
      `;
            const badgeElements = document.querySelectorAll('.floating-badge');
            badgeElements.forEach((badge) => {
                if (badge instanceof HTMLElement) {
                    badge.style.transform = `
            perspective(1000px) 
            rotateY(${x * 3}deg) 
            rotateX(${-y * 3}deg) 
            translateZ(20px)
          `;
                }
            });
        };
        const handleImageMouseLeave = () => {
            if (imageRef.current) {
                imageRef.current.style.transform = `
          perspective(1000px) 
          rotateY(0) 
          rotateX(0) 
          translateZ(0)
        `;
                const badgeElements = document.querySelectorAll('.floating-badge');
                badgeElements.forEach((badge) => {
                    if (badge instanceof HTMLElement) {
                        badge.style.transform = `
              perspective(1000px) 
              rotateY(0) 
              rotateX(0) 
              translateZ(20px)
            `;
                    }
                });
            }
        };
        const imageElement = imageRef.current;
        imageElement.addEventListener("mousemove", handleImageMouseMove);
        imageElement.addEventListener("mouseleave", handleImageMouseLeave);
        return () => {
            imageElement.removeEventListener("mousemove", handleImageMouseMove);
            imageElement.removeEventListener("mouseleave", handleImageMouseLeave);
        };
    }, []);
    const titleLetters = "About Me".split("");
    return (<section ref={sectionRef} id="about" className="py-20 px-4 sm:px-6 lg:px-8 text-slate-100 relative overflow-hidden">
      
      <div className="absolute inset-0 -z-10 overflow-hidden">
        
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"/>
        
        
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl"/>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl"/>
        
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"/>
        
        
        <div className="absolute inset-0">
          
          {isInView && (<>
              <div className="absolute top-1/4 left-1/4 w-20 h-20 border border-indigo-500/20 rounded-full animate-pulse-slow"/>
              <div className="absolute bottom-1/3 right-1/3 w-32 h-32 border border-cyan-500/20 rounded-full animate-pulse-slow animation-delay-1000"/>
              <div className="absolute top-2/3 left-1/2 w-16 h-16 border border-purple-500/20 rounded-full animate-pulse-slow animation-delay-2000"/>
            </>)}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        
        <div className="text-center mb-16 overflow-hidden">
          <h2 className="relative text-4xl md:text-5xl lg:text-6xl font-bold inline-block">
            <div className="flex items-center justify-center">
              {titleLetters.map((letter, index) => (<span key={index} className={`inline-block bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300 transition-all duration-700 ${isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"}`} style={{
                transitionDelay: `${index * 50}ms`,
            }}>
                  {letter === " " ? <span className="w-4 inline-block">&nbsp;</span> : letter}
                </span>))}
            </div>
            <div className={`absolute -bottom-3 left-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-transparent rounded-full transition-all duration-1000 delay-300 ease-out ${isInView ? "w-full" : "w-0"}`}/>
          </h2>
          <p className={`mt-6 text-lg text-slate-400 max-w-2xl mx-auto transition-all duration-1000 delay-500 ease-out ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            Crafting innovative digital experiences with precision and creativity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          <div className={`lg:col-span-5 transition-all duration-1000 delay-200 ease-out ${isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <div className="relative mx-auto max-w-md lg:max-w-full">
              
              <div className="pt-10 pb-10 px-10 sm:pt-14 sm:pb-14 sm:px-14">
                <div ref={imageRef} className="relative group w-full" style={{ transformStyle: "preserve-3d", transition: "transform 0.5s ease-out" }}>
                  
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent rounded-2xl" style={{ transform: "translateZ(20px)" }}/>
                    
                    
                    <div className="relative h-full w-full rounded-2xl overflow-hidden">
                      <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1170&q=80" alt="Creative developer at work" width={600} height={600} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" priority/>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent"/>
                    </div>
                    
                    
                    <div className="absolute top-4 right-4 rotate-12 group-hover:rotate-45 transition-transform duration-700" style={{ transform: "translateZ(30px)" }}>
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" className="text-white/40">
                        <polygon points="12,2 22,12 12,22 2,12" stroke="currentColor" strokeWidth="1"/>
                      </svg>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 rotate-12 group-hover:-rotate-45 transition-transform duration-700" style={{ transform: "translateZ(30px)" }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/40">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1"/>
                        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                
                <div className="floating-badge absolute -top-4 -left-4 sm:-top-6 sm:-left-6 p-3 rounded-xl bg-slate-800/90 backdrop-blur-md shadow-xl border border-slate-700/50 hover:translate-y-1 transition-transform duration-500 z-10" style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 flex items-center justify-center">
                      <FaBolt className="h-4 w-4 sm:h-5 sm:w-5 text-white"/>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-slate-300">Expertise</p>
                      <p className="text-sm sm:text-lg font-bold text-white">Frontend</p>
                    </div>
                  </div>
                </div>
                
                <div className="floating-badge absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 p-3 rounded-xl bg-slate-800/90 backdrop-blur-md shadow-xl border border-slate-700/50 hover:translate-y-1 transition-transform duration-500 z-10" style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                      <FaCode className="h-4 w-4 sm:h-5 sm:w-5 text-white"/>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-slate-300">Experience</p>
                      <p className="text-sm sm:text-lg font-bold text-white">1+ years</p>
                    </div>
                  </div>
                </div>
                
                
                <div className="absolute top-1/4 -right-4 animate-float-1 z-10">
                  <div className="w-12 h-12 bg-slate-800/80 backdrop-blur-md rounded-xl border border-slate-700/50 flex items-center justify-center shadow-lg">
                    <FaReact className="w-6 h-6 text-blue-400"/>
                  </div>
                </div>
                
                <div className="absolute top-2/3 -left-4 animate-float-2 z-10">
                  <div className="w-12 h-12 bg-slate-800/80 backdrop-blur-md rounded-xl border border-slate-700/50 flex items-center justify-center shadow-lg">
                    <SiTypescript className="w-6 h-6 text-cyan-400"/>
                  </div>
                </div>
                
                
                <div className="absolute -z-10 inset-0 overflow-hidden">
                  
                  <div className="absolute -top-10 -right-10 w-40 h-40 border border-indigo-500/20 rounded-full"/>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-cyan-500/20 rounded-full"/>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 border border-purple-500/10 rounded-full"/>
                </div>
              </div>
            </div>
          </div>

          
          <div className={`lg:col-span-7 transition-all duration-1000 delay-400 ease-out ${isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
              <div className="overflow-hidden">
                <span className={`inline-block transition-transform duration-1000 delay-300 ${isInView ? "translate-y-0" : "translate-y-full"}`}>
                  Crafting
                </span>
              </div>{" "}
              <div className="overflow-hidden inline-block">
                <span className={`inline-block transition-transform duration-1000 delay-500 ${isInView ? "translate-y-0" : "translate-y-full"}`}>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                    Exceptional
                  </span>
                </span>
              </div>{" "}
              <div className="overflow-hidden inline-block">
                <span className={`inline-block transition-transform duration-1000 delay-700 ${isInView ? "translate-y-0" : "translate-y-full"}`}>
                  Experiences
                </span>
              </div>
            </h3>
            
            <p className="text-slate-400 mb-8 leading-relaxed text-base sm:text-lg">
              I&apos;m a frontend developer and digital craftsman who specializes in building
              beautiful, intuitive interfaces and memorable web experiences. With a deep
              appreciation for clean design and a passion for interactive technology,
              I transform complex problems into elegant solutions that engage and inspire.
            </p>

            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {badges.map((badge, idx) => (<div key={idx} className={`relative flex flex-col items-center justify-center p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/80 hover:scale-105 transition-all duration-300 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: `${600 + idx * 100}ms` }}>
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gradient-to-br ${badge.gradient} mb-2`}>
                    {badge.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-white text-center">{badge.title}</span>
                </div>))}
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {features.map((item, idx) => (<div key={idx} className={`relative overflow-hidden backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-slate-800 bg-slate-900/30 hover:bg-slate-800/50 hover:border-indigo-500/30 group transition-all duration-500 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{
                transitionDelay: `${800 + idx * 150}ms`,
            }}>
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mr-3 sm:mr-4 bg-slate-800 border border-slate-700/50 group-hover:scale-110 transition-transform duration-500">
                      {item.icon}
                    </div>
                    <h4 className="font-bold text-base sm:text-lg text-white">{item.title}</h4>
                  </div>
                  <p className="text-sm sm:text-base text-slate-400">{item.desc}</p>
                  
                  
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-8 h-8 translate-x-1/2 -translate-y-1/2 rotate-45 bg-gradient-to-br from-indigo-500/0 via-indigo-500/10 to-indigo-500/30 group-hover:scale-150 transition-transform duration-700"/>
                  </div>
                </div>))}
            </div>

            
            <div className={`flex flex-wrap gap-4 transition-all duration-1000 delay-1000 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
              <a href="#" className="group relative px-5 py-2.5 sm:px-6 sm:py-3 font-medium text-white overflow-hidden rounded-xl">
                <div className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600"></div>
                <div className="absolute inset-0 w-full h-full border border-indigo-500 rounded-xl"></div>
                <div className="relative flex items-center gap-2">
                  <span>Download CV</span>
                  <FaDownload className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"/>
                </div>
              </a>
              
              <a href="#" className="relative px-5 py-2.5 sm:px-6 sm:py-3 font-medium text-slate-300 overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm hover:text-white hover:border-slate-600 transition-all duration-300">
                <span className="relative z-10 flex items-center gap-2">
                  <FaCertificate className="w-4 h-4"/>
                  View Certificates
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>);
};
const features = [
    {
        title: "Creative Vision",
        desc: "Transforming complex problems into intuitive and engaging digital solutions.",
        icon: <FaLightbulb className="text-amber-400 text-xl"/>,
    },
    {
        title: "Performance First",
        desc: "Building lightning-fast applications optimized for maximum speed and efficiency.",
        icon: <FaBolt className="text-cyan-400 text-xl"/>,
    },
    {
        title: "Responsive Design",
        desc: "Creating seamless experiences across all devices with fluid, adaptive layouts.",
        icon: <FaMobileAlt className="text-blue-400 text-xl"/>,
    },
    {
        title: "Clean Architecture",
        desc: "Implementing maintainable, scalable code following modern best practices.",
        icon: <FaCode className="text-pink-400 text-xl"/>,
    },
];
const badges = [
    {
        title: "React",
        gradient: "from-blue-500 to-cyan-400",
        icon: <FaReact className="h-6 w-6 text-white"/>,
    },
    {
        title: "TypeScript",
        gradient: "from-blue-600 to-indigo-500",
        icon: <SiTypescript className="h-6 w-6 text-white"/>,
    },
    {
        title: "Next.js",
        gradient: "from-gray-700 to-gray-900",
        icon: <SiNextdotjs className="h-6 w-6 text-white"/>,
    },
];
export default About;
