import React, { useState, useEffect } from 'react';
import { Mail, ChevronDown, BookOpen, Code, Camera, Leaf, Accessibility, GraduationCap, Briefcase, Calculator, X, ExternalLink, Download } from 'lucide-react';

export default function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  // Prevent background scrolling when a modal or lightbox is open
  useEffect(() => {
    if (activeProject || lightboxImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [activeProject, lightboxImage]);

  // Dynamically generate the array of 28 image paths
  // Adjust the string literal if your files are named "WebImage" instead of "WEBIMG"
  const photoGallery = Array.from({ length: 28 }, (_, i) => `WEBIMG${i + 1}.jpg`);

  const projectsData = [
    {
      id: "math",
      icon: <Calculator size={32}/>, 
      title: "Mathematics", 
      color: "bg-red-200",
      summary: "Exploring applied math concepts and visualizing complex systems.",
      modalContent: (
        <div className="space-y-12 max-w-5xl mx-auto">
          <div>
            <p className="text-3xl font-black uppercase tracking-tight mb-2">Applied Math Projects</p>
            <p className="text-xl font-medium text-slate-700">Mathematical modeling and logic-based problems from my coursework at Olympic College, typeset in LaTeX.</p>
          </div>
          
          <div className="border-4 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-2xl font-black uppercase">Project 1: The Bug Problem</h4>
              <a href="/final_final.pdf" download className="flex items-center gap-2 text-sm font-bold uppercase bg-yellow-400 border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors">
                <Download size={16} /> Download PDF
              </a>
            </div>
            <p className="font-medium text-slate-700 mb-6">
              A Calculus 3 project analyzing the trajectory of four bugs chasing each other in a square formation. The solution explores both polar coordinate differential equations and limits of geometric series.
            </p>
            <div className="w-full h-[60vh] border-4 border-black bg-slate-100 relative">
              <iframe 
                src="final_final.pdf" 
                className="w-full h-full absolute inset-0"
                title="The Bug Problem PDF"
              >
                <p className="p-4">Your browser does not support PDFs. <a href="/final_final.pdf" className="underline text-blue-600">Download the PDF</a>.</p>
              </iframe>
            </div>
          </div>

          <div className="border-4 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-2xl font-black uppercase">Project Title 2</h4>
              <a href="/your-math-project-2.pdf" download className="flex items-center gap-2 text-sm font-bold uppercase bg-yellow-400 border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors">
                <Download size={16} /> Download PDF
              </a>
            </div>
            <div className="w-full h-[60vh] border-4 border-black bg-slate-100 relative">
              <iframe 
                src="your-math-project-2.pdf" 
                className="w-full h-full absolute inset-0"
                title="Math Project 2"
              ></iframe>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "computers",
      icon: <Code size={32}/>, 
      title: "Computers", 
      color: "bg-emerald-200",
      summary: "Building logical frameworks, software, and freelance IT solutions.",
      modalContent: (
        <div className="space-y-12 max-w-5xl mx-auto">
          <div>
            <p className="text-3xl font-black uppercase tracking-tight mb-2">Programming & Software</p>
            <p className="text-xl font-medium text-slate-700">Showcasing backend logic and applications built with Java.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-4 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col">
              <h4 className="text-2xl font-black uppercase mb-4">Terminal Application</h4>
              <img src="Project1-Screenshot.png" alt="TUI App Screenshot" className="w-full h-auto border-4 border-black mb-6 object-cover aspect-video" />
              <p className="font-medium text-slate-700 mb-6 flex-grow">
                A Terminal User Interface (TUI) application written in Java. This project demonstrates object-oriented design, logic processing, and console-based interaction.
              </p>
              <a href="https://github.com/LucasCrampy/FirstProject_SimpleChessJava" target="_blank" rel="noreferrer" className="flex justify-center items-center gap-2 bg-black text-white px-4 py-3 font-black uppercase tracking-widest hover:bg-emerald-400 hover:text-black transition-colors border-4 border-black">
                View on GitHub <ExternalLink size={18} strokeWidth={3} />
              </a>
            </div>

            <div className="border-4 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col">
              <h4 className="text-2xl font-black uppercase mb-4">Java Project 2</h4>
              <img src="Project2-Screenshot.png" alt="Java App Screenshot" className="w-full h-auto border-4 border-black mb-6 object-cover aspect-video" />
              <p className="font-medium text-slate-700 mb-6 flex-grow">
                A brief description of your second Java project. Explain what problem it solves and what concepts you used to build it.
              </p>
              <a href="https://github.com/LucasCrampy/Final-Project-2.git" target="_blank" rel="noreferrer" className="flex justify-center items-center gap-2 bg-black text-white px-4 py-3 font-black uppercase tracking-widest hover:bg-emerald-400 hover:text-black transition-colors border-4 border-black">
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
      color: "bg-purple-200",
      summary: "Viewing the world through creative lenses and geometry.",
      modalContent: (
        <div className="space-y-10 max-w-6xl mx-auto">
          <div>
            <p className="text-3xl font-black uppercase tracking-tight mb-2">Photo Gallery</p>
            <p className="text-xl font-medium text-slate-700">Applying concepts of geometry, light, and composition outside of an academic setting. Click any image to enlarge.</p>
          </div>
          
          {/* Masonry Layout Grid */}
          <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
            {photoGallery.map((src, idx) => (
              <div key={idx} className="break-inside-avoid">
                <img 
                  src={src} 
                  alt={`Gallery image ${idx + 1}`} 
                  loading="lazy"
                  onClick={() => setLightboxImage(src)}
                  className="w-full h-auto border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all cursor-zoom-in bg-slate-200"
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
      color: "bg-blue-200",
      summary: "Connecting mathematical theory to environmentalism and the physical world.",
      modalContent: (
        <div className="space-y-8 max-w-5xl mx-auto">
          <div>
            <p className="text-3xl font-black uppercase tracking-tight mb-2">Scientific Exploration</p>
            <p className="text-xl font-medium text-slate-700">Tying my mathematical background to my passion for environmentalism.</p>
          </div>
          
          <div className="bg-white border-4 border-black p-6 md:p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-col md:flex-row gap-10 items-start">
              
              <div className="w-full md:w-5/12">
                <img 
                  src="https://placehold.co/600x600/e2e8f0/64748b?text=AudioMoth+Device" 
                  alt="AudioMoth Device Build" 
                  className="w-full h-auto border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] object-cover aspect-square" 
                />
              </div>
              
              <div className="w-full md:w-7/12 space-y-6">
                <h4 className="text-4xl font-black uppercase tracking-tight leading-none">Passive Acoustic Monitoring</h4>
                
                <div className="space-y-4 text-xl font-medium text-slate-700 leading-relaxed">
                  <p>
                    I am building a passive acoustic monitoring device using an <strong>AudioMoth</strong> development board and custom parts sourced from AliExpress.
                  </p>
                  <p>
                    The objective is to deploy this device in the field to collect raw audio data. Once collected, I will run the data through the <strong>Perch model</strong> to identify bird calls and generate accurate population estimates for local songbird species.
                  </p>
                </div>
                
                <div className="inline-block bg-yellow-400 border-4 border-black p-4 mt-4 transform rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <span className="font-black uppercase tracking-widest text-sm block mb-1">Status</span>
                  <p className="font-bold text-2xl leading-none">Deploying Spring 2026</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-[#fffdf5] text-slate-900 font-sans min-h-screen selection:bg-yellow-200 relative">
      
      {/* --- LIGHTBOX OVERLAY --- */}
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
            className="max-w-full max-h-full object-contain border-4 border-white shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* --- MODAL WINDOW --- */}
      {activeProject && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6 bg-black/60 backdrop-blur-sm"
          onClick={() => setActiveProject(null)}
        >
          <div 
            className={`w-full max-w-7xl h-[95vh] flex flex-col border-4 border-black bg-[#fffdf5] shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative animate-in fade-in zoom-in-95 duration-200`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`${activeProject.color} border-b-4 border-black p-6 md:p-10 flex items-center justify-between shrink-0`}>
              <div className="flex items-center gap-4">
                {activeProject.icon}
                <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                  {activeProject.title}
                </h3>
              </div>
              <button 
                onClick={() => setActiveProject(null)}
                className="bg-black text-white hover:bg-yellow-400 hover:text-black transition-colors border-4 border-black p-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <X size={32} strokeWidth={4} />
              </button>
            </div>

            <div className="p-6 md:p-12 overflow-y-auto flex-grow custom-scrollbar">
              {activeProject.modalContent}
            </div>
          </div>
        </div>
      )}

      {/* PERSISTENT NAV */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b-4 border-black">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-black text-3xl border-4 border-black px-3 py-1 transform -rotate-2 bg-white">LC</span>
          <a href="#contact" className="flex items-center gap-2 bg-yellow-400 border-4 border-black hover:bg-yellow-500 text-black px-6 py-2 font-black transition-all hover:scale-110 active:scale-95 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <Mail size={20} strokeWidth={3} /> CONTACT
          </a>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-12">
        {/* HERO */}
        <section className="min-h-[85vh] flex flex-col justify-center items-center text-center">
          <div className="flex flex-col items-center scale-110 md:scale-125 mb-12">
            <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter uppercase [font-family:var(--font-blocky)]">
              LUCAS CRAMPTON
            </h1>
            <div className="relative w-80 h-56 flex items-end justify-center">
              <img src="Wave.gif" alt="Lucas waving" className="relative z-10 w-full h-auto object-bottom" />
            </div>
          </div>
          
          <div className="transform rotate-1">
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              STUDYING <span className="bg-blue-300 px-3 outline-4 outline-black outline">APPLIED MATH</span>
            </h2>
            <p className="text-2xl font-bold text-slate-700 italic max-w-xl mx-auto mb-12">
              "Building a digital footprint from a clean slate."
            </p>
          </div>

          <a href="#education" className="animate-bounce text-black mt-4">
            <ChevronDown size={64} strokeWidth={4} />
          </a>
        </section>

        {/* EDUCATION */}
        <section id="education" className="py-24 border-t-8 border-black border-dotted">
          <div className="flex items-center gap-4 mb-16 transform -rotate-2">
            < GraduationCap size={48} strokeWidth={3} />
            <h3 className="text-5xl font-black uppercase tracking-tighter">My Education</h3>
          </div>
          
          <div className="space-y-16">
            <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform rotate-1 hover:rotate-0 transition-transform">
              <span className="font-black text-slate-500 text-xl uppercase tracking-widest">Summer 2023</span>
              <h4 className="text-3xl font-black mt-2 uppercase">Eagle Harbor High School</h4>
              <p className="mt-4 text-xl font-bold text-slate-600">Graduation. This was the starting point of my journey toward self-discipline and finding my passion for academic logic.</p>
            </div>

            <div className="bg-blue-100 border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 hover:rotate-0 transition-transform">
              <span className="font-black text-blue-700 text-xl uppercase tracking-widest">Jan 2025 - Present</span>
              <h4 className="text-3xl font-black mt-2 uppercase">Olympic College</h4>
              <p className="mt-4 text-xl font-bold">Currently pursuing Applied Mathematics. Maintaining a <span className="underline decoration-blue-600 decoration-8 underline-offset-4 text-blue-700">3.75 GPA</span> and focused on building a strong foundation in STEM.</p>
            </div>

            <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(59,130,246,1)] transform rotate-1 hover:rotate-0 transition-transform">
              <span className="font-black text-blue-600 text-xl uppercase tracking-widest">Est. 2027</span>
              <h4 className="text-3xl font-black mt-2 uppercase">Bachelor's Transfer</h4>
              <p className="mt-4 text-xl font-bold text-slate-600">I plan on transferring into an Applied Math Bachelor's program to deepen my technical expertise and connect with the broader scientific community.</p>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-24 border-t-8 border-black">
          <h3 className="text-5xl font-black uppercase mb-16 text-center tracking-tighter">What I'm Working On.</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projectsData.map((item, i) => (
              <button 
                key={i} 
                onClick={() => setActiveProject(item)}
                className={`${item.color} text-left border-4 border-black p-10 jagged-border shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all group`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="transform group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h4 className="text-3xl font-black uppercase tracking-tight">{item.title}</h4>
                </div>
                <p className="text-lg font-bold opacity-80 leading-snug">{item.summary}</p>
                
                <div className="mt-8 inline-flex items-center gap-2 font-black uppercase text-sm bg-black text-white px-4 py-2 border-2 border-black group-hover:bg-white group-hover:text-black transition-colors">
                  Open Section
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* WORK EXPERIENCE */}
        <section id="work" className="py-24 border-t-8 border-black border-dotted">
          <h3 className="text-5xl font-black uppercase mb-12 tracking-tighter">Experience</h3>
          <div className="border-4 border-black bg-white overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
            <table className="w-full text-left font-black text-xl">
              <thead>
                <tr className="bg-black text-white border-b-4 border-black">
                  <th className="p-6">ROLE</th>
                  <th className="p-6 text-right">YEAR</th>
                </tr>
              </thead>
              <tbody className="divide-y-4 divide-black">
                <tr className="hover:bg-yellow-50"><td className="p-6">Freelance IT</td><td className="p-6 text-right">2025</td></tr>
                <tr className="hover:bg-yellow-50"><td className="p-6">Carpentry Apprentice</td><td className="p-6 text-right">2025</td></tr>
                <tr className="hover:bg-yellow-50"><td className="p-6">Mouse Magic</td><td className="p-6 text-right">2024</td></tr>
                <tr className="hover:bg-yellow-50"><td className="p-6">Docs Grill</td><td className="p-6 text-right">2023</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-32 text-center">
          <div className="inline-block border-8 border-black p-12 bg-yellow-400 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
            <h3 className="text-6xl font-black uppercase mb-6 tracking-tighter">Let's Connect</h3>
            <p className="text-2xl font-bold mb-10 max-w-md mx-auto">Ready to build something logic-based?</p>
            <a 
              href="mailto:lucas.crampton@example.com" 
              className="bg-black text-white text-2xl font-black px-12 py-5 uppercase tracking-widest hover:bg-slate-800 transition-colors inline-block"
            >
              Send Email
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}