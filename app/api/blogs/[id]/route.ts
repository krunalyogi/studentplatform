import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';

// GET single blog by slug or ID
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const { id } = params;

        // Try to find by slug first, then by ID
        let blog: any = await Blog.findOne({ slug: id }).lean();

        if (!blog) {
            blog = await Blog.findById(id).lean();
        }

        if (!blog) {
            return NextResponse.json(
                { error: 'Blog not found' },
                { status: 404 }
            );
        }

        // Increment view count
        await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });

        // Get related posts
        const relatedPosts = await Blog.find({
            _id: { $ne: blog._id },
            category: blog.category,
        })
            .limit(3)
            .select('title slug excerpt featuredImage createdAt')
            .lean();

        return NextResponse.json({ blog, relatedPosts });
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to fetch blog', message: error.message },
            { status: 500 }
        );
    }
}

// PUT update blog (admin only)
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const { id } = params;
        const body = await request.json();

        const blog = await Blog.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!blog) {
            return NextResponse.json(
                { error: 'Blog not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'Blog updated successfully',
            blog,
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to update blog', message: error.message },
            { status: 500 }
        );
    }
}

// DELETE blog (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const { id } = params;

        const blog = await Blog.findByIdAndDelete(id);

        if (!blog) {
            return NextResponse.json(
                { error: 'Blog not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'Blog deleted successfully',
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to delete blog', message: error.message },
            { status: 500 }
        );
    }
}
