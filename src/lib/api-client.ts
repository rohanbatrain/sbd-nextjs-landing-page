/**
 * API Client with Multi-Tenancy Support
 * 
 * Automatically handles:
 * - Authentication (Bearer token)
 * - Tenant context (X-Tenant-ID header)
 * - Subdomain detection
 * - Error handling
 */

interface ApiClientConfig {
    baseUrl: string;
    getToken: () => string | null;
    getTenantId?: () => string | null;
}

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

class ApiClient {
    private config: ApiClientConfig;

    constructor(config: ApiClientConfig) {
        this.config = config;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const token = this.config.getToken();
        const tenantId = this.config.getTenantId?.();

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        // Add authentication
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        // Add tenant context
        if (tenantId) {
            headers['X-Tenant-ID'] = tenantId;
        }

        const url = `${this.config.baseUrl}${endpoint}`;

        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...headers,
                    ...(options.headers as Record<string, string>),
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.detail || errorData.message || `API Error: ${response.statusText}`
                );
            }

            return response.json();
        } catch (error) {
            console.error(`API request failed: ${endpoint}`, error);
            throw error;
        }
    }

    async get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'GET' });
    }

    async post<T>(endpoint: string, data?: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async put<T>(endpoint: string, data: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async patch<T>(endpoint: string, data: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }
}

/**
 * Detect tenant ID from subdomain
 * Examples:
 * - acme.yourapp.com -> "acme"
 * - localhost:3000 -> null (uses default tenant)
 */
function detectTenantFromSubdomain(): string | null {
    if (typeof window === 'undefined') return null;

    const hostname = window.location.hostname;

    // Skip localhost and IP addresses
    if (hostname === 'localhost' || /^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
        return null;
    }

    const parts = hostname.split('.');

    // If subdomain exists (e.g., acme.yourapp.com)
    // Assuming format: subdomain.domain.tld
    if (parts.length > 2) {
        return parts[0];
    }

    return null;
}

// Export singleton instance
export const apiClient = new ApiClient({
    baseUrl: typeof window !== 'undefined' && (window as any).ENV?.NEXT_PUBLIC_API_URL
        ? (window as any).ENV.NEXT_PUBLIC_API_URL
        : 'http://localhost:8000',
    getToken: () => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('access_token');
    },
    getTenantId: () => {
        if (typeof window === 'undefined') return null;

        // Priority 1: Subdomain detection
        const subdomainTenant = detectTenantFromSubdomain();
        if (subdomainTenant) {
            return subdomainTenant;
        }

        // Priority 2: Explicitly stored tenant
        return localStorage.getItem('current_tenant_id');
    },
});

// Export types
export type { ApiResponse };
