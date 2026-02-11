import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Newsletter from '@/lib/models/Newsletter';

// POST newsletter subscription
export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        // Check if already subscribed
        const existing = await Newsletter.findOne({ email });

        if (existing) {
            if (existing.active) {
                return NextResponse.json(
                    { error: 'Email already subscribed' },
                    { status: 400 }
                );
            } else {
                // Reactivate subscription
                existing.active = true;
                await existing.save();
                return NextResponse.json({
                    message: 'Subscription reactivated successfully!',
                });
            }
        }

        // Create new subscription
        await Newsletter.create({ email });

        return NextResponse.json(
            { message: 'Successfully subscribed to newsletter!' },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to subscribe', message: error.message },
            { status: 500 }
        );
    }
}

// GET all newsletter subscribers (admin only)
export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const subscribers = await Newsletter.find({ active: true })
            .sort({ subscribedAt: -1 })
            .lean();

        return NextResponse.json({
            subscribers,
            total: subscribers.length,
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to fetch subscribers', message: error.message },
            { status: 500 }
        );
    }
}
