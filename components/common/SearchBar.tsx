'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, Loader, FileText, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any>({ notes: [], blogs: [] });
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Handle click outside to close dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.trim().length >= 2) {
                setLoading(true);
                setIsOpen(true);
                try {
                    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                    const data = await res.json();
                    setResults(data);
                } catch (error) {
                    console.error('Search error:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setResults({ notes: [], blogs: [] });
                if (query.trim().length === 0) setIsOpen(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    const handleLinkClick = () => {
        setIsOpen(false);
        setQuery('');
    };

    const hasResults = results.notes.length > 0 || results.blogs.length > 0;

    return (
        <div ref={searchRef} className="relative w-full max-w-md mx-auto md:mx-0">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search notes, articles..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent sm:text-sm transition-all duration-200"
                />
                {loading && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <Loader className="h-4 w-4 text-primary-500 animate-spin" />
                    </div>
                )}
            </div>

            {/* Dropdown Results */}
            {isOpen && (query.trim().length >= 2) && (
                <div className="absolute mt-2 w-full bg-white rounded-xl shadow-2xl overflow-hidden z-50 border border-gray-100 animate-fade-in max-h-[80vh] overflow-y-auto">
                    {!loading && !hasResults ? (
                        <div className="p-4 text-sm text-gray-500 text-center">
                            No results found for "{query}"
                        </div>
                    ) : (
                        <div className="py-2">
                            {results.notes.length > 0 && (
                                <div className="mb-2">
                                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                                        Notes
                                    </div>
                                    {results.notes.map((note: any) => (
                                        <Link
                                            key={note._id}
                                            href={`/notes/${note.slug}`}
                                            onClick={handleLinkClick}
                                            className="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="mt-1 bg-blue-100 p-1.5 rounded-md">
                                                    <BookOpen className="w-4 h-4 text-blue-600" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 line-clamp-1">{note.title}</div>
                                                    <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">{note.category}</div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {results.blogs.length > 0 && (
                                <div>
                                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                                        Articles
                                    </div>
                                    {results.blogs.map((blog: any) => (
                                        <Link
                                            key={blog._id}
                                            href={`/blog/${blog.slug}`}
                                            onClick={handleLinkClick}
                                            className="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="mt-1 bg-green-100 p-1.5 rounded-md">
                                                    <FileText className="w-4 h-4 text-green-600" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 line-clamp-1">{blog.title}</div>
                                                    <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">{blog.category}</div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
