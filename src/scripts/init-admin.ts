import { clerkClient } from '@clerk/nextjs';
import { promoteToAdmin } from '@/lib/admin';
async function initAdmin() {
    const email = process.env.INITIAL_ADMIN_EMAIL;
    if (!email) {
        console.error('No INITIAL_ADMIN_EMAIL environment variable set');
        process.exit(1);
    }
    try {
        const users = await clerkClient.users.getUserList({ emailAddress: [email] });
        if (users.length === 0) {
            console.error(`No user found with email ${email}`);
            process.exit(1);
        }
        const user = users[0];
        const result = await promoteToAdmin(user.id);
        if (result) {
            console.log(`Successfully promoted ${email} to admin`);
        }
        else {
            console.error(`Failed to promote ${email} to admin`);
        }
    }
    catch (error) {
        console.error('Error initializing admin:', error);
        process.exit(1);
    }
}
initAdmin();
