
import React from 'react';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewDetails }) => {
  return (
    <button 
      onClick={() => onViewDetails(project)}
      className="bg-base-800 rounded-2xl overflow-hidden shadow-lg border border-neutral-50/10 group transform transition-all duration-500 hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-2 flex flex-col text-left w-full focus:outline-none focus:ring-2 focus:ring-accent"
    >
      <div className="relative">
        <img 
          src={project.imageUrls[0]} 
          alt={project.title} 
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-neutral-50 mb-2">{project.title}</h3>
        <p className="text-neutral-400 mb-4 flex-grow">{project.description}</p>
        
        <blockquote className="relative my-4">
          <p className="pl-4 border-l-4 border-accent text-accent/90 italic">
            {project.emotionalTakeaway}
          </p>
        </blockquote>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map(tag => (
            <span key={tag} className="bg-accent/10 text-accent text-sm font-medium px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="inline-block text-neutral-50 font-semibold mt-auto group-hover:text-accent transition-colors duration-300">
          Узнать больше <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </div>
      </div>
    </button>
  );
};

export default ProjectCard;