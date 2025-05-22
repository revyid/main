import { clerkClient } from '@clerk/nextjs/server';
import type { User } from '@clerk/nextjs/api';
interface CustomUser extends User {
    publicMetadata: {
        isBanned?: boolean;
        banReason?: string;
        banExpiresAt?: string;
        banType?: 'permanent' | 'temporary';
        role?: 'user' | 'admin';
        lastLogin?: string;
    };
}
const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(',') || [
    'revy8k@gmail.com',
    'superadmin@example.com'
];
export async function isUserBanned(userId: string): Promise<boolean> {
    try {
        const user = await clerkClient.users.getUser(userId) as CustomUser;
        if (!user.publicMetadata.isBanned) {
            return false;
        }
        if (user.publicMetadata.banType === 'temporary' && user.publicMetadata.banExpiresAt) {
            const banExpiresAt = new Date(user.publicMetadata.banExpiresAt);
            if (banExpiresAt < new Date()) {
                await unbanUser(userId);
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
export async function banUser(userId: string, options: {
    type: 'permanent' | 'temporary';
    reason: string;
    duration?: number;
}): Promise<boolean> {
    try {
        const user = await clerkClient.users.getUser(userId) as CustomUser;
        const publicMetadata = {
            ...user.publicMetadata,
            isBanned: true,
            banReason: options.reason,
            banType: options.type,
            ...(options.type === 'temporary' && options.duration && {
                banExpiresAt: new Date(Date.now() + options.duration * 60 * 1000).toISOString()
            })
        };
        await clerkClient.users.updateUser(userId, { publicMetadata });
        return true;
    }
    catch (error) {
        console.error('Error banning user:', error);
        return false;
    }
}
export async function unbanUser(userId: string): Promise<boolean> {
    try {
        const user = await clerkClient.users.getUser(userId) as CustomUser;
        const { isBanned, banReason, banType, banExpiresAt, ...restMetadata } = user.publicMetadata;
        void isBanned;
        void banReason;
        void banType;
        void banExpiresAt;
        await clerkClient.users.updateUser(userId, {
            publicMetadata: restMetadata
        });
        return true;
    }
    catch (error) {
        console.error('Error unbanning user:', error);
        return false;
    }
}
export async function promoteToAdmin(userId: string): Promise<boolean> {
    try {
        const user = await clerkClient.users.getUser(userId) as CustomUser;
        await clerkClient.users.updateUser(userId, {
            publicMetadata: {
                ...user.publicMetadata,
                role: 'admin'
            }
        });
        return true;
    }
    catch (error) {
        console.error('Error promoting user to admin:', error);
        return false;
    }
}
export async function demoteAdmin(userId: string): Promise<boolean> {
    try {
        const user = await clerkClient.users.getUser(userId) as CustomUser;
        const { role, ...restMetadata } = user.publicMetadata;
        void role;
        await clerkClient.users.updateUser(userId, {
            publicMetadata: restMetadata
        });
        return true;
    }
    catch (error) {
        console.error('Error demoting admin:', error);
        return false;
    }
}
export async function handleUserSignIn(userId: string): Promise<void> {
    try {
        const user = await clerkClient.users.getUser(userId) as CustomUser;
        const userEmail = user.emailAddresses[0]?.emailAddress;
        if (userEmail && ADMIN_EMAILS.includes(userEmail)) {
            await promoteToAdmin(userId);
        }
        await clerkClient.users.updateUser(userId, {
            publicMetadata: {
                ...user.publicMetadata,
                lastLogin: new Date().toISOString()
            }
        });
    }
    catch (error) {
        console.error('Error handling user sign in:', error);
    }
}
export async function getAdminUsers(): Promise<CustomUser[]> {
    try {
        const users = await clerkClient.users.getUserList();
        return users.filter(user => (user as CustomUser).publicMetadata.role === 'admin') as CustomUser[];
    }
    catch (error) {
        console.error('Error getting admin users:', error);
        return [];
    }
}
export async function isUserAdmin(userId: string): Promise<boolean> {
    try {
        const user = await clerkClient.users.getUser(userId) as CustomUser;
        return user.publicMetadata.role === 'admin';
    }
    catch (error) {
        console.error('Error checking admin status:', error);
        return false;
    }
}
export async function getBanInfo(userId: string): Promise<{
    isBanned: boolean;
    reason?: string;
    type?: 'permanent' | 'temporary';
    expiresAt?: Date;
}> {
    try {
        const user = await clerkClient.users.getUser(userId) as CustomUser;
        return {
            isBanned: !!user.publicMetadata.isBanned,
            reason: user.publicMetadata.banReason,
            type: user.publicMetadata.banType,
            expiresAt: user.publicMetadata.banExpiresAt
                ? new Date(user.publicMetadata.banExpiresAt)
                : undefined
        };
    }
    catch (error) {
        console.error('Error getting ban info:', error);
        return { isBanned: false };
    }
}
