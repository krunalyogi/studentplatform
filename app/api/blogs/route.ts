import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';

// GET all blogs with pagination and filtering
export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '12');
        const category = searchParams.get('category');
        const search = searchParams.get('search');

        const query: any = {};

        if (category && category !== 'all') {
            query.category = category;
        }

        if (search) {
            query.$text = { $search: search };
        }

        const skip = (page - 1) * limit;

        const blogs = await Blog.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Blog.countDocuments(query);

        return NextResponse.json({
            blogs,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to fetch blogs', message: error.message },
            { status: 500 }
        );
    }
}

// POST create new blog (admin only)
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any)?.role !== 'admin') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectDB();

        const body = await request.json();
        const { title, slug, content, excerpt, category, author, tags, featuredImage } = body;

        if (!title || !content || !excerpt || !category) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Auto-generate slug if not provided, handling special characters
        let finalSlug = slug;
        if (!finalSlug) {
            finalSlug = title.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');

            // If slug becomes empty (e.g. title was "!!!"), fallback to timestamp
            if (!finalSlug) {
                finalSlug = `blog-${Date.now()}`;
            }
        }

        const blog = await Blog.create({
            title,
            slug: finalSlug,
            content,
            excerpt,
            category,
            author: author || 'Student Platform Team',
            tags: tags || [],
            featuredImage: featuredImage || '/images/placeholder.jpg',
        });

        return NextResponse.json(
            { message: 'Blog created successfully', blog },
            { status: 201 }
        );
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json(
                { error: 'Blog with this slug already exists' },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: 'Failed to create blog', message: error.message },
            { status: 500 }
        );
    }
}
