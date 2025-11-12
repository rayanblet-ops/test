export interface Project {
  id: number;
  title: string;
  type: string;
  description: string;
  detailedDescription: string;
  emotionalTakeaway: string;
  imageUrls: string[];
  tags: string[];
  link: string;
}

export type BlogContent = 
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'code'; language: string; code: string };

export interface BlogPost {
  id: number;
  title:string;
  excerpt: string;
  link: string;
  date: string;
  category: string;
  tags: string[];
  content: BlogContent[];
}