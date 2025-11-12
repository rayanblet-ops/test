import React from 'react';
import type { BlogPost, BlogContent } from '../types';

interface BlogPostLayoutProps {
  post: BlogPost;
  allPosts: BlogPost[];
}

const renderContent = (content: BlogContent) => {
  switch (content.type) {
    case 'paragraph':
      return <p>{content.text}</p>;
    case 'quote':
      return (
        <blockquote>
          <p>"{content.text}"</p>
        </blockquote>
      );
    case 'code':
      return (
        <pre>
          <code>{content.code.trim()}</code>
        </pre>
      );
    default:
      return null;
  }
};

const BlogPostLayout: React.FC<BlogPostLayoutProps> = ({ post, allPosts }) => {
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && (p.category === post.category || p.tags.some(tag => post.tags.includes(tag))))
    .slice(0, 2);

  return (
    <article className="bg-base-800/50 p-8 rounded-2xl">
      <header className="mb-8 border-b border-neutral-700 pb-6">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-accent font-semibold text-sm bg-accent/10 px-3 py-1 rounded-full">{post.category}</span>
          <p className="text-sm text-neutral-400">{post.date}</p>
        </div>
        <h3 className="text-4xl font-bold text-neutral-50">{post.title}</h3>
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.map(tag => (
            <span key={tag} className="text-neutral-400 text-xs font-medium px-2 py-1 rounded-full bg-base-700">
              #{tag}
            </span>
          ))}
        </div>
      </header>
      <div className="prose prose-invert max-w-none prose-p:text-neutral-300 prose-p:text-lg prose-p:leading-relaxed prose-blockquote:border-accent prose-blockquote:bg-base-700/50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-pre:bg-base-900 prose-pre:border prose-pre:border-neutral-700 prose-code:text-neutral-200">
        {post.content.map((block, index) => (
          <React.Fragment key={index}>{renderContent(block)}</React.Fragment>
        ))}
      </div>
      
      {relatedPosts.length > 0 && (
        <footer className="mt-12 pt-8 border-t border-neutral-700">
          <h4 className="text-2xl font-bold text-neutral-100 mb-6">Похожие Записи</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map(relatedPost => (
              <a href={relatedPost.link} key={relatedPost.id} className="block p-4 bg-base-700/50 rounded-lg hover:bg-base-700 transition-colors">
                <p className="text-sm text-accent-secondary font-semibold mb-1">{relatedPost.category}</p>
                <h5 className="font-semibold text-neutral-200 mb-2">{relatedPost.title}</h5>
                <p className="text-sm text-neutral-400">{relatedPost.excerpt}</p>
              </a>
            ))}
          </div>
        </footer>
      )}
    </article>
  );
};

export default BlogPostLayout;