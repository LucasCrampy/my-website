import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Mail, ChevronDown, Code, Camera, Leaf, GraduationCap, Calculator, X, Linkedin, Github, ArrowUpRight, Lightbulb } from 'lucide-react';
import { siteContent as SITE_CONTENT, projectContent as PROJECT_CONTENT } from './data/siteContent';
import ProjectCard from './components/ProjectCard';
import ProjectModalContent from './components/ProjectModalContent';

// Icon mapping: string key → React component
const ICON_MAP = {
  calculator: <Calculator size={32} />,
  code: <Code size={32} />,
  camera: <Camera size={32} />,
  leaf: <Leaf size={32} />,
  lightbulb: <Lightbulb size={32} />
};

function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('reveal-on-scroll--visible');
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-on-scroll--visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [showFuture, setShowFuture] = useState(false);
  const [heroParallax, setHeroParallax] = useState(0);
  const lastFocusRef = useRef(/** @type {HTMLElement | null} */ (null));
  const modalCloseRef = useRef(/** @type {HTMLButtonElement | null} */ (null));
  const lightboxCloseRef = useRef(/** @type {HTMLButtonElement | null} */ (null));
  const heroRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const educationRevealRef = useScrollReveal();
  const projectsRevealRef = useScrollReveal();
  const aboutRevealRef = useScrollReveal();
  const experienceRevealRef = useScrollReveal();

  useEffect(() => {
    if (activeProject || lightboxImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [activeProject, lightboxImage]);

  const isProjectObject = (x) =>
    x && typeof x === 'object' && x.title && (x.pdfLink || x.link || x.paragraphs);

  const openSingleProject = (category, projectOrContent) => {
    lastFocusRef.current = document.activeElement;
    if (isProjectObject(projectOrContent)) {
      setActiveProject({
        color: category.color,
        icon: ICON_MAP[category.icon],
        title: category.title,
        project: projectOrContent,
        category,
        content: null
      });
    } else {
      setActiveProject({
        color: category.color,
        icon: ICON_MAP[category.icon],
        title: category.title,
        project: null,
        category: null,
        content: projectOrContent
      });
    }
  };

  const closeProjectModal = () => {
    setActiveProject(null);
    setTimeout(() => lastFocusRef.current?.focus(), 0);
  };

  const openLightbox = (src) => {
    lastFocusRef.current = document.activeElement;
    setLightboxImage(src);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setTimeout(() => lastFocusRef.current?.focus(), 0);
  };

  useEffect(() => {
    if (activeProject) modalCloseRef.current?.focus();
  }, [activeProject]);

  useEffect(() => {
    if (lightboxImage) lightboxCloseRef.current?.focus();
  }, [lightboxImage]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    if (window.innerWidth < 1024) return;

    let rafId = null;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        const progress = Math.min(scrollY / vh, 1);
        setHeroParallax(progress);
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const galleryContent = useMemo(
    () => (
      <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
        {PROJECT_CONTENT.photography.images.map((src, idx) => (
          <button
            key={idx}
            onClick={() => openLightbox(src)}
            className="break-inside-avoid w-full block focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400 rounded-sm"
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
    ),
    []
  );

  return (
    <div className="bg-[#fffdf5] dark:bg-slate-900 text-slate-900 dark:text-slate-200 font-sans min-h-screen selection:bg-yellow-200 dark:selection:bg-slate-700 relative overflow-x-hidden transition-colors duration-300">
      
      {/* LIGHTBOX OVERLAY */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen image"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            ref={lightboxCloseRef}
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute top-6 right-6 bg-slate-900/90 dark:bg-slate-900 text-slate-200 border-2 border-slate-700 dark:border-slate-600 px-4 py-1.5 font-black uppercase tracking-widest text-[10px] shadow-md hover:border-yellow-400 hover:text-yellow-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
            aria-label="Close fullscreen image"
          >
            <X size={18} strokeWidth={3} />
          </button>
          <div className="flex items-center justify-center w-full h-full">
            <img
              src={lightboxImage}
              alt="Enlarged gallery view"
              className="max-h-[85vh] w-auto max-w-full object-contain border-4 border-white dark:border-slate-700 shadow-2xl animate-pop-up"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* DYNAMIC MODAL */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeProject.title}
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6 bg-black/60 dark:bg-slate-900/80 backdrop-blur-sm animate-fade-in"
          onClick={closeProjectModal}
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
                ref={modalCloseRef}
                onClick={closeProjectModal}
                className="bg-black dark:bg-slate-700 text-white dark:text-slate-200 hover:bg-yellow-400 dark:hover:bg-slate-600 hover:text-black dark:hover:text-white transition-colors border-4 border-black dark:border-slate-600 p-1.5 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:ring-4 hover:ring-yellow-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400"
                aria-label="Close project details"
              >
                <X size={24} strokeWidth={4} />
              </button>
            </div>

            <div className="p-6 md:p-10 overflow-y-auto flex-grow custom-scrollbar">
              {activeProject.content != null
                ? activeProject.content
                : (
                  <ProjectModalContent
                    project={activeProject.project}
                    category={activeProject.category}
                    onImageClick={openLightbox}
                  />
                )}
            </div>
          </div>
        </div>
      )}

      {/* PERSISTENT NAV */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/90 backdrop-blur-md z-50 border-b-4 border-black dark:border-slate-600">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-black text-3xl border-4 border-black dark:border-slate-600 px-4 py-1 transform -rotate-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] outline outline-1 outline-transparent">LC</span>
          <a href="#contact" className="flex items-center gap-2 bg-yellow-400 dark:bg-slate-800 border-4 border-black dark:border-slate-600 hover:bg-yellow-500 dark:hover:bg-slate-700 text-black dark:text-slate-200 px-6 py-2 font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] focus:outline-none focus-visible:ring-4 focus-visible:ring-black dark:focus-visible:ring-white">
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
            <div ref={heroRef} className="relative w-80">
              <div className="relative w-full h-full overflow-visible">
                <div
                  className="absolute bottom-0 left-[-5%] right-[10%] h-[103%] rounded-t-full border-4 border-black dark:border-slate-700 overflow-hidden bg-[#bfdbfe] dark:bg-[#1d4ed8]"
                  aria-hidden="true"
                >
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[300%] hero-arch-pattern"
                    style={{ transform: `translateY(${heroParallax * 200}px)` }}
                  />
                </div>
                <div
                  className="relative z-10"
                  style={{ clipPath: 'inset(-999px -999px 3px -999px)' }}
                >
                  <div style={{ transform: `translateY(${heroParallax * 50 - 4}px)` }}>
                    {/* Eager loaded intentionally since it is above the fold */}
                    <img src={SITE_CONTENT.hero.profileImage} alt="Profile wave" className="w-full h-auto object-bottom" />
                  </div>
                </div>
              </div>
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

          <a href="#education" aria-label="Scroll to education section" className="animate-bounce text-black dark:text-slate-400 mt-16 focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400 rounded-full">
            <ChevronDown size={56} strokeWidth={4} />
          </a>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education" className="py-24 border-t-8 border-black dark:border-slate-700 border-dotted">
          <div ref={educationRevealRef} className="reveal-on-scroll flex items-center gap-4 mb-12 transform -rotate-2 text-slate-900 dark:text-slate-200 bg-white dark:bg-slate-800 border-4 border-black dark:border-slate-600 p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(2,6,23,1)] w-fit outline outline-1 outline-transparent">
            <GraduationCap size={40} strokeWidth={3} />
            <h3 className="text-4xl font-black uppercase tracking-tighter [font-family:var(--font-blocky)]">My Education</h3>
          </div>
          
          <div className="flex flex-col gap-8">
            
            {/* Bachelor's Transfer */}
            <div className={`${SITE_CONTENT.education.transfer.bgClass} border-4 border-black dark:border-slate-600 p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between ${SITE_CONTENT.education.transfer.shadowClass} transform -rotate-1 outline outline-1 outline-transparent`}>
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
            <div className={`${SITE_CONTENT.education.highschool.bgClass} border-4 border-black dark:border-slate-600 p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(2,6,23,1)] transform rotate-1 outline outline-1 outline-transparent`}>
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
          <h3 ref={projectsRevealRef} className="reveal-on-scroll text-5xl font-black uppercase mb-16 text-center tracking-tighter text-slate-900 dark:text-slate-200 [font-family:var(--font-blocky)]">What I'm Working On.</h3>

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
                    key={proj.title}
                    onClick={() => openSingleProject(PROJECT_CONTENT.math, proj)}
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
                {PROJECT_CONTENT.computers.projects.map((proj) => (
                  <ProjectCard
                    key={proj.title}
                    onClick={() => openSingleProject(PROJECT_CONTENT.computers, proj)}
                    className="p-6 flex flex-col justify-between"
                  >
                    <div className="w-full aspect-[4/3] border-4 border-black dark:border-slate-600 mb-5 overflow-hidden bg-slate-100 dark:bg-slate-900 shrink-0 relative">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        loading="lazy"
                        decoding="async"
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
                {PROJECT_CONTENT.science.projects.map((proj) => (
                  <ProjectCard
                    key={proj.title}
                    onClick={() => openSingleProject(PROJECT_CONTENT.science, proj)}
                    className="p-6"
                  >
                    <div className="w-full aspect-[3/2] border-4 border-black dark:border-slate-600 mb-4 overflow-hidden shrink-0 relative bg-slate-100 dark:bg-slate-900">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        loading="lazy"
                        decoding="async"
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
                  className="relative w-full max-w-2xl h-72 sm:h-80 lg:h-96 cursor-pointer group mx-auto mt-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400 border-none bg-transparent block"
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
                  className="group border-4 border-black dark:border-slate-600 px-8 py-4 uppercase font-black tracking-widest text-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(2,6,23,1)] hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(2,6,23,1)] hover:bg-black dark:hover:bg-slate-600 hover:text-white dark:hover:text-slate-200 transition-all flex items-center gap-3 outline outline-1 outline-transparent focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400"
                >
                  View Full Gallery <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* TABLE 5: FUTURE PROJECTS (Accordion Collapse) */}
            <div className={`${PROJECT_CONTENT.futureProjects.color} border-4 border-black dark:border-slate-600 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(2,6,23,1)] transition-all duration-300`}>
              
              <button
                onClick={() => setShowFuture(!showFuture)}
                className="w-full p-6 md:p-8 flex flex-row items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400"
                aria-expanded={showFuture}
                aria-controls="future-projects-content"
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="bg-white dark:bg-slate-900 p-3 border-4 border-black dark:border-slate-600 transform -rotate-3 shrink-0 outline outline-1 outline-transparent">
                    {ICON_MAP[PROJECT_CONTENT.futureProjects.icon]}
                  </div>
                  <div>
                    <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tight [font-family:var(--font-blocky)] text-slate-900 dark:text-slate-200">
                      {PROJECT_CONTENT.futureProjects.headerTitle}
                    </h4>
                    <p className="text-sm sm:text-base font-bold opacity-80 text-slate-900 dark:text-slate-300 mt-1 hidden sm:block">
                      {PROJECT_CONTENT.futureProjects.headerSubtitle}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 p-2">
                  <ChevronDown
                    size={32}
                    strokeWidth={3}
                    className={`transform transition-transform duration-300 text-slate-900 dark:text-slate-200 ${showFuture ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>

              {showFuture && (
                <div id="future-projects-content" className="p-6 md:p-8 border-t-4 border-black dark:border-slate-600 animate-fade-in">
                  <div className="space-y-4 text-xl font-medium text-slate-700 dark:text-slate-400 mb-8 max-w-3xl">
                    {PROJECT_CONTENT.futureProjects.introParagraphs?.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                    <p>
                      <a href={`mailto:${SITE_CONTENT.contact.email}`} className="font-bold underline decoration-4 decoration-black dark:decoration-slate-400 underline-offset-4 hover:text-blue-600 transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400 rounded-sm">Email me</a> if you want to collaborate on any of these.
                    </p>
                  </div>

                  <div className="grid grid-cols-1">
                    {PROJECT_CONTENT.futureProjects.projects.map((proj) => (
                      <ProjectCard
                        key={proj.title}
                        onClick={() => openSingleProject(PROJECT_CONTENT.futureProjects, proj)}
                        className="p-6 flex items-center justify-between"
                      >
                        <span className="font-black text-xl uppercase pr-10 text-slate-900 dark:text-slate-200">{proj.title}</span>
                        <span className="bg-blue-100 dark:bg-slate-800 text-blue-800 dark:text-blue-300 text-xs font-black uppercase px-3 py-1 border-2 border-black dark:border-slate-600 shrink-0">Read More</span>
                      </ProjectCard>
                    ))}
                  </div>
                  
                  {PROJECT_CONTENT.futureProjects.footerText && (
                    <div className="pt-8 text-center">
                      <p className="text-xl font-bold text-slate-500 dark:text-slate-500">{PROJECT_CONTENT.futureProjects.footerText}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </section>

        {/* BIO SECTION */}
        <section id="bio" className="py-24 border-t-8 border-black dark:border-slate-700">
          <h3 ref={aboutRevealRef} className="reveal-on-scroll text-5xl font-black uppercase mb-12 tracking-tighter text-slate-900 dark:text-slate-200 [font-family:var(--font-blocky)]">About Me</h3>
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
                    <a href={SITE_CONTENT.bio.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-blue-500 dark:bg-blue-600 text-white px-8 py-4 font-black uppercase tracking-widest border-4 border-black dark:border-slate-600 hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(2,6,23,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[10px_10px_0px_0px_rgba(2,6,23,1)] hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-black dark:focus-visible:ring-white">
                      <Linkedin size={20} strokeWidth={3} /> LinkedIn
                    </a>
                    <a href={SITE_CONTENT.bio.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-slate-900 dark:bg-slate-700 text-white px-8 py-4 font-black uppercase tracking-widest border-4 border-black dark:border-slate-600 hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(2,6,23,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[10px_10px_0px_0px_rgba(2,6,23,1)] hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400">
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
                      <a href={SITE_CONTENT.bio.sisterLinkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-black uppercase text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors underline decoration-4 underline-offset-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-black dark:focus-visible:ring-white rounded-sm">
                        <Linkedin size={18} strokeWidth={3} /> LinkedIn
                      </a>
                      <a href={SITE_CONTENT.bio.sisterGithub} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-black uppercase text-slate-900 dark:text-slate-300 hover:text-slate-600 dark:hover:text-white transition-colors underline decoration-4 underline-offset-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-black dark:focus-visible:ring-white rounded-sm">
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
          <h3 ref={experienceRevealRef} className="reveal-on-scroll text-5xl font-black uppercase mb-12 tracking-tighter text-slate-900 dark:text-slate-200 [font-family:var(--font-blocky)]">Experience</h3>
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
              className="bg-black dark:bg-slate-700 text-white dark:text-slate-200 text-2xl font-black px-16 py-6 uppercase tracking-widest hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors inline-flex items-center gap-4 border-4 border-black dark:border-slate-600 hover:scale-105 active:scale-95 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] focus:outline-none focus-visible:ring-4 focus-visible:ring-black dark:focus-visible:ring-white"
            >
              <Mail size={28} strokeWidth={3} /> Send Email
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}