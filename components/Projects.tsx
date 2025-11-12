import React, { useState, useMemo, useRef } from 'react';
import type { Project } from '../types';
import ProjectCard from './ProjectCard';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import Modal from './Modal';
import ProjectDetail from './ProjectDetail';


const projectsData: Project[] = [
  {
    id: 1,
    title: "Проект 'Синергия'",
    type: "Веб-приложение",
    description: "Интерактивная визуализация данных, созданная на волне вдохновения от ночных джазовых плейлистов.",
    detailedDescription: "Синергия — это инструмент для анализа сложных наборов данных в реальном времени. Мы использовали D3.js для создания плавных и интуитивно понятных графиков, которые позволяют пользователям видеть паттерны там, где раньше был только шум. Весь интерфейс построен на Tailwind CSS для максимальной гибкости и скорости разработки.",
    emotionalTakeaway: "Чувство гармонии и порядка, возникающее из хаоса данных.",
    imageUrls: ["https://picsum.photos/seed/synergy/800/600", "https://picsum.photos/seed/synergy2/800/600", "https://picsum.photos/seed/synergy3/800/600"],
    tags: ["React", "D3.js", "Tailwind CSS"],
    link: "#",
  },
  {
    id: 2,
    title: "Атмосферный Помощник",
    type: "Веб-приложение",
    description: "Минималистичное приложение для создания эмбиент-звуков, разработанное в дождливые выходные.",
    detailedDescription: "Это приложение использует Web Audio API для генерации и микширования различных звуковых ландшафтов: от шума дождя до звуков костра. Идеально подходит для концентрации во время работы или для релаксации. Next.js обеспечивает быструю загрузку и плавную работу.",
    emotionalTakeaway: "Ощущение уюта и спокойствия, которое можно включить по кнопке.",
    imageUrls: ["https://picsum.photos/seed/ambience/800/600", "https://picsum.photos/seed/ambience2/800/600"],
    tags: ["Next.js", "Web Audio API", "React"],
    link: "#",
  },
  {
    id: 3,
    title: "Генератор Поэзии",
    type: "AI Модель",
    description: "Нейросеть, пишущая стихи. Проект родился из желания соединить технологию и лирику.",
    detailedDescription: "Мы использовали Gemini API для создания языковой модели, обученной на тысячах классических и современных стихотворений. Бэкенд на Flask предоставляет простой API, который можно интегрировать в любое приложение. Результаты иногда бывают удивительно глубокими.",
    emotionalTakeaway: "Удивление от того, как бездушный алгоритм может создавать нечто прекрасное.",
    imageUrls: ["https://picsum.photos/seed/poetry/800/600", "https://picsum.photos/seed/poetry2/800/600", "https://picsum.photos/seed/poetry3/800/600"],
    tags: ["Python", "Gemini API", "Flask"],
    link: "#",
  },
];

const Projects: React.FC = () => {
  const [activeTag, setActiveTag] = useState('Все');
  const [activeType, setActiveType] = useState('Все');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projectsData.forEach(project => project.tags.forEach(tag => tags.add(tag)));
    return ['Все', ...Array.from(tags)];
  }, []);
  
  const allTypes = useMemo(() => {
    const types = new Set<string>(projectsData.map(p => p.type));
    return ['Все', ...Array.from(types)];
  }, []);
  
  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
        const tagMatch = activeTag === 'Все' || project.tags.includes(activeTag);
        const typeMatch = activeType === 'Все' || project.type === activeType;
        return tagMatch && typeMatch;
    });
  }, [activeTag, activeType]);

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <section 
        id="projects" 
        ref={sectionRef} 
        className={`py-20 sm:py-32 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-50">Творения из Зоны</h2>
            <p className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto">Каждый проект — это история, рассказанная кодом.</p>
          </div>

          <div className="flex flex-col items-center gap-6 mb-12">
            <div className="flex justify-center flex-wrap gap-2">
                {allTypes.map(type => (
                    <button
                        key={type}
                        onClick={() => setActiveType(type)}
                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 border ${
                            activeType === type 
                            ? 'bg-accent-secondary text-base-900 border-accent-secondary'
                            : 'bg-base-800 text-neutral-200 border-neutral-700 hover:bg-accent-secondary/20 hover:border-accent-secondary/50'
                        }`}
                    >
                        {type}
                    </button>
                ))}
            </div>
             <div className="flex justify-center flex-wrap gap-2">
                {allTags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => setActiveTag(tag)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 border ${
                            activeTag === tag 
                            ? 'bg-accent text-base-900 border-accent'
                            : 'bg-base-800 text-neutral-200 border-neutral-700 hover:bg-accent/20 hover:border-accent/50'
                        }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} onViewDetails={handleViewDetails} />
            ))}
          </div>
        </div>
      </section>
      
      <Modal isOpen={!!selectedProject} onClose={handleCloseModal}>
        {selectedProject && <ProjectDetail project={selectedProject} />}
      </Modal>
    </>
  );
};

export default Projects;