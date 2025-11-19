import { NextResponse } from 'next/server';

interface Microfrontend {
  id: string;
  name: string;
  url?: string;
  status: 'running' | 'stopped' | 'maintenance';
}

const microfrontends: Microfrontend[] = [
  {
    id: 'emotion-tracker',
    name: 'Emotion Tracker',
    status: 'maintenance',
  },
  {
    id: 'ipam',
    name: 'IPAM',
    url: 'https://ipam.secondbraindatabase.com',
    status: 'running',
  },
  {
    id: 'chat',
    name: 'Second Brain Chat',
    status: 'maintenance',
  },
  {
    id: 'landing-page',
    name: 'Landing Page',
    url: 'https://secondbraindatabase.com',
    status: 'running',
  },
  {
    id: 'n8n-nodes',
    name: 'N8N Integration',
    status: 'maintenance',
  },
];

async function checkMicrofrontendHealth(mf: Microfrontend): Promise<{
  id: string;
  name: string;
  status: 'healthy' | 'unhealthy' | 'unknown';
  message: string;
  response_time_ms?: number;
}> {
  if (!mf.url || mf.status !== 'running') {
    return {
      id: mf.id,
      name: mf.name,
      status: mf.status === 'running' ? 'unknown' : 'unhealthy',
      message: mf.status === 'running' ? 'No URL configured' : `Status: ${mf.status}`,
    };
  }

  try {
    const startTime = Date.now();

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(`${mf.url}/health`, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'SBD-Landing-Page-Microfrontend-Health-Check/1.0',
      },
    });

    clearTimeout(timeoutId);
    const responseTime = Date.now() - startTime;

    if (response.ok) {
      try {
        const data = await response.json();
        const isHealthy = data.status === 'healthy' || data.status === 'ok' || data.status === 'alive';

        return {
          id: mf.id,
          name: mf.name,
          status: isHealthy ? 'healthy' : 'unhealthy',
          message: isHealthy ? 'Health check passed' : `Health check failed: ${data.status}`,
          response_time_ms: responseTime,
        };
      } catch {
        // If we can't parse JSON, assume healthy if status is 200
        return {
          id: mf.id,
          name: mf.name,
          status: 'healthy',
          message: 'Health endpoint responded with 200 OK',
          response_time_ms: responseTime,
        };
      }
    } else {
      return {
        id: mf.id,
        name: mf.name,
        status: 'unhealthy',
        message: `HTTP ${response.status}: ${response.statusText}`,
        response_time_ms: responseTime,
      };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      id: mf.id,
      name: mf.name,
      status: 'unhealthy',
      message: `Health check failed: ${errorMessage}`,
    };
  }
}

export async function GET() {
  try {
    // Check all microfrontends in parallel
    const healthChecks = await Promise.all(
      microfrontends.map(checkMicrofrontendHealth)
    );

    // Calculate overall status
    const healthyCount = healthChecks.filter(check => check.status === 'healthy').length;
    const totalCount = healthChecks.length;
    const overallHealthy = healthyCount === totalCount;

    const healthData = {
      status: overallHealthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      summary: {
        total: totalCount,
        healthy: healthyCount,
        unhealthy: totalCount - healthyCount,
        health_percentage: Math.round((healthyCount / totalCount) * 100),
      },
      microfrontends: healthChecks,
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
    };

    return NextResponse.json(healthData, {
      status: overallHealthy ? 200 : 503,
    });
  } catch (error) {
    console.error('Microfrontends health check failed:', error);
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Microfrontends health check failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}