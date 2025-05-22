import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) {
    const ip = req.ip || req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for') || 'unknown';
    return NextResponse.json({ ip });
}
