import React, { useRef } from 'react';
import FlowIcon from './icons/FlowIcon';
import AtmosphereIcon from './icons/AtmosphereIcon';
import EmotionIcon from './icons/EmotionIcon';
import useIntersectionObserver from '../hooks/useIntersectionObserver';


const tenets = [
  {
    icon: <FlowIcon />,
    title: "Состояние Потока",
    description: "Программирование как медитация. Глубокое погружение, где время исчезает, а код льется сам собой. Мы создаем среду, которая помогает достичь этого состояния.",
  },
  {
    icon: <AtmosphereIcon />,
    title: "Атмосфера как Инструмент",
    description: "Правильный свет, музыка и окружение — не роскошь, а необходимость. Каждый элемент рабочего пространства настраивается для максимальной концентрации и креативности.",
  },
  {
    icon: <EmotionIcon />,
    title: "Эмоциональный Резонанс",
    description: "Проекты — это не просто строки кода, а отражение наших идей и чувств. Мы вкладываем душу в каждую деталь, чтобы результат вызывал эмоции.",
  },
];

const Philosophy: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section 
      id="philosophy" 
      ref={sectionRef} 
      className={`py-20 sm:py-32 bg-base-800 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-50">Искусство Потока</h2>
          <p className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto">Наша философия в нескольких тезисах.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tenets.map((tenet, index) => (
            <div
              key={index}
              className="bg-base-700/50 p-8 rounded-2xl shadow-lg border border-neutral-50/10 transform hover:-translate-y-2 transition-all duration-300 group hover:shadow-xl hover:shadow-accent/10"
            >
              <div className="mb-6 text-accent transition-all duration-300 group-hover:[filter:drop-shadow(0_0_8px_var(--tw-shadow-color))] group-hover:shadow-accent">
                {React.cloneElement(tenet.icon, { className: "w-10 h-10" })}
              </div>
              <h3 className="text-2xl font-semibold text-neutral-50 mb-4 group-hover:text-accent transition-colors duration-300">
                {tenet.title}
              </h3>
              <p className="text-neutral-300 leading-relaxed">
                {tenet.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
