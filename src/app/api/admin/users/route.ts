import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
export async function GET() {
    try {
        const token = request.cookies.get('admin-token');
        if (token !== process.env.ADMIN_TOKEN_SECRET) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const users = await clerkClient.users.getUserList({
            limit: 100,
            orderBy: '-created_at'
        });
        return NextResponse.json({ users });
    }
    catch (error) {
        console.error('Failed to fetch users:', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}
