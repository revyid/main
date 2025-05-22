"use client";
const Footer = () => {
    return (<footer className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <a href="#" className="text-2xl font-bold gradient-text">
              Portfolio
            </a>
            <p className="text-slate-400 mt-4 max-w-md">
              Creating beautiful digital experiences with modern technologies and fluid animations.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-8 mb-6">
              {[
            ["#home", "Home"],
            ["#about", "About"],
            ["#projects", "Projects"],
            ["#contact", "Contact"],
        ].map(([href, label], i) => (<a key={i} href={href} className="text-slate-400 hover:text-white transition-colors">
                  {label}
                </a>))}
            </div>

            <div className="flex space-x-5">
              {socials.map((icon, i) => (<a key={i} href="#" className="text-slate-400 hover:text-white transition-colors text-xl">
                  <i className={icon}/>
                </a>))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500">
          <p>© 2023 Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>);
};
const socials = [
    "fab fa-linkedin-in",
    "fab fa-twitter",
    "fab fa-github",
    "fab fa-dribbble",
];
export default Footer;
