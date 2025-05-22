import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
const SETTINGS_KEY = 'app_settings';
export async function GET() {
    try {
        const token = request.cookies.get('admin-token');
        if (token !== process.env.ADMIN_TOKEN_SECRET) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const settings = await kv.get(SETTINGS_KEY);
        return NextResponse.json({ settings });
    }
    catch (error) {
        console.error('Failed to load settings:', error);
        return NextResponse.json({ error: 'Failed to load settings' }, { status: 500 });
    }
}
export async function POST(req: Request) {
    try {
        const token = req.cookies.get('admin-token');
        if (token !== process.env.ADMIN_TOKEN_SECRET) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const settings = await req.json();
        await kv.set(SETTINGS_KEY, settings);
        return NextResponse.json({ success: true });
    }
    catch (error) {
        console.error('Failed to save settings:', error);
        return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
    }
}
