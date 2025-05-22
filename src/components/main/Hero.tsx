"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
const Hero = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const heroRef = useRef<HTMLElement | null>(null);
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    const [particles, setParticles] = useState<Array<{
        top: string;
        left: string;
        delay: string;
        duration: string;
    }>>([]);
    useEffect(() => {
        const generatedParticles = [...Array(30)].map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            delay: `${Math.random() * 5}s`,
            duration: `${5 + Math.random() * 10}s`
        }));
        setParticles(generatedParticles);
    }, []);
    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 300);
        const handleMouseMove = (e: MouseEvent) => {
            if (!heroRef.current)
                return;
            const rect = heroRef.current.getBoundingClientRect();
            setMousePosition({
                x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
                y: ((e.clientY - rect.top) / rect.height - 0.5) * 2
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            clearTimeout(timer);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);
    const getParallaxStyle = (strength = 10) => {
        return {
            transform: `translate(${mousePosition.x * strength}px, ${mousePosition.y * strength}px)`,
        };
    };
    return (<section id="home" ref={heroRef} className={`min-h-screen flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 text-slate-100 overflow-hidden relativebg-slate-900/95 backdrop-blur-sm ${isLoaded ? "opacity-100" : "opacity-0"} transition-all duration-1000`}>
      
      <div className="absolute inset-0 -z-10" style={{ zIndex: 0 }}>
        
        <div className="absolute w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl top-20 left-[-6rem] animate-float-slow" style={getParallaxStyle(-5)}/>
        <div className="absolute w-96 h-96 bg-pink-500/15 rounded-full blur-3xl bottom-10 right-[-6rem] animate-float-slow delay-300" style={getParallaxStyle(-8)}/>
        <div className="absolute w-72 h-72 bg-purple-500/15 rounded-full blur-2xl top-1/2 left-1/3 animate-float-slow delay-700" style={getParallaxStyle(-3)}/>
        <div className="absolute w-64 h-64 bg-blue-500/10 rounded-full blur-3xl bottom-1/3 left-1/4 animate-float-slow delay-500" style={getParallaxStyle(-6)}/>
        
        
        <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-slate-700/30 rounded-3xl rotate-12 animate-float-slow" style={{
            ...getParallaxStyle(-2),
            animation: "float 8s ease-in-out infinite, pulse 10s ease-in-out infinite"
        }}/>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 border border-slate-700/30 rounded-full animate-float-slow delay-500" style={getParallaxStyle(-3)}/>
        <div className="absolute top-2/3 right-1/3 w-24 h-24 border border-slate-700/30 rounded-xl -rotate-12 animate-float-slow delay-700" style={getParallaxStyle(-4)}/>
        
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        {isClient && (<div className="particles absolute inset-0">
  {particles.map((particle, i) => (<div key={i} className={`absolute rounded-full animate-twinkle ${i % 3 === 0 ? "w-1.5 h-1.5 bg-indigo-300/30" :
                    i % 3 === 1 ? "w-1 h-1 bg-purple-300/20" :
                        "w-0.5 h-0.5 bg-white/30"}`} style={{
                    top: particle.top,
                    left: particle.left,
                    animationDelay: particle.delay,
                    animationDuration: particle.duration
                }}/>))}
        </div>)}
        
        
        <div className="absolute top-1/3 right-1/5 w-16 h-1 bg-gradient-to-r from-indigo-500/30 to-transparent rounded-full animate-float-slow delay-200" style={getParallaxStyle(-4)}/>
        <div className="absolute bottom-1/4 right-1/6 w-20 h-1 bg-gradient-to-r from-purple-500/20 to-transparent rounded-full animate-float-slow delay-400" style={getParallaxStyle(-6)}/>
      </div>

      <div className="max-w-7xl w-full mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="md:w-1/2 z-10">
            
    <div className={`overflow-hidden ${isLoaded ? 'animate-reveal' : ''}`}>
  <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight transform transition-all duration-700 delay-100">
    <span className="text-white inline-block mr-2">Hello, I&apos;m</span>
    <span className="relative bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x inline-block">
      Revy
      <svg className="absolute -bottom-2 left-0 w-full h-2 text-pink-500/30" viewBox="0 0 100 10" preserveAspectRatio="none">
        <path d="M0,0 Q50,10 100,0" stroke="currentColor" strokeWidth="2" fill="none"/>
      </svg>
    </span>
  </h1>
    </div>
            
            <div className={`overflow-hidden ${isLoaded ? 'animate-reveal-delay-1' : ''}`}>
              <h2 className="text-2xl md:text-3xl font-medium text-slate-300 mb-6 flex items-center transform transition-all duration-700 delay-300">
                Frontend Developer
  <div className="relative ml-4 w-3 h-3">
  <span className="absolute top-1/2 left-1/2 w-4 h-4 animate-ping-slow rounded-full bg-green-400 opacity-25 transform -translate-x-1/2 -translate-y-1/2"></span>
  <span className="absolute top-1/2 left-1/2 w-3 h-3 bg-green-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></span>
    </div>
              </h2>
            </div>
            
            <div className={`overflow-hidden ${isLoaded ? 'animate-reveal-delay-2' : ''}`}>
              <p className="text-lg text-slate-400 max-w-md leading-relaxed mb-8 transform transition-all duration-700 delay-500">
                I design and build beautiful, engaging digital experiences with animations and interactivity that bring ideas to life.
              </p>
            </div>
            
            <div className={`flex gap-6 ${isLoaded ? 'animate-reveal-delay-3' : 'opacity-0'} transition-all duration-700 delay-700`}>
              <a href="#projects" className="relative group px-6 py-3 bg-transparent overflow-hidden rounded-xl">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-30 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></span>
                <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full rounded-xl"></span>
                <span className="relative z-10 text-white font-medium">View Work</span>
              </a>
              
              <a href="#contact" className="relative px-6 py-3 overflow-hidden rounded-xl group">
                <span className="absolute inset-0 w-full h-full bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 transition-all duration-300 rounded-xl"></span>
                <span className="absolute inset-0 w-0 bg-slate-700 transition-all duration-300 ease-out group-hover:w-full rounded-xl"></span>
                <span className="relative z-10 text-slate-300 font-medium">Contact Me</span>
              </a>
            </div>

            <div className={`mt-12 flex items-center gap-4 ${isLoaded ? 'animate-reveal-delay-4' : 'opacity-0'} transition-all duration-700 delay-900`}>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (<div key={i} className="w-10 h-10 rounded-full border-2 border-slate-800 bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden flex items-center justify-center text-xs font-medium shadow-lg" style={{
                transform: `translateX(${i * 5}px) scale(${1 - i * 0.05})`,
                zIndex: 10 - i
            }}>
                    {String.fromCharCode(64 + i)}
                  </div>))}
              </div>
              <div>
                <p className="text-sm text-slate-400">Trusted by 50+ clients</p>
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (<svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>))}
                  </div>
                  <span className="ml-2 font-medium text-sm">5.0 (42)</span>
                </div>
              </div>
            </div>
            
            <div className={`mt-8 flex gap-4 ${isLoaded ? 'animate-reveal-delay-5' : 'opacity-0'} transition-all duration-700 delay-1000`}>
              {['React', 'Next.js', 'Tailwind'].map((tech, i) => (<div key={tech} className="px-3 py-1 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/30 text-xs font-medium text-slate-300 flex items-center gap-1.5" style={{ transitionDelay: `${1000 + i * 100}ms` }}>
                  <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                  {tech}
                </div>))}
            </div>
          </div>

          
          <div className="md:w-1/2 flex justify-center relative">
            <div className={`relative ${isLoaded ? 'animate-float-up' : 'translate-y-10 opacity-0'} transition-all duration-1000 delay-500`}>
              
              <div className="w-72 h-72 md:w-96 md:h-96 perspective-1000 relative">
                <div className="relative w-full h-full preserve-3d group transition-transform duration-700 ease-out hover:rotate-y-12 hover:rotate-x-12" style={{ transformStyle: 'preserve-3d' }}>
                  
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/50 shadow-2xl backface-hidden">
                    
                    <div className="absolute inset-4 rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 to-purple-600/10"></div>
                      <Image src="https://revyid.github.io/src/gojo%20icon_edit.jpeg" alt="Profile" width={384} height={384} className="w-full h-full object-cover"/>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent"></div>
                    </div>
                    
                    
                    <div className="absolute top-6 right-6 w-16 h-16 animate-spin-slow">
                      <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-500/20">
                        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none"/>
                        <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="2" fill="none"/>
                        <path d="M50,10 L50,30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M50,70 L50,90" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M10,50 L30,50" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M70,50 L90,50" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    
                    
                    <div className="absolute top-1/3 right-6 w-3 h-3 rounded-full bg-indigo-500/30 animate-float-slow delay-100"></div>
                    <div className="absolute bottom-1/4 right-10 w-2 h-2 rounded-full bg-purple-500/40 animate-float-slow delay-300"></div>
                    
                    
                    <div className="absolute inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-700"></div>
                    
                    
                    <div className="absolute top-5 right-6 text-white text-sm font-medium">
                      <div className="flex items-center">
    <div className="relative w-2 h-2">
  <span className="absolute top-1/2 left-1/2 w-3 h-3 animate-ping-slow rounded-full bg-green-400 opacity-25 transform -translate-x-1/2 -translate-y-1/2"></span>
  <span className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></span>
    </div>
                        <span className="ml-2">Frontend Developer</span>
                      </div>
                    </div>
                    
                    
                    <div className="absolute top-6 left-6 text-white">
                      <h3 className="font-bold text-lg">Revy</h3>
                      <p className="text-sm text-slate-400">@revydev</p>
                    </div>
                  </div>
                </div>
              </div>
              
              
              <div className="absolute bottom-6 left-6 translate-x bg-slate-800/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg border border-slate-700/50 flex items-center gap-3 transform hover:scale-105 transition-all duration-300">
  <div className="relative w-3 h-3">
  <span className="absolute top-1/2 left-1/2 w-4 h-4 bg-green-400 opacity-25 rounded-full animate-ping transform -translate-x-1/2 -translate-y-1/2"></span>
  <span className="absolute top-1/2 left-1/2 w-3 h-3 bg-green-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></span>
    </div>
                <span className="text-sm font-medium text-white">Available for work</span>
              </div>
              
              
              <div className="absolute right-1 translate-x-1/2 top-1/3 w-16 h-16 bg-indigo-500/10 backdrop-blur-md rounded-xl border border-indigo-500/20 shadow-lg animate-float-slow animate-rotate-slow transform translate-z-30" style={getParallaxStyle(15)}></div>
              <div className="absolute -left-6 bottom-1/3 w-12 h-12 bg-pink-500/10 backdrop-blur-md rounded-full border border-pink-500/20 shadow-lg animate-float-slow delay-700 transform translate-z-20" style={getParallaxStyle(10)}></div>
              
              
              <div className="absolute -left-10 top-1/5 w-10 h-10 bg-purple-500/10 backdrop-blur-md rotate-45 border border-purple-500/20 shadow-lg animate-float-slow delay-300 transform translate-z-15" style={getParallaxStyle(8)}></div>
            </div>
          </div>
        </div>
      </div>
      
      
      <div className={`absolute bottom-8 left-1/2 translate-y-1/2 ${isLoaded ? 'animate-fade-in-up3' : 'opacity-0'} transition-all duration-700 delay-1200`}>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-center justify-center p-1 group hover:border-white/40 transition-all duration-300">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-scroll-down group-hover:bg-white/70 transition-all duration-300"></div>
        </div>
        <p className="text-white/50 text-xs font-medium mt-2 text-center -translate-x-5 group-hover:text-white/70 transition-all duration-300">Scroll Down</p>
      </div>
    </section>);
};
export default Hero;
