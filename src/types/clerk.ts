import { User } from '@clerk/nextjs/server';
export interface CustomUser extends User {
    publicMetadata: {
        isBanned?: boolean;
        banReason?: string;
        banExpiresAt?: string;
        banType?: 'permanent' | 'temporary';
    };
}
