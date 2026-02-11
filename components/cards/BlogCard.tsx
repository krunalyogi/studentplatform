import Link from 'next/link';
import { Calendar, Eye, User } from 'lucide-react';
import { Blog } from '@/types';
import { formatDate } from '@/lib/utils/seo';

interface BlogCardProps {
    blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
    return (
        <Link href={`/blog/${blog.slug}`}>
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group card-hover">
                {/* Featured Image */}
                <div className="h-48 bg-gradient-to-br from-primary-400 to-secondary-500 overflow-hidden">
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-6xl">📝</span>
                    </div>
                </div>

                <div className="p-6">
                    {/* Category Badge */}
                    <div className="inline-block px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-semibold mb-3">
                        {blog.category}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 border-t pt-4">
                        <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{blog.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(blog.createdAt)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
