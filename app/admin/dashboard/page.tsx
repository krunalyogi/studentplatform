'use client';

import { useEffect, useState } from 'react';
import { FileText, BookOpen, Users, Mail, Plus, LogOut } from 'lucide-react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function AdminDashboard() {
    const { data: session } = useSession();
    const [stats, setStats] = useState({
        notes: 0,
        blogs: 0,
        newsletter: 0,
        users: 0,
    });

    useEffect(() => {
        fetch('/api/admin/stats')
            .then((res) => res.json())
            .then((data) => {
                if (!data.error) {
                    setStats(data);
                }
            })
            .catch(console.error);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="text-gray-600">Welcome back, {session?.user?.email}</p>
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors shadow-sm"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Notes</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.notes}</h3>
                            </div>
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                                <FileText className="w-6 h-6" />
                            </div>
                        </div>
                        <Link
                            href="/admin/notes"
                            className="inline-block mt-4 text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                            Manage Notes →
                        </Link>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Blog Posts</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.blogs}</h3>
                            </div>
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                                <BookOpen className="w-6 h-6" />
                            </div>
                        </div>
                        <Link
                            href="/admin/blogs"
                            className="inline-block mt-4 text-sm font-medium text-purple-600 hover:text-purple-700"
                        >
                            Manage Blogs →
                        </Link>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Subscribers</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.newsletter}</h3>
                            </div>
                            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                                <Mail className="w-6 h-6" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Users</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.users}</h3>
                            </div>
                            <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
                                <Users className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link
                        href="/admin/notes/create"
                        className="flex items-center gap-4 p-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg text-white hover:from-blue-600 hover:to-indigo-700 transition-all group"
                    >
                        <div className="p-3 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                            <Plus className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">Create New Note</h3>
                            <p className="text-blue-100 text-sm">Add a new study note or resource</p>
                        </div>
                    </Link>

                    <Link
                        href="/admin/blogs/create"
                        className="flex items-center gap-4 p-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg text-white hover:from-purple-600 hover:to-pink-700 transition-all group"
                    >
                        <div className="p-3 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                            <Plus className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">Write New Blog Post</h3>
                            <p className="text-purple-100 text-sm">Publish a new article or guide</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
