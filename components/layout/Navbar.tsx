'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, BookOpen, Wrench, FileText, Home } from 'lucide-react';
import SearchBar from '../common/SearchBar';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Notes', href: '/notes', icon: BookOpen },
        { name: 'Blog', href: '/blog', icon: FileText },
        { name: 'Tools', href: '/tools', icon: Wrench },
        { name: 'About', href: '/about', icon: BookOpen },
    ];

    return (
        <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl md:text-2xl font-bold gradient-text hidden sm:block">
                            Student Platform
                        </span>
                    </Link>

                    {/* Search Bar (Desktop) */}
                    <div className="hidden md:block flex-1 max-w-md mx-4">
                        <SearchBar />
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6 flex-shrink-0">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 flex items-center space-x-1"
                            >
                                <link.icon className="w-4 h-4" />
                                <span className="hidden lg:inline">{link.name}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-primary-600 transition-colors"
                        >
                            {isOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                            >
                                <link.icon className="w-5 h-5" />
                                <span className="font-medium">{link.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
