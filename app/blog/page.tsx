'use client';

import { useState, useEffect } from 'react';
import BlogCard from '@/components/cards/BlogCard';
import Pagination from '@/components/common/Pagination';
import { Blog } from '@/types';
import { FileText, Filter } from 'lucide-react';

export default function BlogPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = ['all', 'Career Guidance', 'Study Hacks', 'Technology', 'Productivity', 'Health'];

    useEffect(() => {
        fetchBlogs();
    }, [currentPage, selectedCategory]);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: '12',
            });

            if (selectedCategory !== 'all') {
                params.append('category', selectedCategory);
            }

            const response = await fetch(`/api/blogs?${params}`);
            const data = await response.json();

            if (response.ok) {
                setBlogs(data.blogs);
                setTotalPages(data.pagination.pages);
            }
        } catch (error) {
            console.error('Failed to fetch blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-full mb-4">
                        <FileText className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog & Articles</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Insightful articles on career guidance, study techniques, and productivity tips
                    </p>
                </div>

                {/* Category Filter */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter className="w-5 h-5 text-gray-600" />
                        <span className="font-semibold text-gray-700">Filter by Category:</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => {
                                    setSelectedCategory(category);
                                    setCurrentPage(1);
                                }}
                                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${selectedCategory === category
                                        ? 'bg-secondary-600 text-white shadow-lg'
                                        : 'bg-white text-gray-700 hover:bg-secondary-50 border border-gray-300'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Blogs Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary-600"></div>
                    </div>
                ) : blogs.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((blog) => (
                                <BlogCard key={blog._id} blog={blog} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </>
                ) : (
                    <div className="text-center py-20">
                        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">No articles found</h3>
                        <p className="text-gray-600">Try selecting a different category</p>
                    </div>
                )}
            </div>
        </div>
    );
}
