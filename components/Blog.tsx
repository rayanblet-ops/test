import React, { useState } from 'react';
import type { BlogPost } from '../types';
import BlogPostLayout from './BlogPostLayout';

const posts: BlogPost[] = [
  {
    id: 1,
    title: "Идеальный плейлист для кодинга",
    excerpt: "Как музыка влияет на продуктивность и помогает войти в состояние потока.",
    link: "#",
    date: "15 июля, 2024",
    category: "Продуктивность",
    tags: ["музыка", "поток", "концентрация"],
    content: [
      { type: 'paragraph', text: 'Музыка — это мощнейший инструмент для управления настроением и концентрацией. Правильно подобранный плейлист может стать вашим лучшим союзником в глубокой работе, помогая отсечь внешние раздражители и полностью погрузиться в код.' },
      { type: 'quote', text: 'Для меня код — это ритм. Музыка помогает мне найти этот ритм и поддерживать его на протяжении всего дня.' },
      { type: 'paragraph', text: 'Экспериментируйте с жанрами: от эмбиента и лоу-фай хип-хопа до классической музыки или даже саундтреков из видеоигр. Главное — найти то, что работает именно для вас. Вот пример функции для старта вашего музыкального сервиса:' },
      { type: 'code', language: 'javascript', code: `
function playCodingPlaylist(genre = 'lofi') {
  console.log(\`Playing \${genre} playlist...\`);
  // ... logic to start music player
}

playCodingPlaylist();
      `},
    ],
  },
  {
    id: 2,
    title: "Фэн-шуй для вашего рабочего стола",
    excerpt: "Организация пространства, которая вдохновляет. От расположения монитора до выбора правильного растения.",
    link: "#",
    date: "02 июля, 2024",
    category: "Окружение",
    tags: ["рабочее место", "дизайн", "эргономика"],
    content: [
      { type: 'paragraph', text: 'Ваше рабочее место — это не просто стол и стул, это экосистема, которая напрямую влияет на вашу продуктивность и творческий потенциал. Правильная организация может снизить стресс и помочь сфокусироваться.' }
    ],
  },
  {
    id: 3,
    title: "Аромат продуктивности: сила запахов",
    excerpt: "Неочевидный, но мощный инструмент для концентрации. Какие ароматы помогают, а какие лучше избегать.",
    link: "#",
    date: "21 июня, 2024",
    category: "Продуктивность",
    tags: ["ароматерапия", "концентрация", "здоровье"],
    content: [
      { type: 'paragraph', text: 'Запахи напрямую связаны с лимбической системой мозга, отвечающей за эмоции и память. Использование аромамасел, таких как мята или розмарин, может значительно повысить вашу способность к концентрации.' }
    ],
  },
];

const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const featuredPost = posts[0];

  const filteredOtherPosts = posts
    .slice(1)
    .filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <section id="blog" className="py-20 sm:py-32 bg-base-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-50">Настройка Среды</h2>
          <p className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto">Мысли и заметки о создании идеальной атмосферы.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <BlogPostLayout post={featuredPost} allPosts={posts} />
          </div>
          <aside>
            <div className="sticky top-24">
              <div className="mb-8">
                <input
                  type="text"
                  placeholder="Поиск по записям..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-base-700 border border-neutral-700 text-neutral-200 placeholder-neutral-500 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                />
              </div>
              <h3 className="text-2xl font-bold text-neutral-100 mb-6 border-b-2 border-accent/30 pb-3">Другие Записи</h3>
              <div className="space-y-6">
                {filteredOtherPosts.length > 0 ? (
                  filteredOtherPosts.map(post => (
                    <div key={post.id} className="group">
                      <div className="flex items-center gap-2 text-sm mb-1">
                          <span className="text-accent-secondary font-semibold">{post.category}</span>
                          <span className="text-neutral-500">&middot;</span>
                          <span className="text-neutral-500">{post.date}</span>
                       </div>
                       <h4 className="text-xl font-semibold text-neutral-200 group-hover:text-accent transition-colors">
                         <a href={post.link}>{post.title}</a>
                       </h4>
                       <p className="text-neutral-400 text-sm">{post.excerpt}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-neutral-400">Ничего не найдено.</p>
                )}
              </div>
            </div>
          </aside>
        </div>

      </div>
    </section>
  );
};

export default Blog;