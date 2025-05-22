"use client";
import { useEffect } from "react";
import { contactInfo } from "@/data/components/main/Contact";
const Contact = () => {
    useEffect(() => {
        const section = document.getElementById("contact");
        if (!section)
            return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("section-visible");
                }
            });
        }, { threshold: 0.1 });
        observer.observe(section);
    }, []);
    return (<section id="contact" className="section-hidden py-24 px-4 sm:px-6 lg:px-8 text-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-text animate-tilt-in">
            Get In Touch
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto animate-float-pop">
            Have a project or just want to say hi? I’d love to hear from you.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2 animate-scale-in">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Name
                  </label>
                  <input type="text" className="w-full px-5 py-4 rounded-xl border border-slate-700 bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="Your name"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email
                  </label>
                  <input type="email" className="w-full px-5 py-4 rounded-xl border border-slate-700 bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="Your email"/>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Subject
                </label>
                <input type="text" className="w-full px-5 py-4 rounded-xl border border-slate-700 bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="Subject"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Message
                </label>
                <textarea rows={5} className="w-full px-5 py-4 rounded-xl border border-slate-700 bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="Your message"/>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-[1.01] glow-effect">
                Send Message <i className="fas fa-paper-plane ml-2"/>
              </button>
            </form>
          </div>

          <div className="lg:w-1/2 animate-fade-in-up2">
            <div className="bg-slate-900 p-8 rounded-2xl shadow-lg h-full border border-slate-700">
              <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((c, i) => (<div className="flex items-start animate-appear-delay" key={i} style={{ animationDelay: `${i * 0.2}s` }}>
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center mr-4 ${c.bg}`}>
                      <i className={`${c.icon} text-xl ${c.color}`}/>
                    </div>
                    <div>
                      <h4 className="font-medium text-lg text-white">{c.title}</h4>
                      <p className="text-slate-400">{c.value}</p>
                    </div>
                  </div>))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);
};
export default Contact;
