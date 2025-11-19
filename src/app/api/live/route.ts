import { NextResponse } from 'next/server';

export async function GET() {
  // Simple liveness check - always returns 200 if the application is running
  return NextResponse.json(
    {
      status: 'alive',
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}