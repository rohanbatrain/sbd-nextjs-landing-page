import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check backend API health
    let backendHealthy = false;
    let backendStatus = 'unknown';

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const response = await fetch(`${apiUrl}/health`, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'SBD-Landing-Page-Health-Check/1.0',
        },
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        backendHealthy = data.status === 'healthy';
        backendStatus = data.status || 'unknown';
      } else {
        backendStatus = `http_${response.status}`;
      }
    } catch (error) {
      console.error('Backend health check failed:', error);
      backendStatus = error instanceof Error && error.name === 'AbortError' ? 'timeout' : 'unreachable';
    }

    // Check application health
    const appHealthy = true; // Next.js app is running if this code executes
    const timestamp = new Date().toISOString();

    // Overall health determination
    const overallHealthy = appHealthy && backendHealthy;

    const healthData = {
      status: overallHealthy ? 'healthy' : 'unhealthy',
      timestamp,
      checks: {
        application: {
          status: appHealthy ? 'healthy' : 'unhealthy',
          message: appHealthy ? 'Next.js application is running' : 'Application is not responding',
        },
        backend_api: {
          status: backendHealthy ? 'healthy' : 'unhealthy',
          message: backendHealthy ? 'Backend API is responding' : `Backend API is not healthy: ${backendStatus}`,
          endpoint: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/health`,
        },
      },
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
    };

    return NextResponse.json(healthData, {
      status: overallHealthy ? 200 : 503,
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}