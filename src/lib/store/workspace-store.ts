import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WorkspaceStore {
    currentWorkspace: string;
    workspaceType: 'PERSONAL' | 'FAMILY' | 'TEAM';
    isCollapsed: boolean;
    setWorkspace: (workspace: string) => void;
    setCollapsed: (collapsed: boolean) => void;
}

export const useWorkspaceStore = create<WorkspaceStore>()(
    persist(
        (set) => ({
            currentWorkspace: 'Personal',
            workspaceType: 'PERSONAL',
            isCollapsed: false,
            setWorkspace: (workspace) => {
                let type: 'PERSONAL' | 'FAMILY' | 'TEAM' = 'PERSONAL';
                if (workspace === 'Personal' || workspace === 'Me (Indie Mode)') type = 'PERSONAL';
                else if (["The Smiths", "Parents' House"].includes(workspace)) type = 'FAMILY';
                else if (["Dev Team Alpha", "Marketing Squad"].includes(workspace)) type = 'TEAM';

                set({ currentWorkspace: workspace, workspaceType: type });
            },
            setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
        }),
        {
            name: 'sbd-workspace-storage',
        }
    )
);
