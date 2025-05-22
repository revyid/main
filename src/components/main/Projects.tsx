"use client";
import { projects, featuredProject } from "@/data/components/main/Projects";
import "@/styles/components/main/Projects.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [activeProject, setActiveProject] = useState<number | null>(null);
    const [animatedProject, setAnimatedProject] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            setMousePosition({ x, y });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    const timer = setTimeout(() => {
                        projects.forEach((project, index) => {
                            setTimeout(() => {
                                setAnimatedProject(project.id);
                            }, index * 200);
                        });
                    }, 300);
                    return () => clearTimeout(timer);
                }
            });
        }, { threshold: 0.1 });
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
        return () => observer.disconnect();
    }, []);
    const titleLetters = "My Projects".split("");
    return (<section ref={sectionRef} id="projects" className="py-32 px-4 sm:px-6 lg:px-8 text-slate-100 relative overflow-hidden">
      
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-0 bg-slate-950 radial-background"/>
                <div className="hexagon-grid"/>
                
                {isInView && (<div className="particles-container">
                        {Array.from({ length: 20 }).map((_, i) => (<div key={i} className="particle" style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 10 + 5}px`,
                    height: `${Math.random() * 10 + 5}px`,
                    animationDuration: `${Math.random() * 20 + 10}s`,
                    animationDelay: `${Math.random() * 5}s`,
                    opacity: Math.random() * 0.5 + 0.1
                }}/>))}
                    </div>)}
                
                <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
                    <div className="floating-shape shape-1" style={{
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`
        }}/>
                    <div className="floating-shape shape-2" style={{
            transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`
        }}/>
                    <div className="floating-shape shape-3" style={{
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * -10}px)`
        }}/>
                </div>
            </div>

            <div className="max-w-7xl mx-auto relative">
                <div className="text-center mb-20 overflow-hidden">
                    <h2 className="relative text-5xl md:text-6xl font-bold inline-flex overflow-hidden">
                        <div className="flex items-center justify-center">
                            {titleLetters.map((letter, index) => (<span key={index} className={`inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-700 ${isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"}`} style={{
                transitionDelay: `${index * 50}ms`,
            }}>
                                    {letter === " " ? <span className="w-4 inline-block">&nbsp;</span> : letter}
                                </span>))}
                        </div>
                        <div className={`absolute -bottom-3 left-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-transparent rounded-full transition-all duration-1000 delay-300 ease-out ${isInView ? "w-full" : "w-0"}`}/>
                    </h2>
                    <p className={`mt-6 text-lg text-slate-400 max-w-xl mx-auto transition-all duration-1000 delay-500 ease-out ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
                        Explore my latest work and creative solutions
                    </p>
                </div>

                {featuredProject && (<div className={`mb-20 transition-all duration-1000 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}>
                        <div className="relative z-10 overflow-hidden rounded-2xl shadow-xl group bg-slate-900/50 backdrop-blur-sm border border-slate-800">
                            <div className="flex flex-col lg:flex-row">
                                <div className="relative lg:w-3/5 overflow-hidden">
                                    <div className="aspect-[16/10] relative overflow-hidden">
                                        <Image src={featuredProject.image} alt={featuredProject.title} width={1000} height={600} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-transparent"/>
                                    </div>
                                    
                                    <div className="absolute bottom-4 right-4 flex flex-wrap gap-2 justify-end">
                                        {featuredProject.tags.map((tag, idx) => (<span key={idx} className={`px-3 py-1 rounded-full text-xs font-medium bg-slate-800/90 backdrop-blur-sm border border-slate-700/70 text-${tag.color} transition-all duration-300 hover:scale-105 hover:shadow-glow-${tag.color}`}>
                                                {tag.name}
                                            </span>))}
                                    </div>
                                    
                                    <div className="absolute top-4 left-4">
                                        <div className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                            </svg>
                                            Featured Project
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-8 lg:w-2/5 flex flex-col justify-center">
                                    <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                                        {featuredProject.title}
                                    </h3>
                                    <p className="text-slate-400 mb-6">{featuredProject.description}</p>
                                    
                                    <div className="mt-auto">
                                        <a href={featuredProject.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-medium rounded-xl transition-all duration-300 group-hover:shadow-glow">
                                            <span>View Project</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="absolute -z-10 top-0 right-0 w-1/2 h-full overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tl from-cyan-500/10 to-transparent"/>
                                <div className="absolute top-1/2 right-0 w-64 h-64 bg-purple-500/10 blur-3xl rounded-full transform -translate-y-1/2 translate-x-1/4"/>
                            </div>
                        </div>
                    </div>)}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {projects.map((project) => (<div key={project.id} className={`group relative overflow-hidden rounded-xl backdrop-blur-sm bg-slate-900/40 border border-slate-800 hover:border-cyan-500/50 transition-all duration-500 transform ${animatedProject >= project.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} hover:shadow-project`} onMouseEnter={() => setActiveProject(project.id)} onMouseLeave={() => setActiveProject(null)}>
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <Image src={project.image} alt={project.title} width={600} height={375} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-300"/>
                                
                                <div className={`absolute inset-0 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition-all duration-300 flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0">
                                        <span>View Details</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                                    {project.title}
                                </h3>
                                <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                                    {project.description}
                                </p>
                                
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tags.map((tag, idx) => (<span key={idx} className={`px-2 py-1 rounded-full text-xs font-medium border border-slate-700 text-${tag.color} bg-slate-800/50`}>
                                            {tag.name}
                                        </span>))}
                                </div>
                            </div>
                            
                            <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden pointer-events-none">
                                <div className={`absolute top-0 right-0 w-10 h-10 translate-x-1/2 -translate-y-1/2 rotate-45 bg-gradient-to-br ${activeProject === project.id
                ? "from-cyan-500/30 via-cyan-500/20 to-transparent"
                : "from-slate-700/30 via-slate-700/20 to-transparent"} transition-colors duration-300`}/>
                            </div>
                        </div>))}
                </div>
                
                <div className={`flex justify-center mt-12 transition-all duration-1000 delay-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
                    <a href="#" className="group relative px-8 py-4 font-medium text-white overflow-hidden rounded-xl">
                        <span className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-purple-600"></span>
                        <span className="absolute inset-0 w-full h-full border border-cyan-500 rounded-xl"></span>
                        <span className="relative flex items-center gap-2">
                            <span>View All Projects</span>
                            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                            </svg>
                        </span>
                    </a>
                </div>
            </div>
        </section>);
}
