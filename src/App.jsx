import React, { useState, useEffect } from 'react';
import { Mail, ChevronDown, BookOpen, Code, Camera, Leaf, Accessibility, GraduationCap, Briefcase, Calculator, X, ExternalLink, Download } from 'lucide-react';

// ==========================================
// 1. SITE CONFIGURATION & TEXT CONTENT
// ==========================================

const SITE_CONTENT = {
  hero: {
    name: "LUCAS CRAMPTON",
    major: "APPLIED MATH",
    tagline: '"A student at Olympic College."',
    profileImage: "Wave.gif"
  },
  contact: {
    tagline: "Email me any time!",
    email: "lucaschioinocrampton@gmail.com"
  },
  education: [
    {
      date: "Est. late 2026 - early 2027",
      school: "Bachelor's Transfer",
      description: "I plan on transferring into an Bachelor's program in Mathmatics or Applied Mathematics.",
      bgClass: "bg-white dark:bg-slate-800",
      textAccentClass: "text-blue-600 dark:text-blue-400",
      shadowColor: "rgba(59,130,246,1)", 
      darkShadowColor: "rgba(2,6,23,1)", // slate-950
      rotation: "rotate-1"
    },
    {
      date: "Jan 2025 - Present",
      school: "Olympic College",
      description: "Currently on track to complete my Associate's degree. Focusing on challenging myself, pursuing my academic interests and learning new things.",
      bgClass: "bg-blue-100 dark:bg-slate-800",
      textAccentClass: "text-blue-700 dark:text-blue-400",
      shadowColor: "rgba(0,0,0,1)", 
      darkShadowColor: "rgba(2,6,23,1)", 
      rotation: "-rotate-1"
    },
    {
      date: "Summer 2023",
      school: "Eagle Harbor High School",
      description: "Graduated.",
      bgClass: "bg-white dark:bg-slate-800",
      textAccentClass: "text-slate-500 dark:text-slate-400",
      shadowColor: "rgba(0,0,0,1)", 
      darkShadowColor: "rgba(2,6,23,1)", 
      rotation: "rotate-1"
    }
  ],
  experience: [
    { role: "Freelance IT", year: "2025" },
    { role: "Carpentry Apprentice", year: "2025" },
    { role: "Mouse Magic Toys", year: "2024" },
    { role: "Docs Marina Grill", year: "2023" }
  ]
};

const photoGallery = Array.from({ length: 28 }, (_, i) => `WEBIMG${i + 1}.jpg`);

export default function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    if (activeProject || lightboxImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [activeProject, lightboxImage]);

  // ==========================================
  // 2. MODAL CONTENT (PROJECTS)
  // ==========================================
  const projectsData = [
    {
      id: "math",
      icon: <Calculator size={32}/>, 
      title: "Mathematics", 
      color: "bg-red-200 dark:bg-slate-800",
      summary: "These are a few of the projects I've worked on in class. I will update this section with more projects as I complete them.",
      modalContent: (
        <div className="space-y-12 max-w-5xl mx-auto">
          <div>
            <p className="text-3xl font-black uppercase tracking-tight mb-2 text-slate-900 dark:text-slate-200">Applied Math Projects</p>
            <p className="text-xl font-medium text-slate-700 dark:text-slate-400">Mathematical modeling and logic-based problems from my coursework at Olympic College, typeset in LaTeX.</p>
          </div>
          
          <div className="border-4 border-black dark:border-slate-600 p-6 bg-white dark:bg-slate-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(2,6,23,1)]">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-2xl font-black uppercase text-slate-900 dark:text-slate-200">Project 1: The Bug Problem</h4>
              <a href="/final_final.pdf" download className="flex items-center gap-2 text-sm font-bold uppercase bg-yellow-400 dark:bg-slate-700 border-2 border-black dark:border-slate-600 px-4 py-2 hover:bg-black dark:hover:bg-slate-600 hover:text-white dark:hover:text-slate-200 transition-colors text-slate-900 dark:text-slate-200">
                <Download size={16} /> Download PDF
              </a>
            </div>
            <p className="font-medium text-slate-700 dark:text-slate-400 mb-6">
              A Calculus 3 project analyzing the trajectory of four bugs chasing each other in a square formation. The solution explores both polar coordinate differential equations and limits of geometric series.
            </p>
            <div className="w-full h-[60vh] border-4 border-black dark:border-slate-600 bg-slate-100 dark:bg-slate-900 relative">
              <iframe src="final_final.pdf" className="w-full h-full absolute inset-0" title="The Bug Problem PDF">
                <p className="p-4 text-slate-900 dark:text-slate-200">Your browser does not support PDFs. <a href="/final_final.pdf" className="underline text-blue-600 dark:text-blue-400">Download the PDF</a>.</p>
              </iframe>
            </div>
          </div>

          <div className="border-4 border-black dark:border-slate-600 p-6 bg-white dark:bg-slate-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(2,6,23,1)]">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-2xl font-black uppercase text-slate-900 dark:text-slate-200">Project Title 2</h4>
              <a href="/your-math-project-2.pdf" download className="flex items-center gap-2 text-sm font-bold uppercase bg-yellow-400 dark:bg-slate-700 border-2 border-black dark:border-slate-600 px-4 py-2 hover:bg-black dark:hover:bg-slate-600 hover:text-white dark:hover:text-slate-200 transition-colors text-slate-900 dark:text-slate-200">
                <Download size={16} /> Download PDF
              </a>
            </div>
            <div className="w-full h-[60vh] border-4 border-black dark:border-slate-600 bg-slate-100 dark:bg-slate-900 relative">
              <iframe src="your-math-project-2.pdf" className="w-full h-full absolute inset-0" title="Math Project 2"></iframe>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "computers",
      icon: <Code size={32}/>, 
      title: "Computers", 
      color: "bg-emerald-200 dark:bg-slate-800",
      summary: "Learning how to build software as well as use it.",
      modalContent: (
        <div className="space-y-12 max-w-5xl mx-auto">
          <div>
            <p className="text-3xl font-black uppercase tracking-tight mb-2 text-slate-900 dark:text-slate-200">Programming & Software</p>
            <p className="text-xl font-medium text-slate-700 dark:text-slate-400">Showcasing backend logic and applications built with Java.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-4 border-black dark:border-slate-600 p-6 bg-white dark:bg-slate-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(2,6,23,1)] flex flex-col">
              <h4 className="text-2xl font-black uppercase mb-4 text-slate-900 dark:text-slate-200">Terminal Application</h4>
              <img src="Project1-Screenshot.png" alt="TUI App Screenshot" className="w-full h-auto border-4 border-black dark:border-slate-600 mb-6 object-cover aspect-video bg-slate-100 dark:bg-slate-900" />
              <p className="font-medium text-slate-700 dark:text-slate-400 mb-6 flex-grow">
                A Terminal User Interface (TUI) application written in Java. This project demonstrates object-oriented design, logic processing, and console-based interaction.
              </p>
              <a href="https://github.com/LucasCrampy/FirstProject_SimpleChessJava" target="_blank" rel="noreferrer" className="flex justify-center items-center gap-2 bg-black dark:bg-slate-700 text-white dark:text-slate-200 px-4 py-3 font-black uppercase tracking-widest hover:bg-emerald-400 dark:hover:bg-slate-600 hover:text-black dark:hover:text-white transition-colors border-4 border-black dark:border-slate-600">
                View on GitHub <ExternalLink size={18} strokeWidth={3} />
              </a>
            </div>

            <div className="border-4 border-black dark:border-slate-600 p-6 bg-white dark:bg-slate-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(2,6,23,1)] flex flex-col">
              <h4 className="text-2xl font-black uppercase mb-4 text-slate-900 dark:text-slate-200">Java Project 2</h4>
              <img src="Project2-Screenshot.png" alt="Java App Screenshot" className="w-full h-auto border-4 border-black dark:border-slate-600 mb-6 object-cover aspect-video bg-slate-100 dark:bg-slate-900" />
              <p className="font-medium text-slate-700 dark:text-slate-400 mb-6 flex-grow">
                A brief description of your second Java project. Explain what problem it solves and what concepts you used to build it.
              </p>
              <a href="https://github.com/LucasCrampy/Final-Project-2.git" target="_blank" rel="noreferrer" className="flex justify-center items-center gap-2 bg-black dark:bg-slate-700 text-white dark:text-slate-200 px-4 py-3 font-black uppercase tracking-widest hover:bg-emerald-400 dark:hover:bg-slate-600 hover:text-black dark:hover:text-white transition-colors border-4 border-black dark:border-slate-600">
                View on GitHub <ExternalLink size={18} strokeWidth={3} />
              </a>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "photography",
      icon: <Camera size={32}/>, 
      title: "Photography", 
      color: "bg-purple-200 dark:bg-slate-800",
      summary: "A hobby I have had for a long time.",
      modalContent: (
        <div className="space-y-10 max-w-6xl mx-auto">
          <div>
            <p className="text-3xl font-black uppercase tracking-tight mb-2 text-slate-900 dark:text-slate-200">Photo Gallery</p>
            <p className="text-xl font-medium text-slate-700 dark:text-slate-400">Applying concepts of geometry, light, and composition outside of an academic setting. Click any image to enlarge.</p>
          </div>
          
          <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
            {photoGallery.map((src, idx) => (
              <div key={idx} className="break-inside-avoid">
                <img 
                  src={src} 
                  alt={`Gallery image ${idx + 1}`} 
                  loading="lazy"
                  onClick={() => setLightboxImage(src)}
                  className="w-full h-auto border-4 border-black dark:border-slate-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(2,6,23,1)] transition-all cursor-zoom-in bg-slate-200 dark:bg-slate-900"
                />
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "science",
      icon: <BookOpen size={32}/>, 
      title: "Science", 
      color: "bg-blue-200 dark:bg-slate-800",
      summary: "I have always been fascinated by the natural sciences. Recently I have been trying to find ways to combine this interest with the skills I am learning in school.",
      modalContent: (
        <div className="space-y-8 max-w-5xl mx-auto">
          <div>
            <p className="text-3xl font-black uppercase tracking-tight mb-2 text-slate-900 dark:text-slate-200">Scientific Exploration</p>
            <p className="text-xl font-medium text-slate-700 dark:text-slate-400">Tying my mathematical background to my passion for environmentalism.</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 border-4 border-black dark:border-slate-600 p-6 md:p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(2,6,23,1)]">
            <div className="flex flex-col md:flex-row gap-10 items-start">
              
              <div className="w-full md:w-5/12">
                <img 
                  src="https://placehold.co/600x600/e2e8f0/64748b?text=AudioMoth+Device" 
                  alt="AudioMoth Device Build" 
                  className="w-full h-auto border-4 border-black dark:border-slate-600 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(2,6,23,1)] object-cover aspect-square" 
                />
              </div>
              
              <div className="w-full md:w-7/12 space-y-6">
                <h4 className="text-4xl font-black uppercase tracking-tight leading-none text-slate-900 dark:text-slate-200">Passive Acoustic Monitoring</h4>
                
                <div className="space-y-4 text-xl font-medium text-slate-700 dark:text-slate-400 leading-relaxed">
                  <p>
                    I am building a passive acoustic monitoring device using an <strong>AudioMoth</strong> development board and custom parts sourced from AliExpress.
                  </p>
                  <p>
                    The objective is to deploy this device in the field to collect raw audio data. Once collected, I will run the data through the <strong>Perch model</strong> to identify bird calls and generate accurate population estimates for local songbird species.
                  </p>
                </div>
                
                <div className="inline-block bg-yellow-400 dark:bg-slate-700 border-4 border-black dark:border-slate-600 p-4 mt-4 transform rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(2,6,23,1)]">
                  <span className="font-black uppercase tracking-widest text-sm block mb-1 text-slate-900 dark:text-slate-300">Status</span>
                  <p className="font-bold text-2xl leading-none text-slate-900 dark:text-slate-200">Deploying Spring 2026</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-[#fffdf5] dark:bg-slate-900 text-slate-900 dark:text-slate-200 font-sans min-h-screen selection:bg-yellow-200 dark:selection:bg-slate-700 relative transition-colors duration-300">
      
      {/* LIGHTBOX OVERLAY */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 text-white hover:text-yellow-400 transition-colors p-2"
          >
            <X size={48} strokeWidth={2} />
          </button>
          <img 
            src={lightboxImage} 
            alt="Enlarged gallery view" 
            className="max-w-full max-h-full object-contain border-4 border-white dark:border-slate-700 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* MODAL WINDOW */}
      {activeProject && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6 bg-black/60 dark:bg-slate-900/80 backdrop-blur-sm"
          onClick={() => setActiveProject(null)}
        >
          <div 
            className={`w-full max-w-7xl h-[95vh] flex flex-col border-4 border-black dark:border-slate-600 bg-[#fffdf5] dark:bg-slate-900 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] dark:shadow-[16px_16px_0px_0px_rgba(2,6,23,1)] relative animate-in fade-in zoom-in-95 duration-200`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`${activeProject.color} border-b-4 border-black dark:border-slate-600 p-6 md:p-10 flex items-center justify-between shrink-0`}>
              <div className="flex items-center gap-4 text-slate-900 dark:text-slate-200">
                {activeProject.icon}
                <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                  {activeProject.title}
                </h3>
              </div>
              <button 
                onClick={() => setActiveProject(null)}
                className="bg-black dark:bg-slate-700 text-white dark:text-slate-200 hover:bg-yellow-400 dark:hover:bg-slate-600 hover:text-black dark:hover:text-white transition-colors border-4 border-black dark:border-slate-600 p-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
              >
                <X size={32} strokeWidth={4} />
              </button>
            </div>

            <div className="p-6 md:p-12 overflow-y-auto flex-grow custom-scrollbar bg-[#fffdf5] dark:bg-slate-900">
              {activeProject.modalContent}
            </div>
          </div>
        </div>
      )}

      {/* PERSISTENT NAV */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/90 backdrop-blur-md z-50 border-b-4 border-black dark:border-slate-600">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-black text-3xl border-4 border-black dark:border-slate-600 px-3 py-1 transform -rotate-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200">LC</span>
          <a href="#contact" className="flex items-center gap-2 bg-yellow-400 dark:bg-slate-800 border-4 border-black dark:border-slate-600 hover:bg-yellow-500 dark:hover:bg-slate-700 text-black dark:text-slate-200 px-6 py-2 font-black transition-all hover:scale-110 active:scale-95 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(2,6,23,1)]">
            <Mail size={20} strokeWidth={3} /> CONTACT
          </a>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-12">
        {/* HERO SECTION */}
        <section className="min-h-[85vh] flex flex-col justify-center items-center text-center">
          <div className="flex flex-col items-center scale-110 md:scale-125 mb-12">
            <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter uppercase [font-family:var(--font-blocky)] text-slate-900 dark:text-slate-200">
              {SITE_CONTENT.hero.name}
            </h1>
            <div className="relative w-80 h-56 flex items-end justify-center">
              <img src={SITE_CONTENT.hero.profileImage} alt="Profile wave" className="relative z-10 w-full h-auto object-bottom" />
            </div>
          </div>
          
          <div className="transform rotate-1">
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-slate-900 dark:text-slate-200">
              STUDYING <span className="bg-blue-300 dark:bg-slate-800 px-3 outline-4 outline-black dark:outline-slate-600 outline text-slate-900 dark:text-blue-400">{SITE_CONTENT.hero.major}</span>
            </h2>
            <p className="text-2xl font-bold text-slate-700 dark:text-slate-400 italic max-w-xl mx-auto mb-12">
              {SITE_CONTENT.hero.tagline}
            </p>
          </div>

          <a href="#education" className="animate-bounce text-black dark:text-slate-400 mt-4">
            <ChevronDown size={64} strokeWidth={4} />
          </a>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education" className="py-24 border-t-8 border-black dark:border-slate-700 border-dotted">
          <div className="flex items-center gap-4 mb-16 transform -rotate-2 text-slate-900 dark:text-slate-200">
            < GraduationCap size={48} strokeWidth={3} />
            <h3 className="text-5xl font-black uppercase tracking-tighter">My Education</h3>
          </div>
          
          <div className="space-y-16">
            {SITE_CONTENT.education.map((edu, idx) => (
              <div key={idx} className={`${edu.bgClass} border-4 border-black dark:border-slate-600 p-8 shadow-[12px_12px_0px_0px_${edu.shadowColor}] dark:shadow-[12px_12px_0px_0px_${edu.darkShadowColor}] transform ${edu.rotation} hover:rotate-0 transition-transform`}>
                <span className={`font-black ${edu.textAccentClass} text-xl uppercase tracking-widest`}>{edu.date}</span>
                <h4 className="text-3xl font-black mt-2 uppercase text-slate-900 dark:text-slate-200">{edu.school}</h4>
                <p className="mt-4 text-xl font-bold text-slate-600 dark:text-slate-400">
                  {edu.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-24 border-t-8 border-black dark:border-slate-700">
          <h3 className="text-5xl font-black uppercase mb-16 text-center tracking-tighter text-slate-900 dark:text-slate-200">What I'm Working On.</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projectsData.map((item, i) => (
              <button 
                key={i} 
                onClick={() => setActiveProject(item)}
                className={`${item.color} text-left border-4 border-black dark:border-slate-600 p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(2,6,23,1)] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(2,6,23,1)] transition-all group`}
              >
                <div className="flex items-center gap-4 mb-6 text-slate-900 dark:text-slate-200">
                  <div className="transform group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h4 className="text-3xl font-black uppercase tracking-tight">{item.title}</h4>
                </div>
                <p className="text-lg font-bold opacity-80 leading-snug text-slate-900 dark:text-slate-300">{item.summary}</p>
                
                <div className="mt-8 inline-flex items-center gap-2 font-black uppercase text-sm bg-black dark:bg-slate-700 text-white dark:text-slate-200 px-4 py-2 border-2 border-black dark:border-slate-600 group-hover:bg-white dark:group-hover:bg-slate-600 group-hover:text-black dark:group-hover:text-white transition-colors">
                  Open Section
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* WORK EXPERIENCE SECTION */}
        <section id="work" className="py-24 border-t-8 border-black dark:border-slate-700 border-dotted">
          <h3 className="text-5xl font-black uppercase mb-12 tracking-tighter text-slate-900 dark:text-slate-200">Experience</h3>
          <div className="border-4 border-black dark:border-slate-600 bg-white dark:bg-slate-800 overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(2,6,23,1)] transform rotate-1">
            <table className="w-full text-left font-black text-xl text-slate-900 dark:text-slate-200">
              <thead>
                <tr className="bg-black dark:bg-slate-700 text-white border-b-4 border-black dark:border-slate-600">
                  <th className="p-6">ROLE</th>
                  <th className="p-6 text-right">YEAR</th>
                </tr>
              </thead>
              <tbody className="divide-y-4 divide-black dark:divide-slate-600">
                {SITE_CONTENT.experience.map((job, idx) => (
                  <tr key={idx} className="hover:bg-yellow-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-6">{job.role}</td>
                    <td className="p-6 text-right">{job.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-32 text-center">
          <div className="inline-block border-8 border-black dark:border-slate-600 p-12 bg-yellow-400 dark:bg-slate-800 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] dark:shadow-[16px_16px_0px_0px_rgba(2,6,23,1)] transform -rotate-1">
            <h3 className="text-6xl font-black uppercase mb-6 tracking-tighter text-slate-900 dark:text-slate-200">Let's Connect</h3>
            <p className="text-2xl font-bold mb-10 max-w-md mx-auto text-slate-900 dark:text-slate-400">{SITE_CONTENT.contact.tagline}</p>
            <a 
              href={`mailto:${SITE_CONTENT.contact.email}`} 
              className="bg-black dark:bg-slate-700 text-white dark:text-slate-200 text-2xl font-black px-12 py-5 uppercase tracking-widest hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors inline-block border-4 border-transparent dark:border-slate-600"
            >
              Send Email
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}