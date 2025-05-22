import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { cookies as getCookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const cookieStore = getCookies();
    const token = cookieStore.get('admin-token')?.value;

    if (token !== process.env.ADMIN_TOKEN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userId } = await req.json();
    const user = await clerkClient.users.getUser(userId);

    const { isBanned, banReason, banType, banExpiresAt, ...restMetadata } = user.publicMetadata;

    void isBanned;
    void banReason;
    void banType;
    void banExpiresAt;

    await clerkClient.users.updateUser(userId, {
      publicMetadata: restMetadata,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to unban user:', error);
    return NextResponse.json({ error: 'Failed to unban user' }, { status: 500 });
  }
}
