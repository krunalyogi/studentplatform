import { notFound } from 'next/navigation';
import { Calendar, Eye, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { formatDate, generateArticleSchema } from '@/lib/utils/seo';
import connectDB from '@/lib/mongodb';
import Note from '@/lib/models/Note';
import { Metadata } from 'next';

// Ensure database connection
async function getNote(slug: string) {
    try {
        await connectDB();
        const note = await Note.findOne({ slug }).lean();

        if (!note) return null;

        // Simplify converting MongoDB object to plain JS object
        return JSON.parse(JSON.stringify(note));
    } catch (error) {
        console.error('Error fetching note:', error);
        return null;
    }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const note = await getNote(params.slug);

    if (!note) {
        return {
            title: 'Note Not Found',
        };
    }

    return {
        title: `${note.title} | Student Platform`,
        description: note.content.substring(0, 160),
        keywords: note.tags.join(', '),
    };
}

export default async function SingleNotePage({ params }: { params: { slug: string } }) {
    const note = await getNote(params.slug);

    if (!note) {
        notFound();
    }

    const schema = generateArticleSchema({
        title: note.title,
        description: note.content.substring(0, 160),
        author: 'Student Platform Team',
        publishedDate: new Date(note.createdAt),
        modifiedDate: new Date(note.updatedAt),
        url: `https://student-platform.vercel.app/notes/${note.slug}`,
    });

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link
                    href="/notes"
                    className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6 font-medium"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Notes
                </Link>

                {/* Note Header */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    {/* Category Badge */}
                    <div className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
                        {note.category}
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">{note.title}</h1>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-6 text-gray-600 pb-6 border-b">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            <span>{formatDate(note.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Eye className="w-5 h-5" />
                            <span>{note.views} views</span>
                        </div>
                    </div>

                    {/* Tags */}
                    {note.tags && note.tags.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                            {note.tags.map((tag: string, index: number) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm"
                                >
                                    <Tag className="w-4 h-4" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Note Content */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="prose prose-lg max-w-none">
                        <div
                            className="text-gray-800 leading-relaxed whitespace-pre-wrap"
                            dangerouslySetInnerHTML={{ __html: note.content }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
