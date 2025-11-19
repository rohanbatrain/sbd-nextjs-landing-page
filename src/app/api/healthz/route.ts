import { NextResponse } from 'next/server';

export async function GET() {
  // Lightweight liveness check for Kubernetes
  // Always returns 200 OK if the application is running
  return NextResponse.json(
    {
      status: 'ok',
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}