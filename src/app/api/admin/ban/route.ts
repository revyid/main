import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin-token')?.value;

    if (token !== process.env.ADMIN_TOKEN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userId, type, reason, duration } = await req.json();

    const publicMetadata = {
      isBanned: true,
      banReason: reason,
      banType: type,
      ...(type === 'temporary' && duration && {
        banExpiresAt: new Date(Date.now() + duration * 60 * 1000).toISOString(),
      }),
    };

    await clerkClient.users.updateUser(userId, { publicMetadata });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to ban user:', error);
    return NextResponse.json({ error: 'Failed to ban user' }, { status: 500 });
  }
}
