import React from 'react';
import type { Project } from '../types';
import ImageSlider from './ImageSlider';

interface ProjectDetailProps {
  project: Project;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  return (
    <div>
      <ImageSlider images={project.imageUrls} />
      <div className="p-8">
        <h2 className="text-4xl font-bold text-neutral-50 mb-4">{project.title}</h2>
        <p className="text-neutral-300 mb-6 leading-relaxed">{project.detailedDescription}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map(tag => (
            <span key={tag} className="bg-accent/10 text-accent text-sm font-medium px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center bg-accent text-base-900 font-bold py-2 px-6 rounded-lg hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105"
        >
          Посетить Сайт
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
        </a>
      </div>
    </div>
  );
};

export default ProjectDetail;