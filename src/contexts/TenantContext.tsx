'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiClient, type ApiResponse } from '@/lib/api-client';
import type { Tenant } from '@/types/tenant';

interface TenantContextType {
    currentTenant: Tenant | null;
    availableTenants: Tenant[];
    switchTenant: (tenantId: string) => Promise<void>;
    refreshTenants: () => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
    const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
    const [availableTenants, setAvailableTenants] = useState<Tenant[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadTenantData = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Check if user is authenticated
            const token = localStorage.getItem('access_token');
            if (!token) {
                setIsLoading(false);
                return;
            }

            const [currentResponse, availableResponse] = await Promise.all([
                apiClient.get<ApiResponse<Tenant>>('/tenants/current'),
                apiClient.get<ApiResponse<Tenant[]>>('/tenants/my'),
            ]);

            setCurrentTenant(currentResponse.data);
            setAvailableTenants(availableResponse.data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load tenant data';
            console.error('Failed to load tenant data:', err);
            setError(errorMessage);

            // If tenant endpoints fail, user might not have tenant access yet
            // This is okay for new users
            if (errorMessage.includes('404')) {
                setError(null);
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadTenantData();
    }, [loadTenantData]);

    const switchTenant = useCallback(async (tenantId: string) => {
        try {
            setError(null);

            const response = await apiClient.post<ApiResponse<{ access_token: string }>>(
                '/tenants/switch',
                { tenant_id: tenantId }
            );

            // Update token
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('current_tenant_id', tenantId);

            // Reload page to refresh all data with new tenant context
            window.location.reload();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to switch tenant';
            console.error('Failed to switch tenant:', err);
            setError(errorMessage);
            throw err;
        }
    }, []);

    const refreshTenants = useCallback(async () => {
        await loadTenantData();
    }, [loadTenantData]);

    const value: TenantContextType = {
        currentTenant,
        availableTenants,
        switchTenant,
        refreshTenants,
        isLoading,
        error,
    };

    return (
        <TenantContext.Provider value={value}>
            {children}
        </TenantContext.Provider>
    );
}

export function useTenant() {
    const context = useContext(TenantContext);
    if (!context) {
        throw new Error('useTenant must be used within TenantProvider');
    }
    return context;
}
