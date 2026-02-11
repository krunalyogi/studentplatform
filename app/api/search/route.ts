import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Note from '@/lib/models/Note';
import Blog from '@/lib/models/Blog';

// GET search results
export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');

        if (!query || query.trim() === '') {
            return NextResponse.json({
                notes: [],
                blogs: [],
                totalCount: 0,
            });
        }

        // Search notes
        const notes = await Note.find(
            { $text: { $search: query } },
            { score: { $meta: 'textScore' } }
        )
            .sort({ score: { $meta: 'textScore' } })
            .limit(10)
            .select('title slug category createdAt')
            .lean();

        // Search blogs
        const blogs = await Blog.find(
            { $text: { $search: query } },
            { score: { $meta: 'textScore' } }
        )
            .sort({ score: { $meta: 'textScore' } })
            .limit(10)
            .select('title slug excerpt category createdAt')
            .lean();

        return NextResponse.json({
            notes,
            blogs,
            totalCount: notes.length + blogs.length,
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Search failed', message: error.message },
            { status: 500 }
        );
    }
}
