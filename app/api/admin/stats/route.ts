import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Note from '@/lib/models/Note';
import Blog from '@/lib/models/Blog';
import Newsletter from '@/lib/models/Newsletter';
import User from '@/lib/models/User';


import connectDB from '@/lib/mongodb';

export async function GET(req: Request) {
    try {
        await connectDB();

        const session = await getServerSession(authOptions);
        console.log('Stats API Session:', JSON.stringify(session, null, 2));

        if (!session || !session.user || (session.user as any).role !== 'admin') {
            console.log('Stats API Unauthorized');
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const notesCount = await Note.countDocuments();
        const blogsCount = await Blog.countDocuments();
        const newsletterCount = await Newsletter.countDocuments();
        const usersCount = await User.countDocuments();

        console.log('Stats API Counts:', { notes: notesCount, blogs: blogsCount });

        return NextResponse.json({
            notes: notesCount,
            blogs: blogsCount,
            newsletter: newsletterCount,
            users: usersCount,
        });
    } catch (error) {
        console.error('Stats fetch error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
