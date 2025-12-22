
import React, { useState } from 'react';
import { PROJECTS, Project } from '../constants/projectsData';
import ProjectWorkspace from './ProjectWorkspace';
import { PlayIcon } from './icons/FeedbackIcons';
import { useNavigate } from 'react-router-dom';

interface ProjectsViewProps {
  openAssistant: (context: string) => void;
}

const ProjectsView: React.FC<ProjectsViewProps> = ({ openAssistant }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const navigate = useNavigate();
  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');
  const getStableSlug = (id: string, title: string) => {
    try {
      const key = `jj.slug.project:${id}`;
      const existing = localStorage.getItem(key);
      if (existing) return existing;
      const computed = slugify(title);
      localStorage.setItem(key, computed);
      return computed;
    } catch {
      return slugify(title);
    }
  };
  
  const PosterByType: React.FC<{ type: Project['type'] }> = ({ type }) => {
    if (type === 'todo') {
      return (
        <svg className="h-16 md:h-24" viewBox="0 0 128 128" aria-label="To-Do Poster">
          <rect x="16" y="16" width="96" height="96" rx="8" fill="#ffffff" opacity="0.85" />
          <rect x="28" y="32" width="60" height="10" rx="5" fill="#1d4ed8" />
          <rect x="28" y="52" width="72" height="10" rx="5" fill="#6366f1" />
          <rect x="28" y="72" width="50" height="10" rx="5" fill="#06b6d4" />
          <circle cx="96" cy="36" r="6" fill="#22c55e" />
          <circle cx="106" cy="56" r="6" fill="#22c55e" />
          <circle cx="86" cy="76" r="6" fill="#ef4444" />
        </svg>
      );
    }
    if (type === 'smarthome') {
      return (
        <svg className="h-16 md:h-24" viewBox="0 0 128 128" aria-label="Smart Home Poster">
          <defs>
            <linearGradient id="gh" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22d3ee"/>
              <stop offset="100%" stopColor="#3b82f6"/>
            </linearGradient>
          </defs>
          <path d="M64 20 L20 52 V108 H108 V52 Z" fill="url(#gh)" opacity="0.8"/>
          <rect x="46" y="72" width="36" height="28" rx="4" fill="#ffffff" opacity="0.9"/>
          <circle cx="64" cy="58" r="8" fill="#10b981"/>
          <path d="M44 44 C54 34,74 34,84 44" stroke="#ffffff" strokeWidth="4" fill="none" opacity="0.9"/>
          <path d="M50 50 C58 44,70 44,78 50" stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.9"/>
        </svg>
      );
    }
    if (type === 'bank') {
      return (
        <svg className="h-16 md:h-24" viewBox="0 0 128 128" aria-label="Bank Poster">
          <rect x="20" y="48" width="88" height="52" fill="#0ea5e9" opacity="0.85"/>
          <path d="M64 18 L18 42 H110 Z" fill="#1e293b"/>
          <rect x="30" y="58" width="14" height="32" fill="#ffffff" opacity="0.9"/>
          <rect x="52" y="58" width="14" height="32" fill="#ffffff" opacity="0.9"/>
          <rect x="74" y="58" width="14" height="32" fill="#ffffff" opacity="0.9"/>
          <rect x="96" y="58" width="12" height="32" fill="#ffffff" opacity="0.9"/>
          <rect x="20" y="100" width="88" height="8" fill="#334155"/>
        </svg>
      );
    }
    if (type === 'vending') {
      return (
        <svg className="h-16 md:h-24" viewBox="0 0 128 128" aria-label="Vending Machine Poster">
          <rect x="24" y="20" width="80" height="88" rx="6" fill="#f97316" opacity="0.9"/>
          <rect x="32" y="28" width="40" height="56" fill="#ffffff" opacity="0.9"/>
          <rect x="76" y="32" width="20" height="8" rx="2" fill="#1f2937" />
          <rect x="76" y="44" width="20" height="8" rx="2" fill="#1f2937" />
          <rect x="76" y="56" width="20" height="8" rx="2" fill="#1f2937" />
          <rect x="76" y="68" width="20" height="8" rx="2" fill="#1f2937" />
          <rect x="36" y="90" width="56" height="8" rx="3" fill="#0ea5e9" />
        </svg>
      );
    }
    return (
      <span className="block text-2xl md:text-5xl text-primary dark:text-blue-400">+</span>
    );
  };

  if (selectedProject) {
    return <ProjectWorkspace project={selectedProject} onExit={() => setSelectedProject(null)} openAssistant={openAssistant} />;
  }

  return (
    <div className="w-full max-w-6xl animate-fade-in px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary dark:text-white mb-4">Java Projects</h1>
        <p className="text-xl text-content-200 dark:text-content-200-dark max-w-2xl mx-auto">
          Apply your skills to build real systems. Code the logic on one side, and interact with a live interface on the other.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8">
        {PROJECTS.map(project => {
            // Special styling for the "Custom" project to look like a "Create New" button
            const isCustom = project.type === 'custom';
            
            return (
                <div 
                  key={project.id}
                  onClick={() => {
                    const slug = getStableSlug(project.id, project.title);
                    navigate(`/projects/java/${slug}`);
                  }}
                  className={`rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group flex flex-col h-full
                    ${isCustom 
                        ? 'bg-base-100 dark:bg-gray-800 border-2 border-dashed border-primary dark:border-blue-500' 
                        : 'bg-white dark:bg-gray-800 border border-base-300 dark:border-gray-700'
                    }
                  `}
                >
                  <div className={`relative pb-[56.25%] overflow-hidden
                    ${isCustom 
                        ? 'bg-blue-50 dark:bg-blue-900/20' 
                        : 'bg-base-100 dark:bg-gray-800'
                    }
                  `}>
                    {!isCustom && project.poster && (
                      <img
                        src={project.poster}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                        loading="lazy"
                        draggable={false}
                      />
                    )}
                    {(!project.poster || isCustom) && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        {isCustom ? (
                          <span className="block text-2xl md:text-5xl text-primary dark:text-blue-400">+</span>
                        ) : (
                          <PosterByType type={project.type} />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="p-3 md:p-4 flex flex-col h-full">
                    <div className="mb-3">
                        <span className={`inline-block px-2 py-1 text-xs font-bold rounded-full mb-2 ${
                            project.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                            project.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            project.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800' // Custom/Open
                        }`}>
                            {project.difficulty}
                        </span>
                        <h3 className="text-lg md:text-xl font-bold text-content-100 dark:text-white mb-1">{project.title}</h3>
                        <p className="text-content-200 dark:text-gray-400 text-xs md:text-sm mb-2 leading-tight line-clamp-2">
                        {project.description}
                        </p>
                    </div>
                    
                    <div className="mt-auto flex items-center text-secondary font-bold group-hover:text-blue-400 transition-colors text-xs md:text-sm">
                      <PlayIcon className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                      {isCustom ? 'Create Now' : 'Start Project'}
                    </div>
                  </div>
                </div>
            );
        })}
        
        {/* Placeholder for future projects */}
        <div className="bg-base-200 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center p-8 opacity-70">
            <p className="text-center text-content-200 dark:text-gray-500 font-medium">
                More projects coming soon...
            </p>
        </div>

      </div>
    </div>
  );
};

export default ProjectsView;
