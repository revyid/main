import { auth, clerkClient } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { CustomUser } from '@/types/clerk';
export default auth({
    publicRoutes: [
        '/',
        '/sign-in(.*)',
        '/sign-up(.*)',
        '/api/ip',
        '/banned',
        '/not-authorized',
        '/api/webhooks(.*)',
    ],
});
export async function isUserAdmin(userId: string) {
    try {
        const user = await clerkClient.users.getUser(userId) as CustomUser;
        return user.publicMetadata.role === 'admin';
    }
    catch (error) {
        console.error('Error checking admin status:', error);
        return false;
    }
}
export async function isUserBanned(userId: string) {
    try {
        const user = await clerkClient.users.getUser(userId) as CustomUser;
        if (!user.publicMetadata.isBanned) {
            return false;
        }
        if (user.publicMetadata.banType === 'temporary' && user.publicMetadata.banExpiresAt) {
            const banExpiresAt = new Date(user.publicMetadata.banExpiresAt);
            if (banExpiresAt < new Date()) {
                await clerkClient.users.updateUser(userId, {
                    publicMetadata: {
                        ...user.publicMetadata,
                        isBanned: false,
                        banReason: undefined,
                        banType: undefined,
                        banExpiresAt: undefined,
                    }
                });
                return false;
            }
        }
        return true;
    }
    catch (error) {
        console.error('Error checking ban status:', error);
        return false;
    }
}
export async function getCurrentUser() {
    const { userId } = auth();
    if (!userId) {
        return null;
    }
    try {
        const user = await clerkClient.users.getUser(userId) as CustomUser;
        return user;
    }
    catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
}
export async function protectApiRoute() {
    const { userId } = auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (await isUserBanned(userId)) {
        return NextResponse.json({ error: 'Your account has been banned' }, { status: 403 });
    }
    return null;
}
export async function protectAdminApiRoute() {
    const { userId } = auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (await isUserBanned(userId)) {
        return NextResponse.json({ error: 'Your account has been banned' }, { status: 403 });
    }
    if (!(await isUserAdmin(userId))) {
        return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
    }
    return null;
}
