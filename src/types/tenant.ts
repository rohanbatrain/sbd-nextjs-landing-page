/**
 * Multi-Tenancy Type Definitions
 */

export interface Tenant {
    tenant_id: string;
    name: string;
    slug: string;
    plan: 'free' | 'pro' | 'enterprise';
    owner_user_id: string;
    created_at: string;
    settings?: {
        custom_domain?: string;
        branding?: {
            logo_url?: string;
            primary_color?: string;
        };
    };
}

export interface TenantMembership {
    tenant_id: string;
    role: 'owner' | 'admin' | 'member';
    joined_at: string;
}

export interface CreateTenantRequest {
    name: string;
    slug: string;
    plan?: 'free' | 'pro' | 'enterprise';
}

export interface SwitchTenantRequest {
    tenant_id: string;
}

export interface UpdateTenantRequest {
    name?: string;
    settings?: Tenant['settings'];
}
