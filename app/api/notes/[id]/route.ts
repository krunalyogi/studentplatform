import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Note from '@/lib/models/Note';

// GET single note by slug or ID
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const { id } = params;

        // Try to find by slug first, then by ID
        let note: any = await Note.findOne({ slug: id }).lean();

        if (!note) {
            note = await Note.findById(id).lean();
        }

        if (!note) {
            return NextResponse.json(
                { error: 'Note not found' },
                { status: 404 }
            );
        }

        // Increment view count
        await Note.findByIdAndUpdate(note._id, { $inc: { views: 1 } });

        return NextResponse.json({ note });
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to fetch note', message: error.message },
            { status: 500 }
        );
    }
}

// PUT update note (admin only)
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const { id } = params;
        const body = await request.json();

        const note = await Note.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!note) {
            return NextResponse.json(
                { error: 'Note not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'Note updated successfully',
            note,
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to update note', message: error.message },
            { status: 500 }
        );
    }
}

// DELETE note (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const { id } = params;

        const note = await Note.findByIdAndDelete(id);

        if (!note) {
            return NextResponse.json(
                { error: 'Note not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'Note deleted successfully',
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to delete note', message: error.message },
            { status: 500 }
        );
    }
}
