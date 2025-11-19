'use client';

import { useWorkspaceStore } from '@/lib/store/workspace-store';
import { PersonalDashboard } from '@/components/PersonalDashboard';
import { FamilyDashboard } from '@/components/FamilyDashboard';
import { TeamDashboard } from '@/components/TeamDashboard';

export default function DashboardPage() {
  const { currentWorkspace, workspaceType } = useWorkspaceStore();

  // Render appropriate dashboard based on workspace type
  if (workspaceType === 'FAMILY') {
    return <FamilyDashboard workspaceId={currentWorkspace.toLowerCase().replace(/\s+/g, '-')} workspaceName={currentWorkspace} />;
  }

  if (workspaceType === 'TEAM') {
    return <TeamDashboard workspaceId={currentWorkspace.toLowerCase().replace(/\s+/g, '-')} workspaceName={currentWorkspace} />;
  }

  // Default to Personal
  return <PersonalDashboard />;
}