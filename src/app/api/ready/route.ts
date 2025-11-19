import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if backend API is ready
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

    const response = await fetch(`${apiUrl}/ready`, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'SBD-Landing-Page-Readiness-Check/1.0',
      },
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data.status === 'ready') {
        return NextResponse.json(
          {
            status: 'ready',
            timestamp: new Date().toISOString(),
          },
          { status: 200 }
        );
      }
    }

    // Backend is not ready
    return NextResponse.json(
      {
        status: 'not_ready',
        timestamp: new Date().toISOString(),
        message: 'Backend API is not ready',
      },
      { status: 503 }
    );
  } catch (error) {
    console.error('Readiness check failed:', error);
    return NextResponse.json(
      {
        status: 'not_ready',
        timestamp: new Date().toISOString(),
        error: 'Readiness check failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}