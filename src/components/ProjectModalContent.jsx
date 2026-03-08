import React from 'react';
import { ExternalLink, Download } from 'lucide-react';

/**
 * Renders modal body from a single project and category.
 * Supports:
 * - pdf: pdfLink + description
 * - link: image + link + description
 * - imageText: image + paragraphs + status (science, future projects)
 */
export default function ProjectModalContent({ project, category, onImageClick }) {
  if (!project) return null;

  // PDF project: title, download link, description, iframe
  if (project.pdfLink) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h4 className="text-3xl font-black uppercase text-slate-900 dark:text-slate-200">{project.title}</h4>
          <a
            href={`/${project.pdfLink}`}
            download
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest bg-yellow-400 dark:bg-slate-700 border-4 border-black dark:border-slate-600 px-6 py-3 hover:bg-black dark:hover:bg-slate-600 hover:text-white dark:hover:text-slate-200 transition-colors text-slate-900 dark:text-slate-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-black dark:focus-visible:ring-white"
          >
            <Download size={18} strokeWidth={3} /> Download PDF
          </a>
        </div>
        {project.description && (
          <p className="font-medium text-lg text-slate-700 dark:text-slate-400">{project.description}</p>
        )}
        <div className="w-full h-[60vh] overflow-hidden border-4 border-black dark:border-slate-600 bg-slate-100 dark:bg-slate-900">
          <iframe
            src={project.pdfLink}
            className="w-full h-full"
            title={`PDF Viewer for ${project.title}`}
          >
            <p className="p-4 text-slate-900 dark:text-slate-200">Browser does not support PDFs.</p>
          </iframe>
        </div>
      </div>
    );
  }

  // Link project (e.g. computers): image + description + GitHub link
  if (project.link) {
    const isComputersCategory = category?.id === 'computers';

    // Programming & Software: larger image with text wrapping around it
    if (isComputersCategory) {
      return (
        <div className="space-y-6">
          <h4 className="text-3xl font-black uppercase text-slate-900 dark:text-slate-200">{project.title}</h4>
          <div className="clearfix">
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                decoding="async"
                onClick={onImageClick ? () => onImageClick(project.image) : undefined}
                className={`w-full md:w-2/5 lg:w-1/3 h-auto border-4 border-black dark:border-slate-600 object-cover bg-slate-100 dark:bg-slate-900 md:float-left md:mr-6 mb-4 ${
                  onImageClick ? 'cursor-zoom-in' : ''
                }`}
              />
            )}
            <div className="space-y-4 font-medium text-lg text-slate-700 dark:text-slate-400 leading-relaxed">
              {project.description && <p>{project.description}</p>}
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-black dark:bg-slate-700 text-white dark:text-slate-200 px-6 py-4 font-black uppercase tracking-widest hover:bg-blue-400 dark:hover:bg-slate-600 hover:text-black dark:hover:text-white transition-colors border-4 border-black dark:border-slate-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-black dark:focus-visible:ring-white"
              >
                View on GitHub <ExternalLink size={20} strokeWidth={3} />
              </a>
            </div>
          </div>
        </div>
      );
    }

    // Default link layout
    return (
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        <div className="w-full lg:w-1/2 shrink-0">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            onClick={onImageClick ? () => onImageClick(project.image) : undefined}
            className={`w-full border-4 border-black dark:border-slate-600 object-cover bg-slate-100 dark:bg-slate-900 ${
              onImageClick ? 'cursor-zoom-in' : ''
            }`}
          />
        </div>
        <div className="w-full lg:w-1/2 space-y-6">
          <h4 className="text-3xl font-black uppercase text-slate-900 dark:text-slate-200">{project.title}</h4>
          <p className="font-medium text-lg text-slate-700 dark:text-slate-400 leading-relaxed">
            {project.description}
          </p>
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-black dark:bg-slate-700 text-white dark:text-slate-200 px-6 py-4 font-black uppercase tracking-widest hover:bg-blue-400 dark:hover:bg-slate-600 hover:text-black dark:hover:text-white transition-colors border-4 border-black dark:border-slate-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-black dark:focus-visible:ring-white"
          >
            View on GitHub <ExternalLink size={20} strokeWidth={3} />
          </a>
        </div>
      </div>
    );
  }

  // Image + paragraphs + optional status (science, future projects)
  if (project.paragraphs) {
    const isScienceCategory = category?.id === 'science';

    // Environmental Science: larger image with text wrapping around it
    if (isScienceCategory) {
      return (
        <div className="space-y-6">
          <h4 className="text-3xl font-black uppercase text-slate-900 dark:text-slate-200">{project.title}</h4>
          <div className="clearfix">
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                decoding="async"
                onClick={onImageClick ? () => onImageClick(project.image) : undefined}
                className={`w-full md:w-2/5 lg:w-1/3 h-auto border-4 border-black dark:border-slate-600 object-cover bg-slate-100 dark:bg-slate-900 md:float-left md:mr-6 mb-4 ${
                  onImageClick ? 'cursor-zoom-in' : ''
                }`}
              />
            )}
            <div className="space-y-4 font-medium text-lg text-slate-700 dark:text-slate-400">
              {project.paragraphs.map((para, pIdx) => (
                <p key={pIdx} dangerouslySetInnerHTML={{ __html: para }} />
              ))}
            </div>
          </div>
          {project.status && (
            <div className="inline-block w-fit bg-yellow-400 dark:bg-slate-700 border-4 border-black dark:border-slate-600 p-4 mt-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(2,6,23,1)]">
              <span className="font-black uppercase tracking-widest text-sm block mb-1 text-slate-900 dark:text-slate-300">
                Status
              </span>
              <p className="font-bold text-2xl leading-none text-slate-900 dark:text-slate-200">{project.status}</p>
            </div>
          )}
        </div>
      );
    }

    // Default image + text layout
    return (
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
        {project.image && (
          <div className="w-full md:w-1/3 lg:w-1/4 shrink-0 mb-6 md:mb-0 md:mr-6">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              decoding="async"
              onClick={onImageClick ? () => onImageClick(project.image) : undefined}
              className={`w-full h-auto border-4 border-black dark:border-slate-600 object-cover bg-slate-100 dark:bg-slate-900 ${onImageClick ? 'cursor-zoom-in' : ''}`}
            />
          </div>
        )}
        <div className="w-full flex-1 space-y-6 flex flex-col">
          <h4 className="text-3xl font-black uppercase text-slate-900 dark:text-slate-200">{project.title}</h4>
          <div className="space-y-4 font-medium text-lg text-slate-700 dark:text-slate-400">
            {project.paragraphs.map((para, pIdx) => (
              <p key={pIdx} dangerouslySetInnerHTML={{ __html: para }} />
            ))}
          </div>
          {project.status && (
            <div className="inline-block w-fit bg-yellow-400 dark:bg-slate-700 border-4 border-black dark:border-slate-600 p-4 mt-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(2,6,23,1)]">
              <span className="font-black uppercase tracking-widest text-sm block mb-1 text-slate-900 dark:text-slate-300">
                Status
              </span>
              <p className="font-bold text-2xl leading-none text-slate-900 dark:text-slate-200">{project.status}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
