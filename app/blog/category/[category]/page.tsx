'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, User, Tag } from 'lucide-react';
import Image from 'next/image';

export default function CategoryBlogPage({ params }: { params: { category: string } }) {
    const { category } = params;
    const decodedCategory = decodeURIComponent(category);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                // Fetch blogs with the specific category filter
                const res = await fetch(`/api/blogs?category=${encodeURIComponent(decodedCategory)}`);
                const data = await res.json();
                if (data.blogs) {
                    setBlogs(data.blogs);
                }
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [decodedCategory]);

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to All Blogs
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-900 capitalize">
                        {decodedCategory} <span className="text-primary-600">Articles</span>
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Browse all our latest articles and guides about {decodedCategory}
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-2xl h-96"></div>
                        ))}
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-20">
                        <h3 className="text-xl text-gray-600">No articles found in this category yet.</h3>
                        <Link href="/blog" className="text-primary-600 mt-4 inline-block hover:underline">
                            Browse other topics
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog: any) => (
                            <Link
                                key={blog._id}
                                href={`/blog/${blog.slug}`}
                                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="relative h-48 w-full bg-gray-200">
                                    {blog.featuredImage ? (
                                        <Image
                                            src={blog.featuredImage}
                                            alt={blog.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                                            <span className="text-4xl">📝</span>
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-primary-600 rounded-full lowercase">
                                            {blog.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                        <div className="flex items-center gap-1">
                                            <User className="w-3 h-3" />
                                            {blog.author}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {new Date(blog.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                                        {blog.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                        {blog.excerpt}
                                    </p>
                                    <div className="flex items-center gap-2 mt-auto">
                                        <span className="text-primary-600 text-sm font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                                            Read Article <ArrowLeft className="w-4 h-4 rotate-180" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
