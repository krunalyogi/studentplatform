'use client';

import { useState, useEffect } from 'react';
import NoteCard from '@/components/cards/NoteCard';
import Pagination from '@/components/common/Pagination';
import { Note } from '@/types';
import { BookOpen, Filter } from 'lucide-react';

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = ['all', 'Programming', 'Mathematics', 'Science', 'Engineering', 'Business', 'Other'];

    useEffect(() => {
        fetchNotes();
    }, [currentPage, selectedCategory]);

    const fetchNotes = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: '12',
            });

            if (selectedCategory !== 'all') {
                params.append('category', selectedCategory);
            }

            const response = await fetch(`/api/notes?${params}`);
            const data = await response.json();

            if (response.ok) {
                setNotes(data.notes);
                setTotalPages(data.pagination.pages);
            }
        } catch (error) {
            console.error('Failed to fetch notes:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full mb-4">
                        <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Study Notes</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Comprehensive study materials across various subjects to help you ace your exams
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
                                        ? 'bg-primary-600 text-white shadow-lg'
                                        : 'bg-white text-gray-700 hover:bg-primary-50 border border-gray-300'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Notes Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                    </div>
                ) : notes.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {notes.map((note) => (
                                <NoteCard key={note._id} note={note} />
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
                        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">No notes found</h3>
                        <p className="text-gray-600">Try selecting a different category</p>
                    </div>
                )}
            </div>
        </div>
    );
}
