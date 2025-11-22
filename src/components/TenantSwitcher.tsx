'use client';

import { useTenant } from '@/contexts/TenantContext';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Building2, Loader2 } from 'lucide-react';

export function TenantSwitcher() {
    const { currentTenant, availableTenants, switchTenant, isLoading } = useTenant();

    if (isLoading) {
        return (
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
            </div>
        );
    }

    if (!currentTenant || availableTenants.length === 0) {
        return null;
    }

    // If user only has one tenant, show it as read-only
    if (availableTenants.length === 1) {
        return (
            <div className="flex items-center gap-2 px-3 py-2 text-sm">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{currentTenant.name}</span>
            </div>
        );
    }

    return (
        <Select
            value={currentTenant.tenant_id}
            onValueChange={switchTenant}
        >
            <SelectTrigger className="w-[200px]">
                <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <SelectValue>{currentTenant.name}</SelectValue>
                </div>
            </SelectTrigger>
            <SelectContent>
                {availableTenants.map((tenant) => (
                    <SelectItem key={tenant.tenant_id} value={tenant.tenant_id}>
                        <div className="flex flex-col">
                            <span className="font-medium">{tenant.name}</span>
                            <span className="text-xs text-muted-foreground capitalize">
                                {tenant.plan} plan
                            </span>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
