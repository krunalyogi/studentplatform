// TypeScript Types and Interfaces

export interface Note {
    _id: string;
    title: string;
    slug: string;
    content: string;
    category: string;
    tags: string[];
    views: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Blog {
    _id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    category: string;
    author: string;
    tags: string[];
    featuredImage: string;
    views: number;
    relatedPosts: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Newsletter {
    _id: string;
    email: string;
    subscribedAt: Date;
    active: boolean;
}

export interface User {
    _id: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    createdAt: Date;
}

export interface Tool {
    id: string;
    name: string;
    description: string;
    icon: string;
    path: string;
    category: string;
}

export interface SearchResult {
    notes: Note[];
    blogs: Blog[];
    totalCount: number;
}

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
    ogImage?: string;
    ogType?: string;
    twitterCard?: string;
    keywords?: string[];
}
