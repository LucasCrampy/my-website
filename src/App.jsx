import React, { useState, useEffect, useRef } from 'react';
import { Mail, ChevronDown, BookOpen, Code, Camera, Leaf, Accessibility, GraduationCap, Briefcase, Calculator, X, ExternalLink, Download, Linkedin, Github, ArrowUpRight, Lightbulb } from 'lucide-react';

// ==========================================
// CENTRAL DATA STORE
// Edit all your site text, links, and content here!
// ==========================================
const data = {
  siteContent: {
    hero: {
      name: "LUCAS CRAMPTON",
      major: "APPLIED MATH",
      tagline: '"A student figuring things out, one problem at a time"',
      profileImage: "Wave.gif"
    },
    contact: {
      tagline: "Email me any time!",
      email: "lucaschioinocrampton@gmail.com"
    },
    bio: {
      title: "Who I Am",
      image: "profile-lucas.jpg",
      text: "I'm a student at Olympic College passionate about mathematics and the sciences. When I'm not studying, I enjoy photography, hiking, going on runs, playing videogames, and trying new things. I hope to some day make a positive impact in the world through my work. E Growing up with an older sister with cerebral palsy has instilled in me a deep-seated empathy and a drive to help those with special needs. I also have always had a deep appreciation for the natural world and the life that it inhabits. For these reasons, environmental conservation and helping people with disabilities are two causes that are especially important to me.",
      linkedin: "https://linkedin.com/in/your-profile",
      github: "https://github.com/LucasCrampy",
      sisterText: "My younger sister is a data science student at Northeastern and does some cool stuff. Check out her work:",
      sisterImage: "bridget-profile.jpg",
      sisterLinkedin: "https://www.linkedin.com/in/bridget-crampton/",
      sisterGithub: "https://github.com/crbridget"
    },
    education: {
      transfer: {
        date: "EST. 2026 - 2027",
        school: "Bachelor's Transfer",
        badge: "FUTURE GOAL",
        badgeClass: "bg-blue-200 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100",
        description: "Mathematics or Applied Mathematics",
        bgClass: "bg-white dark:bg-slate-800",
        shadowClass: "shadow-[8px_8px_0px_0px_rgba(59,130,246,1)]"
      },
      olympic: {
        date: "JAN 2025 - PRESENT",
        school: "Olympic College",
        badge: "CURRENT",
        badgeClass: "bg-yellow-400 dark:bg-slate-700 text-black dark:text-slate-200",
        description: "Currently on track to complete my Associate's degree. Focusing on challenging myself, learning to enjoy the process of learning new things.",
        mathCourses: [
          { name: "Statistics", status: "completed" },
          { name: "Calculus I", status: "completed" },
          { name: "Calculus II", status: "completed" },
          { name: "Calculus III", status: "completed" },
          { name: "Discrete Math", status: "current" },
          { name: "Differential Eq.", status: "current" },
          { name: "Linear Algebra", status: "future" },
          { name: "Calculus IV", status: "future" }
        ],
        otherCourses: [
          "Intro to Physics",
          "Environmental Science",
          "Java I & II",
          "Intro to Communication"
        ]
      },
      highschool: {
        date: "SUMMER 2023",
        school: "Eagle Harbor High",
        badge: "COMPLETED",
        badgeClass: "bg-slate-400 dark:bg-slate-600 text-white dark:text-slate-200",
        bgClass: "bg-slate-100 dark:bg-slate-800/80 opacity-90"
      }
    },
    experience: [
      { role: "Individual Cargiver", year: "2025 - Present" },
      { role: "Carpentry Apprentice", year: "2025" },
      { role: "Freelance IT Work", year: "2025" },
      { role: "Mouse Magic Toys", year: "2024" },
      { role: "Docs Marina Grill", year: "2023" }
    ]
  },
  projectContent: {
    math: {
      id: "math",
      icon: "calculator",
      title: "Mathematics",
      color: "bg-red-200 dark:bg-slate-800",
      headerTitle: "Math Projects",
      headerSubtitle: "Solving hard problems with math is one of my favorite things. These are some examples of projects I have done for school.",
      projects: [
        {
          title: "The Bug Problem",
          pdfLink: "Math-Project-1.pdf",
          description: "A Calculus 3 project analyzing the trajectory of four bugs chasing each other in a square formation. The solution explores both polar coordinate differential equations and limits of geometric series. In the problem sheet we were given, we were guided through the process of solving it with polar quardinates but I thought of a more intuitive way to solve it with geometric series. I really enjoyed this project because its a great example of how even a simple problem can be solved in a myriad of ways. "
        },
        {
          title: "Keplers Laws",
          pdfLink: "Math-Project-2.pdf",
          description: "This project I used vector calculus and taylor series to derive Kepler's second and third laws from his first law. I liked connecting the physics and astronomy to math concepts we were learning in class and seeing how they all fit together. I also thought it was pretty cool to follow in Keplers footseps in a way and better understand the logic behind the laws."
        }
      ]
    },
    computers: {
      id: "computers",
      icon: "code",
      title: "Computers",
      color: "bg-blue-200 dark:bg-slate-800",
      headerTitle: "Programming & Software",
      headerSubtitle: "Showcasing two applications built with Java. I enjoy a bit of coding here or there and I like the concepts in computer science.",
      projects: [
        {
          title: "Terminal Chess",
          image: "Project1-Screenshot.jpg",
          link: "https://github.com/LucasCrampy/FirstProject_SimpleChessJava",
          description: "This was my final project for my first Java class. I have always enjoyed playing chess and decided to build a simple chess game that can be played in the terminal. For this project I was focused on using the object oriented programming concepts we were learning in class to build a chess board simulation."
        },
        {
          title: "Mold Simulation",
          image: "Project2-Screenshot.jpg",
          link: "https://github.com/LucasCrampy/Final-Project-2.git",
          description: "This is my final project for my second Java class at Olympic College. Its a simple simulation of a mold that grows and spreads in a maze system. The project uses a simple path finding algorithm to determine how the mold spreads and interacts with the environment."
        }
      ]
    },
    photography: {
      id: "photography",
      icon: "camera",
      title: "Photography",
      color: "bg-purple-200 dark:bg-slate-800",
      headerTitle: "Photo Gallery",
      headerSubtitle: "Applying concepts of geometry, light, and composition outside of an academic setting.",
      images: Array.from({ length: 31 }, (_, i) => `WEBIMG${i + 1}.jpg`)
    },
    science: {
      id: "science",
      icon: "leaf",
      title: "Environmental Science",
      color: "bg-emerald-200 dark:bg-slate-800",
      headerTitle: "Environmental Science",
      headerSubtitle: "Exploring science and stewardship.",
      projects: [
        {
          title: "Passive Acoustic Monitoring",
          image: "AudioMoth-Diagram.jpg",
          paragraphs: [
            "I am building a passive acoustic monitoring device using an <strong>AudioMoth</strong> development board and modifications with parts from AliExpress. With the modifications I should have similary performance to much higher end devices of the same type.",
            "The objective is to deploy this device in the woods to collect raw audio data. Once collected, I will run the data through the Google's <strong>Perch model</strong> to identify bird calls and generate population estimates for local songbird species."
          ],
          status: "Deploying Spring 2026"
        },
        {
          title: "Sustainability Club",
          image: "sustainability-club.jpg",
          paragraphs: [
            "I am a member of the sustainability club at Olympic College, I collaborate with peers on plans aimed at reducing our campus environmental footprint and hosting awareness events."
          ],
          status: null
        }
      ]
    },
    accessibility: {
      id: "accessibility",
      icon: "lightbulb",
      title: "Future Projects",
      color: "bg-blue-200 dark:bg-slate-800",
      headerTitle: "Future Project Ideas",
      headerSubtitle: "Ideas I plan to tackle in the future, including accessible open-source software.",
      introParagraphs: [
        "These are some of my future project ideas I will start when I have the time.",
        "While I'm generally busy with school work, I think the best way to learn is to solve hard problems."
      ],
      footerText: "I will update this with new ideas when I get them.",
      projects: [
        {
          title: "Open Source Speech App",
          image: "char-lucas.jpg",
          paragraphs: [
            "My older sister, Charlotte, has cerebral palsy and is nonverbal. She communicates with a text to speech app on her iPad, and generally feels more comfortable communcating over text. The app she uses costs something like $100 and I thought that was a bit excessive for what it is. I think haveing an opensource alternitive would be great. I think it would be a fun project to refresh my coding skills and I could taylor make the app to meet my sisters needs. ",
          ],
          status: "In Planning Phase"
        }
      ]
    }
  }
};

const { siteContent: SITE_CONTENT, projectContent: PROJECT_CONTENT } = data;

// ==========================================
// ICON MAPPING DICTIONARY
// Translates the string in JSON (e.g. "calculator") to the React Component
// ==========================================
const ICON_MAP = {
  calculator: <Calculator size={32} />,
  code: <Code size={32} />,
  camera: <Camera size={32} />,
  leaf: <Leaf size={32} />,
  lightbulb: <Lightbulb size={32} />
};

// ==========================================
// SCROLL ANIMATION COMPONENT
// ==========================================
const RevealOnScroll = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// ==========================================
// INTERACTIVE CARD COMPONENT ("Photo Stack" Effect)
// Changed div to button for keyboard accessibility
// ==========================================
const ProjectCard = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`group relative z-0 hover:z-10 cursor-pointer border-4 border-black dark:border-slate-600 bg-white dark:bg-slate-800 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(2,6,23,1)] transform transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:-rotate-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(2,6,23,1)] outline outline-1 outline-transparent w-full text-left focus:outline-none focus:ring-4 focus:ring-yellow-400 ${className}`}
  >
    {children}
    <div className="absolute top-4 right-4 opacity-0 transition-opacity duration-500 group-hover:delay-1000 group-hover:opacity-100 text-slate-400 dark:text-slate-500 hidden sm:block" aria-hidden="true">
       <ArrowUpRight size={28} strokeWidth={2} />
    </div>
  </button>
);


export default function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [showFuture, setShowFuture] = useState(false);

  useEffect(() => {
    const handleScroll = () => requestAnimationFrame(() => setScrollY(window.scrollY));
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (activeProject || lightboxImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [activeProject, lightboxImage]);

  const openSingleProject = (category, projContent) => {
    setActiveProject({
      color: category.color,
      icon: ICON_MAP[category.icon],
      title: category.title,
      content: projContent
    });
  };

  const galleryContent = (
    <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
      {PROJECT_CONTENT.photography.images.map((src, idx) => (
        <button 
          key={idx} 
          onClick={() => setLightboxImage(src)}
          className="break-inside-avoid w-full block focus:outline-none focus:ring-4 focus:ring-yellow-400 rounded-sm"
          aria-label={`Open gallery image ${idx + 1}`}
        >
          <img 
            src={src} 
            alt={`Gallery view ${idx + 1}`} 
            loading="lazy"
            decoding="async"
            className="w-full h-auto border-4 border-black dark:border-slate-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(2,6,23,1)] transition-all cursor-zoom-in bg-slate-200 dark:bg-slate-900"
          />
        </button>
      ))}
    </div>
  );

  return (
    <div className="bg-[#fffdf5] dark:bg-slate-900 text-slate-900 dark:text-slate-200 font-sans min-h-screen selection:bg-yellow-200 dark:selection:bg-slate-700 relative overflow-x-hidden transition-colors duration-300">
      
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalPopUp {
          from { opacity: 0; transform: scale(0.95) translateY(15px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in {
          animation: modalFadeIn 0.3s ease-out forwards;
        }
        .animate-pop-up {
          animation: modalPopUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* LIGHTBOX OVERLAY */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 text-white hover:text-yellow-400 transition-colors p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-full"
            aria-label="Close fullscreen image"
          >
            <X size={48} strokeWidth={2} />
          </button>
          <img 
            src={lightboxImage} 
            alt="Enlarged gallery view" 
            className="max-w-full max-h-full object-contain border-4 border-white dark:border-slate-700 shadow-2xl animate-pop-up"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* DYNAMIC MODAL */}
      {activeProject && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6 bg-black/60 dark:bg-slate-900/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveProject(null)}
        >
          <div 
            className="w-full max-w-5xl max-h-[95vh] flex flex-col border-4 border-black dark:border-slate-600 bg-[#fffdf5] dark:bg-slate-900 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] dark:shadow-[16px_16px_0px_0px_rgba(2,6,23,1)] relative animate-pop-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`${activeProject.color} border-b-4 border-black dark:border-slate-600 p-4 md:p-6 flex items-center justify-between shrink-0`}>
              <div className="flex items-center gap-3 text-slate-900 dark:text-slate-200">
                {activeProject.icon}
                <span className="text-xl md:text-2xl font-black uppercase tracking-tighter [font-family:var(--font-blocky)]">
                  {activeProject.title}
                </span>
              </div>
              <button 
                onClick={() => setActiveProject(null)}
                className="bg-black dark:bg-slate-700 text-white dark:text-slate-200 hover:bg-yellow-400 dark:hover:bg-slate-600 hover:text-black dark:hover:text-white transition-colors border-4 border-black dark:border-slate-600 p-1.5 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] focus:outline-none focus:ring-4 focus:ring-yellow-400"
                aria-label="Close project details"
              >
                <X size={24} strokeWidth={4} />
              </button>
            </div>

            <div className="p-6 md:p-10 overflow-y-auto flex-grow custom-scrollbar">
              {activeProject.content}
            </div>
          </div>
        </div>
      )}

      {/* PERSISTENT NAV */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/90 backdrop-blur-md z-50 border-b-4 border-black dark:border-slate-600">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-black text-3xl border-4 border-black dark:border-slate-600 px-4 py-1 transform -rotate-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] outline outline-1 outline-transparent">LC</span>
          <a href="#contact" className="flex items-center gap-2 bg-yellow-400 dark:bg-slate-800 border-4 border-black dark:border-slate-600 hover:bg-yellow-500 dark:hover:bg-slate-700 text-black dark:text-slate-200 px-6 py-2 font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] focus:outline-none focus:ring-4 focus:ring-black dark:focus:ring-white">
            <Mail size={20} strokeWidth={3} /> CONTACT
          </a>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-12 overflow-hidden">
        {/* HERO SECTION */}
        <section className="min-h-[85vh] flex flex-col justify-center items-center text-center">
          <div className="flex flex-col items-center scale-110 md:scale-125 mb-12">
            <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter uppercase [font-family:var(--font-blocky)] text-slate-900 dark:text-slate-200">
              {SITE_CONTENT.hero.name}
            </h1>
            <div className="relative w-80 h-56 flex items-end justify-center">
              {/* Eager loaded intentionally since it is above the fold */}
              <img src={SITE_CONTENT.hero.profileImage} alt="Profile wave" className="relative z-10 w-full h-auto object-bottom" />
            </div>
          </div>
          
          <div className="transform rotate-1 bg-white dark:bg-slate-800 border-4 border-black dark:border-slate-600 p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(2,6,23,1)] outline outline-1 outline-transparent">
            <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight text-slate-900 dark:text-slate-200">
              STUDYING <span className="bg-blue-300 dark:bg-slate-700 px-4 py-1 outline-4 outline-black dark:outline-slate-500 outline text-slate-900 dark:text-blue-300 inline-block transform -rotate-2 outline-1 outline-transparent">{SITE_CONTENT.hero.major}</span>
            </h2>
            <p className="text-2xl font-bold text-slate-700 dark:text-slate-400 italic">
              {SITE_CONTENT.hero.tagline}
            </p>
          </div>

          <a href="#education" aria-label="Scroll to education section" className="animate-bounce text-black dark:text-slate-400 mt-16 focus:outline-none focus:ring-4 focus:ring-yellow-400 rounded-full">
            <ChevronDown size={56} strokeWidth={4} />
          </a>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education" className="py-24 border-t-8 border-black dark:border-slate-700 border-dotted">
          <div className="flex items-center gap-4 mb-12 transform -rotate-2 text-slate-900 dark:text-slate-200 bg-white dark:bg-slate-800 border-4 border-black dark:border-slate-600 p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(2,6,23,1)] w-fit outline outline-1 outline-transparent">
            <GraduationCap size={40} strokeWidth={3} />
            <h3 className="text-4xl font-black uppercase tracking-tighter [font-family:var(--font-blocky)]">My Education</h3>
          </div>
          
          <div className="flex flex-col gap-8">
            
            {/* Bachelor's Transfer */}
            <div className={`${SITE_CONTENT.education.transfer.bgClass} border-4 border-black dark:border-slate-600 p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between ${SITE_CONTENT.education.transfer.shadowClass} outline outline-1 outline-transparent`}>
              <div>
                <h4 className="text-2xl font-black uppercase text-slate-900 dark:text-slate-200 [font-family:var(--font-blocky)]">{SITE_CONTENT.education.transfer.school}</h4>
                <p className="font-bold text-slate-600 dark:text-slate-400">{SITE_CONTENT.education.transfer.description}</p>
              </div>
              <div className="text-left sm:text-right mt-4 sm:mt-0 shrink-0">
                <span className={`${SITE_CONTENT.education.transfer.badgeClass} text-xs font-black uppercase px-3 py-1 border-2 border-black dark:border-slate-600 block mb-2 w-fit sm:ml-auto`}>{SITE_CONTENT.education.transfer.badge}</span>
                <span className="font-black text-blue-600 dark:text-blue-400 tracking-widest">{SITE_CONTENT.education.transfer.date}</span>
              </div>
            </div>

            {/* Olympic College */}
            <div className={`${SITE_CONTENT.education.olympic.bgClass} border-4 border-black dark:border-slate-600 p-8 md:p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(2,6,23,1)] outline outline-1 outline-transparent`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                <div>
                  <h4 className="text-3xl md:text-4xl font-black uppercase text-slate-900 dark:text-slate-200 [font-family:var(--font-blocky)]">{SITE_CONTENT.education.olympic.school}</h4>
                </div>
                <div className="text-left sm:text-right mt-4 sm:mt-0 shrink-0">
                  <span className={`${SITE_CONTENT.education.olympic.badgeClass} text-xs font-black uppercase px-3 py-1 border-2 border-black dark:border-slate-600 block mb-2 w-fit sm:ml-auto`}>{SITE_CONTENT.education.olympic.badge}</span>
                  <span className="font-black text-amber-500 dark:text-yellow-400 tracking-widest">{SITE_CONTENT.education.olympic.date}</span>
                </div>
              </div>
              <p className="text-xl font-bold text-slate-700 dark:text-slate-400 mb-8 max-w-2xl">
                {SITE_CONTENT.education.olympic.description}
              </p>

              <div className="pt-6 border-t-4 border-black dark:border-slate-600 border-dashed flex flex-col lg:flex-row gap-8">
                {/* Math Track Pills */}
                <div className="flex-1">
                  <h5 className="font-black text-lg uppercase mb-3 text-slate-900 dark:text-slate-200">Math Track</h5>
                  <div className="flex flex-wrap gap-2">
                    {SITE_CONTENT.education.olympic.mathCourses.map((course, cIdx) => (
                      <span key={cIdx} className={`px-3 py-1 border-2 border-black dark:border-slate-600 text-sm font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(2,6,23,1)] ${
                        course.status === 'completed' ? 'bg-slate-300 dark:bg-slate-600 text-slate-800 dark:text-slate-200' :
                        course.status === 'current' ? 'bg-yellow-400 dark:bg-yellow-600 text-black dark:text-white' :
                        'bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100'
                      }`}>
                        {course.name}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Favorite Electives Pills */}
                <div className="flex-1">
                  <h5 className="font-black text-lg uppercase mb-3 text-slate-900 dark:text-slate-200">Favorite Electives</h5>
                  <div className="flex flex-wrap gap-2">
                    {SITE_CONTENT.education.olympic.otherCourses.map((courseName, cIdx) => (
                      <span key={cIdx} className="px-3 py-1 border-2 border-black dark:border-slate-600 bg-emerald-100 dark:bg-slate-700/80 text-emerald-900 dark:text-emerald-100 text-sm font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(2,6,23,1)]">
                        {courseName}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* High School */}
            <div className={`${SITE_CONTENT.education.highschool.bgClass} border-4 border-black dark:border-slate-600 p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(2,6,23,1)] outline outline-1 outline-transparent`}>
              <div>
                <h4 className="text-2xl font-black uppercase text-slate-900 dark:text-slate-200 [font-family:var(--font-blocky)]">{SITE_CONTENT.education.highschool.school}</h4>
              </div>
              <div className="text-left sm:text-right mt-4 sm:mt-0 shrink-0">
                <span className={`${SITE_CONTENT.education.highschool.badgeClass} text-xs font-black uppercase px-3 py-1 border-2 border-black dark:border-slate-600 block mb-2 w-fit sm:ml-auto`}>{SITE_CONTENT.education.highschool.badge}</span>
                <span className="font-black text-slate-500 dark:text-slate-400 tracking-widest">{SITE_CONTENT.education.highschool.date}</span>
              </div>
            </div>

          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-24 border-t-8 border-black dark:border-slate-700">
          <h3 className="text-5xl font-black uppercase mb-16 text-center tracking-tighter text-slate-900 dark:text-slate-200 [font-family:var(--font-blocky)]">What I'm Working On.</h3>

          <div className="space-y-20">
            
            {/* TABLE 1: MATHEMATICS */}
            <div className={`${PROJECT_CONTENT.math.color} border-4 border-black dark:border-slate-600 p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(2,6,23,1)]`}>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10 border-b-4 border-black dark:border-slate-600 pb-8">
                <div className="bg-white dark:bg-slate-900 p-4 border-4 border-black dark:border-slate-600 transform -rotate-3 shrink-0 outline outline-1 outline-transparent">
                  {ICON_MAP[PROJECT_CONTENT.math.icon]}
                </div>
                <div>
                  <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tight [font-family:var(--font-blocky)] text-slate-900 dark:text-slate-200">{PROJECT_CONTENT.math.headerTitle}</h4>
                  <p className="text-xl font-bold opacity-90 leading-snug text-slate-900 dark:text-slate-300 mt-2">{PROJECT_CONTENT.math.headerSubtitle}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PROJECT_CONTENT.math.projects.map((proj, idx) => (
                  <ProjectCard 
                    key={idx} 
                    onClick={() => openSingleProject(PROJECT_CONTENT.math, (
                      <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <h4 className="text-3xl font-black uppercase text-slate-900 dark:text-slate-200">{proj.title}</h4>
                          <a href={`/${proj.pdfLink}`} download className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest bg-yellow-400 dark:bg-slate-700 border-4 border-black dark:border-slate-600 px-6 py-3 hover:bg-black dark:hover:bg-slate-600 hover:text-white dark:hover:text-slate-200 transition-colors text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-4 focus:ring-black dark:focus:ring-white">
                            <Download size={18} strokeWidth={3} /> Download PDF
                          </a>
                        </div>
                        {proj.description && <p className="font-medium text-lg text-slate-700 dark:text-slate-400">{proj.description}</p>}
                        <div className="w-full h-[60vh] overflow-hidden border-4 border-black dark:border-slate-600 bg-slate-100 dark:bg-slate-900">
                          <iframe src={proj.pdfLink} className="w-full h-full" title={`PDF Viewer for ${proj.title}`}>
                            <p className="p-4 text-slate-900 dark:text-slate-200">Browser does not support PDFs.</p>
                          </iframe>
                        </div>
                      </div>
                    ))}
                    className="p-6 flex items-center justify-between"
                  >
                    <span className="font-black text-xl uppercase pr-10 text-slate-900 dark:text-slate-200">{proj.title}</span>
                    <span className="bg-red-100 dark:bg-slate-800 text-red-800 dark:text-red-300 text-xs font-black uppercase px-3 py-1 border-2 border-black dark:border-slate-600 shrink-0">View PDF</span>
                  </ProjectCard>
                ))}
              </div>
            </div>

            {/* TABLE 2: COMPUTERS */}
            <div className={`${PROJECT_CONTENT.computers.color} border-4 border-black dark:border-slate-600 p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(2,6,23,1)]`}>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10 border-b-4 border-black dark:border-slate-600 pb-8">
                <div className="bg-white dark:bg-slate-900 p-4 border-4 border-black dark:border-slate-600 transform rotate-2 shrink-0 outline outline-1 outline-transparent">
                  {ICON_MAP[PROJECT_CONTENT.computers.icon]}
                </div>
                <div>
                  <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tight [font-family:var(--font-blocky)] text-slate-900 dark:text-slate-200">{PROJECT_CONTENT.computers.headerTitle}</h4>
                  <p className="text-xl font-bold opacity-90 leading-snug text-slate-900 dark:text-slate-300 mt-2">{PROJECT_CONTENT.computers.headerSubtitle}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {PROJECT_CONTENT.computers.projects.map((proj, idx) => (
                  <ProjectCard 
                    key={idx}
                    onClick={() => openSingleProject(PROJECT_CONTENT.computers, (
                      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                        <div className="w-full lg:w-1/2 shrink-0">
                          <img src={proj.image} alt={proj.title} loading="lazy" decoding="async" className="w-full border-4 border-black dark:border-slate-600 object-cover bg-slate-100 dark:bg-slate-900" />
                        </div>
                        <div className="w-full lg:w-1/2 space-y-6">
                          <h4 className="text-3xl font-black uppercase text-slate-900 dark:text-slate-200">{proj.title}</h4>
                          <p className="font-medium text-lg text-slate-700 dark:text-slate-400 leading-relaxed">{proj.description}</p>
                          <a href={proj.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-black dark:bg-slate-700 text-white dark:text-slate-200 px-6 py-4 font-black uppercase tracking-widest hover:bg-blue-400 dark:hover:bg-slate-600 hover:text-black dark:hover:text-white transition-colors border-4 border-black dark:border-slate-600 focus:outline-none focus:ring-4 focus:ring-black dark:focus:ring-white">
                            View on GitHub <ExternalLink size={20} strokeWidth={3} />
                          </a>
                        </div>
                      </div>
                    ))}
                    className="p-6 flex flex-col justify-between"
                  >
                    <div className="w-full aspect-[4/3] border-4 border-black dark:border-slate-600 mb-5 overflow-hidden bg-slate-100 dark:bg-slate-900 shrink-0 relative">
                      <img 
                        src={proj.image} 
                        alt={proj.title} 
                        loading="lazy" 
                        decoding="async"
                        style={{ transform: `translateY(${(scrollY * 0.015) - 10}px) scale(1.15)` }}
                        className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply dark:mix-blend-normal" 
                      />
                    </div>
                    <h4 className="text-2xl font-black uppercase text-slate-900 dark:text-slate-200 pr-8">{proj.title}</h4>
                  </ProjectCard>
                ))}
              </div>
            </div>

            {/* TABLE 3: SCIENCE */}
            <div className={`${PROJECT_CONTENT.science.color} border-4 border-black dark:border-slate-600 p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(2,6,23,1)]`}>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10 border-b-4 border-black dark:border-slate-600 pb-8">
                <div className="bg-white dark:bg-slate-900 p-4 border-4 border-black dark:border-slate-600 transform -rotate-2 shrink-0 outline outline-1 outline-transparent">
                  {ICON_MAP[PROJECT_CONTENT.science.icon]}
                </div>
                <div>
                  <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tight [font-family:var(--font-blocky)] text-slate-900 dark:text-slate-200">{PROJECT_CONTENT.science.headerTitle}</h4>
                  <p className="text-xl font-bold opacity-90 leading-snug text-slate-900 dark:text-slate-300 mt-2">{PROJECT_CONTENT.science.headerSubtitle}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {PROJECT_CONTENT.science.projects.map((proj, idx) => (
                  <ProjectCard 
                    key={idx}
                    onClick={() => openSingleProject(PROJECT_CONTENT.science, (
                      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                        <div className="w-full lg:w-1/2 shrink-0">
                          <img src={proj.image} alt={proj.title} loading="lazy" decoding="async" className="w-full border-4 border-black dark:border-slate-600 object-cover bg-slate-100 dark:bg-slate-900" />
                        </div>
                        <div className="w-full lg:w-1/2 space-y-6 flex flex-col">
                          <h4 className="text-3xl font-black uppercase text-slate-900 dark:text-slate-200">{proj.title}</h4>
                          <div className="space-y-4 font-medium text-lg text-slate-700 dark:text-slate-400">
                            {proj.paragraphs?.map((para, pIdx) => (
                               <p key={pIdx} dangerouslySetInnerHTML={{ __html: para }}></p>
                            ))}
                          </div>
                          {proj.status && (
                            <div className="inline-block w-fit bg-yellow-400 dark:bg-slate-700 border-4 border-black dark:border-slate-600 p-4 mt-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(2,6,23,1)]">
                              <span className="font-black uppercase tracking-widest text-sm block mb-1 text-slate-900 dark:text-slate-300">Status</span>
                              <p className="font-bold text-2xl leading-none text-slate-900 dark:text-slate-200">{proj.status}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    className="p-6"
                  >
                    <div className="w-full aspect-[3174/2696] border-4 border-black dark:border-slate-600 mb-4 overflow-hidden shrink-0 relative bg-slate-100 dark:bg-slate-900">
                      <img 
                        src={proj.image} 
                        alt={proj.title} 
                        loading="lazy"
                        decoding="async"
                        style={{ transform: `translateY(${-(scrollY * 0.015)}px) scale(1.15)` }}
                        className="absolute inset-0 w-full h-full object-cover" 
                      />
                    </div>
                    <h4 className="text-2xl font-black uppercase text-slate-900 dark:text-slate-200 pr-8 relative z-10">{proj.title}</h4>
                  </ProjectCard>
                ))}
              </div>
            </div>

            {/* TABLE 4: PHOTOGRAPHY (5-Photo Spread) */}
            <div className={`${PROJECT_CONTENT.photography.color} border-4 border-black dark:border-slate-600 p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(2,6,23,1)]`}>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10 border-b-4 border-black dark:border-slate-600 pb-8">
                <div className="bg-white dark:bg-slate-900 p-4 border-4 border-black dark:border-slate-600 transform rotate-3 shrink-0 outline outline-1 outline-transparent">
                  {ICON_MAP[PROJECT_CONTENT.photography.icon]}
                </div>
                <div>
                  <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tight [font-family:var(--font-blocky)] text-slate-900 dark:text-slate-200">{PROJECT_CONTENT.photography.headerTitle}</h4>
                  <p className="text-xl font-bold opacity-90 leading-snug text-slate-900 dark:text-slate-300 mt-2">{PROJECT_CONTENT.photography.headerSubtitle}</p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-12 mt-4">
                
                {/* WIDENED 5-PHOTO STACK WITH FAN-OUT HOVER */}
                <button 
                  className="relative w-full max-w-2xl h-72 sm:h-80 lg:h-96 cursor-pointer group mx-auto mt-4 focus:outline-none focus:ring-4 focus:ring-yellow-400 border-none bg-transparent block"
                  onClick={() => openSingleProject(PROJECT_CONTENT.photography, galleryContent)}
                  aria-label="Open photo gallery"
                >
                  {/* Photo 1: Back Left (IMG4 - Portrait ~3:4) */}
                  <img 
                    src={PROJECT_CONTENT.photography.images[3]} 
                    alt="Gallery Preview 1"
                    loading="lazy" decoding="async"
                    className="absolute w-[25%] md:w-[22%] aspect-[3/4] object-cover left-[5%] md:left-[10%] top-[10%] border-4 border-black dark:border-slate-600 shadow-md transform -rotate-12 group-hover:-rotate-[20deg] group-hover:-translate-x-10 group-hover:-translate-y-4 transition-all duration-500 ease-out z-0 outline outline-1 outline-transparent"
                  />
                  
                  {/* Photo 2: Back Right (IMG5 - Portrait 2:3) */}
                  <img 
                    src={PROJECT_CONTENT.photography.images[4]} 
                    alt="Gallery Preview 2"
                    loading="lazy" decoding="async"
                    className="absolute w-[25%] md:w-[22%] aspect-[2/3] object-cover right-[5%] md:right-[10%] top-[5%] border-4 border-black dark:border-slate-600 shadow-md transform rotate-12 group-hover:rotate-[20deg] group-hover:translate-x-10 group-hover:-translate-y-4 transition-all duration-500 ease-out z-10 outline outline-1 outline-transparent"
                  />

                  {/* Photo 3: Middle Center (IMG3 - Portrait 2:3) */}
                  <img 
                    src={PROJECT_CONTENT.photography.images[2]} 
                    alt="Gallery Preview 3"
                    loading="lazy" decoding="async"
                    className="absolute w-[30%] aspect-[2/3] object-cover left-[35%] top-[0%] border-4 border-black dark:border-slate-600 shadow-lg transform rotate-2 group-hover:-translate-y-10 group-hover:scale-105 transition-all duration-500 ease-out z-20 outline outline-1 outline-transparent"
                  />

                  {/* Photo 4: Front Left (IMG1 - Landscape 3:2) */}
                  <img 
                    src={PROJECT_CONTENT.photography.images[0]} 
                    alt="Gallery Preview 4"
                    loading="lazy" decoding="async"
                    className="absolute w-[45%] md:w-[40%] aspect-[3/2] object-cover left-[10%] bottom-[5%] border-4 border-black dark:border-slate-600 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(2,6,23,1)] transform -rotate-6 group-hover:-rotate-12 group-hover:-translate-x-8 group-hover:translate-y-4 transition-all duration-500 ease-out z-30 outline outline-1 outline-transparent"
                  />

                  {/* Photo 5: Front Right (IMG2 - Square-ish 2000x2170) */}
                  <img 
                    src={PROJECT_CONTENT.photography.images[1]} 
                    alt="Gallery Preview 5"
                    loading="lazy" decoding="async"
                    className="absolute w-[38%] md:w-[35%] aspect-[2000/2170] object-cover right-[12%] bottom-[0%] border-4 border-black dark:border-slate-600 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(2,6,23,1)] transform rotate-6 group-hover:rotate-12 group-hover:translate-x-8 group-hover:translate-y-6 group-hover:scale-105 transition-all duration-500 ease-out z-40 outline outline-1 outline-transparent bg-slate-200"
                  />
                </button>

                <button 
                  onClick={() => openSingleProject(PROJECT_CONTENT.photography, galleryContent)}
                  className="group border-4 border-black dark:border-slate-600 px-8 py-4 uppercase font-black tracking-widest text-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(2,6,23,1)] hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(2,6,23,1)] hover:bg-black dark:hover:bg-slate-600 hover:text-white dark:hover:text-slate-200 transition-all flex items-center gap-3 outline outline-1 outline-transparent focus:outline-none focus:ring-4 focus:ring-yellow-400"
                >
                  View Full Gallery <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* TABLE 5: ACCESSIBILITY (Future Projects - Accordion Collapse) */}
            <div className={`${PROJECT_CONTENT.accessibility.color} border-4 border-black dark:border-slate-600 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(2,6,23,1)] transition-all duration-300`}>
              
              <button 
                onClick={() => setShowFuture(!showFuture)}
                className="w-full p-6 md:p-8 flex flex-row items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer text-left focus:outline-none focus:ring-4 focus:ring-yellow-400"
                aria-expanded={showFuture}
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="bg-white dark:bg-slate-900 p-3 border-4 border-black dark:border-slate-600 transform -rotate-3 shrink-0 outline outline-1 outline-transparent">
                    {ICON_MAP[PROJECT_CONTENT.accessibility.icon]}
                  </div>
                  <div>
                    <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tight [font-family:var(--font-blocky)] text-slate-900 dark:text-slate-200">
                      {PROJECT_CONTENT.accessibility.headerTitle}
                    </h4>
                    <p className="text-sm sm:text-base font-bold opacity-80 text-slate-900 dark:text-slate-300 mt-1 hidden sm:block">
                      {PROJECT_CONTENT.accessibility.headerSubtitle}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 p-2">
                  <ChevronDown size={32} strokeWidth={3} className={`transform transition-transform duration-300 text-slate-900 dark:text-slate-200 ${showFuture ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {showFuture && (
                <div className="p-6 md:p-8 border-t-4 border-black dark:border-slate-600 animate-fade-in">
                  <div className="space-y-4 text-xl font-medium text-slate-700 dark:text-slate-400 mb-8 max-w-3xl">
                    {PROJECT_CONTENT.accessibility.introParagraphs?.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                    <p>
                      <a href={`mailto:${SITE_CONTENT.contact.email}`} className="font-bold underline decoration-4 decoration-black dark:decoration-slate-400 underline-offset-4 hover:text-blue-600 transition-colors focus:outline-none focus:ring-4 focus:ring-yellow-400 rounded-sm">Email me</a> if you want to collaborate on any of these.
                    </p>
                  </div>

                  <div className="grid grid-cols-1">
                    {PROJECT_CONTENT.accessibility.projects.map((proj, idx) => (
                      <ProjectCard 
                        key={idx}
                        onClick={() => openSingleProject(PROJECT_CONTENT.accessibility, (
                          <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 items-start">
                            <img 
                              src={proj.image} 
                              alt={proj.title} 
                              loading="lazy" decoding="async"
                              className="w-32 h-32 sm:w-48 sm:h-48 shrink-0 border-4 border-black dark:border-slate-600 object-cover bg-slate-100 dark:bg-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(2,6,23,1)] outline outline-1 outline-transparent" 
                            />
                            <div className="space-y-4 font-medium text-lg text-slate-700 dark:text-slate-400 flex-1">
                              <h4 className="text-3xl font-black uppercase text-slate-900 dark:text-slate-200">{proj.title}</h4>
                              {proj.paragraphs?.map((para, pIdx) => (
                                 <p key={pIdx} dangerouslySetInnerHTML={{ __html: para }}></p>
                              ))}
                              {proj.status && (
                                <div className="inline-block w-fit bg-slate-200 dark:bg-slate-700 border-4 border-black dark:border-slate-600 p-4 mt-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(2,6,23,1)]">
                                  <span className="font-black uppercase tracking-widest text-sm block mb-1 text-slate-900 dark:text-slate-300">Status</span>
                                  <p className="font-bold text-2xl leading-none text-slate-900 dark:text-slate-200">{proj.status}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                        className="p-6 flex items-center justify-between"
                      >
                        <span className="font-black text-xl uppercase pr-10 text-slate-900 dark:text-slate-200">{proj.title}</span>
                        <span className="bg-blue-100 dark:bg-slate-800 text-blue-800 dark:text-blue-300 text-xs font-black uppercase px-3 py-1 border-2 border-black dark:border-slate-600 shrink-0">Read More</span>
                      </ProjectCard>
                    ))}
                  </div>
                  
                  {PROJECT_CONTENT.accessibility.footerText && (
                    <div className="pt-8 text-center">
                      <p className="text-xl font-bold text-slate-500 dark:text-slate-500">{PROJECT_CONTENT.accessibility.footerText}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </section>

        {/* BIO SECTION */}
        <section id="bio" className="py-24 border-t-8 border-black dark:border-slate-700">
          <h3 className="text-5xl font-black uppercase mb-12 tracking-tighter text-slate-900 dark:text-slate-200 [font-family:var(--font-blocky)]">About Me</h3>
          <div className="bg-white dark:bg-slate-800 border-4 border-black dark:border-slate-600 p-8 md:p-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] dark:shadow-[16px_16px_0px_0px_rgba(2,6,23,1)]">
            <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
              <div className="w-full md:w-1/3">
                <img 
                  src={SITE_CONTENT.bio.image} 
                  alt="Lucas Profile" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto border-4 border-black dark:border-slate-600 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(2,6,23,1)] object-cover aspect-square transform -rotate-2 outline outline-1 outline-transparent" 
                />
              </div>
              <div className="w-full md:w-2/3 flex flex-col justify-between h-full space-y-8">
                <div>
                  <h4 className="text-4xl font-black uppercase text-slate-900 dark:text-slate-200 mb-6 [font-family:var(--font-blocky)]">{SITE_CONTENT.bio.title}</h4>
                  <p className="text-xl font-bold text-slate-700 dark:text-slate-400 leading-relaxed">
                    {SITE_CONTENT.bio.text}
                  </p>
                  
                  {/* Your primary links */}
                  <div className="flex flex-wrap gap-4 pt-8">
                    <a href={SITE_CONTENT.bio.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-blue-500 dark:bg-blue-600 text-white px-8 py-4 font-black uppercase tracking-widest border-4 border-black dark:border-slate-600 hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(2,6,23,1)] hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-black dark:focus:ring-white">
                      <Linkedin size={20} strokeWidth={3} /> LinkedIn
                    </a>
                    <a href={SITE_CONTENT.bio.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-slate-900 dark:bg-slate-700 text-white px-8 py-4 font-black uppercase tracking-widest border-4 border-black dark:border-slate-600 hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(2,6,23,1)] hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-yellow-400">
                      <Github size={20} strokeWidth={3} /> GitHub
                    </a>
                  </div>
                </div>

                {/* Sister's Callout Box */}
                <div className="bg-yellow-100 dark:bg-slate-700 border-4 border-black dark:border-slate-600 p-6 mt-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(2,6,23,1)] transform rotate-1 outline outline-1 outline-transparent flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <img 
                    src={SITE_CONTENT.bio.sisterImage} 
                    alt="Sister Profile" 
                    loading="lazy"
                    decoding="async"
                    className="w-20 h-20 border-4 border-black dark:border-slate-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] object-cover bg-white shrink-0" 
                  />
                  <div>
                    <p className="font-bold text-lg text-slate-900 dark:text-slate-200 mb-4">{SITE_CONTENT.bio.sisterText}</p>
                    <div className="flex gap-6">
                      <a href={SITE_CONTENT.bio.sisterLinkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-black uppercase text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors underline decoration-4 underline-offset-4 focus:outline-none focus:ring-4 focus:ring-black dark:focus:ring-white rounded-sm">
                        <Linkedin size={18} strokeWidth={3} /> LinkedIn
                      </a>
                      <a href={SITE_CONTENT.bio.sisterGithub} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-black uppercase text-slate-900 dark:text-slate-300 hover:text-slate-600 dark:hover:text-white transition-colors underline decoration-4 underline-offset-4 focus:outline-none focus:ring-4 focus:ring-black dark:focus:ring-white rounded-sm">
                        <Github size={18} strokeWidth={3} /> GitHub
                      </a>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </section>

        {/* WORK EXPERIENCE SECTION */}
        <section id="work" className="py-24 border-t-8 border-black dark:border-slate-700 border-dotted">
          <h3 className="text-5xl font-black uppercase mb-12 tracking-tighter text-slate-900 dark:text-slate-200 [font-family:var(--font-blocky)]">Experience</h3>
          <div className="border-4 border-black dark:border-slate-600 bg-white dark:bg-slate-800 overflow-hidden shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] dark:shadow-[16px_16px_0px_0px_rgba(2,6,23,1)]">
            <table className="w-full text-left font-bold text-xl text-slate-900 dark:text-slate-200">
              <thead>
                <tr className="bg-black dark:bg-slate-700 text-white border-b-4 border-black dark:border-slate-600">
                  <th className="p-8 font-black tracking-widest uppercase">ROLE</th>
                  <th className="p-8 text-right font-black tracking-widest uppercase">YEAR</th>
                </tr>
              </thead>
              <tbody className="divide-y-4 divide-black dark:divide-slate-600">
                {SITE_CONTENT.experience.map((job, idx) => (
                  <tr key={idx} className="hover:bg-yellow-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-8">{job.role}</td>
                    <td className="p-8 text-right font-black">{job.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-32 text-center">
          <div className="inline-block border-4 border-black dark:border-slate-600 p-16 bg-yellow-400 dark:bg-slate-800 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] dark:shadow-[20px_20px_0px_0px_rgba(2,6,23,1)] transform -rotate-1 outline outline-1 outline-transparent">
            <h3 className="text-6xl font-black uppercase mb-6 tracking-tighter text-slate-900 dark:text-slate-200 [font-family:var(--font-blocky)]">Let's Connect</h3>
            <p className="text-2xl font-bold mb-12 max-w-md mx-auto text-slate-900 dark:text-slate-400">{SITE_CONTENT.contact.tagline}</p>
            <a 
              href={`mailto:${SITE_CONTENT.contact.email}`} 
              className="bg-black dark:bg-slate-700 text-white dark:text-slate-200 text-2xl font-black px-16 py-6 uppercase tracking-widest hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors inline-flex items-center gap-4 border-4 border-black dark:border-slate-600 hover:scale-105 active:scale-95 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] focus:outline-none focus:ring-4 focus:ring-black dark:focus:ring-white"
            >
              <Mail size={28} strokeWidth={3} /> Send Email
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}